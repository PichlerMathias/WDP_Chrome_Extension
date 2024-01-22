import * as database from './database.js'

// gets finished countdowns from database
export function getAllCountdowns(callback) {
    const request = indexedDB.open('zooDb');

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('countdowns', 'readonly');
        const objectStore = transaction.objectStore('countdowns');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
            const countdowns = event.target.result;

            if (countdowns.length > 0) {
                callback(countdowns);
            } else {
                callback([]);
            }

            db.close();
        };

        getAllRequest.onerror = function (event) {
            console.error("Error getting all countdowns:", event.target.error);
            callback([]);
            db.close();
        };
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        callback([]);
    };
}

// gets all animals that have been unlocked through a countdown
export function getUnlockedAnimalIds(callback) {
    getAllCountdowns(function (countdowns) {
        var unlockedAnimals = [];

        countdowns.forEach((countdown) => {
            if (!unlockedAnimals.includes(countdown.animalId)) {
                unlockedAnimals.push(countdown.animalId);
            }
        });

        callback(unlockedAnimals);
    });
}

// gets all animals that have not been unlocked
export function getLockedAnimalIds(callback) {
    getUnlockedAnimalIds(function (unlockedAnimals) {
        let totalAnimalCount = database.getTotalAnimalCount();

        var lockedAnimals = [];
        for (var i = 1; i <= totalAnimalCount; i++) {
            lockedAnimals.push(i);
        }

        if (unlockedAnimals.length === totalAnimalCount) {
            callback(lockedAnimals);
        } else {
            unlockedAnimals.forEach((unlockedAnimal) => {
                var indexToRemove = lockedAnimals.indexOf(unlockedAnimal);

                if (indexToRemove > -1) {
                    lockedAnimals.splice(indexToRemove, 1);
                }
            });

            callback(lockedAnimals);
        }
    });
}

// creates a new countdown
export function insertCountDown(date, length) {

    getLockedAnimalIds(function (lockedAnimalIds) {

        const request = indexedDB.open('zooDb');

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['countdowns'], 'readwrite');
            const objectStore = transaction.objectStore('countdowns');

            let animalId = lockedAnimalIds[Math.floor(Math.random() * lockedAnimalIds.length)];

            const countdownRecord = {
                date: date,
                length: length,
                animalId: animalId
            };

            const addRequest = objectStore.add(countdownRecord);

            addRequest.onsuccess = function () {
                console.log('Countdown inserted successfully');
            };

            addRequest.onerror = function (event) {
                console.error('Error inserting countdown:', event.target.error);
            };
        };


    });
}

export const countDownObjectName = "countDownObject";

// sets current timer -> how much time is left
export function setCurrentCountDownObject(dateStarted, length, callback) {
    const countDownObject = {date: dateStarted, length: length};

    chrome.storage.local.set({currentCountdownObject: JSON.stringify(countDownObject)}, function () {
        callback(null);
    });
}

const currentCountdownObject = 'currentCountdownObject';

// gets current timer
export function getCurrentCountDownObject(callback) {

    chrome.storage.local.get({currentCountdownObject}, function (data) {

        try {
            let json = JSON.parse(data.currentCountdownObject);
            callback(json);
        } catch (error) {
            if (error instanceof SyntaxError) {
                callback(null);
            } else {
                throw error;
            }
        }
    });
}

// calculate how many seconds are left
export function getRemainingSeconds(callback) {
    (getCurrentCountDownObject(function (value) {
        callback(calculateRemainingSeconds(value), value == null ? 0 : value.length);
    }));
}

function calculateRemainingSeconds(currentCountDownObject){
    if (currentCountDownObject) {
        return Math.floor((currentCountDownObject.length - ((new Date() - new Date(currentCountDownObject.date)) / (1000)))) + 1;
    } else {
        return null;
    }}

// creates a new entry into the statistics page with a random animal
export function insertCountDownIfFinished(callback) {
    console.log("insertCountDownIfFinished called");
    (getCurrentCountDownObject(function (value) {
        let remainingSeconds = calculateRemainingSeconds(value);

        if(remainingSeconds != null && remainingSeconds <= 0){
            insertCountDown(value.date, value.length);
            deleteCountDownItem(function () {
                callback();
            });
        }
        else{
            callback();
        }
    }));
}

export function deleteCountDownItem(callback) {
    chrome.storage.local.remove(currentCountdownObject, function () {
        callback(null);
    });
}