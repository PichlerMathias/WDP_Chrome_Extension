function getAllCountdowns(callback) {
    // Open a connection to the database
    const request = indexedDB.open('zooDb');

    // Handle database open success
    request.onsuccess = function (event) {
        const db = event.target.result;

        // Open a transaction on the "animals" object store
        const transaction = db.transaction('countdowns', 'readonly');

        // Get a reference to the object store
        const objectStore = transaction.objectStore('countdowns');

        // Use getAll to retrieve all animals in the object store
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
            const countdowns = event.target.result;

            if (countdowns.length > 0) {
                // Animals found
                callback(countdowns);
            } else {
                // No animals found
                callback([]);
            }
            // Close the database connection

            db.close();
        };

        getAllRequest.onerror = function (event) {
            // Handle any errors that may occur during the request
            console.error("Error getting all countdowns:", event.target.error);
            callback([]);
            db.close();
        };
    };

    // Handle database open error
    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        callback([]);
    };
}

function getLockedAnimalIds(callback) {
    getAllCountdowns(function (countdowns) {
        var unlockedAnimals = [];
        for (var i = 0; i <= 25; i++) {
            unlockedAnimals.push(i);
        }

        countdowns.forEach((countdown) => {
            var indexToRemove = unlockedAnimals.indexOf(countdown.animalId);

            if (indexToRemove > -1) {
                unlockedAnimals.splice(indexToRemove, 1);
            }
        });

        callback(unlockedAnimals)
    });
}

function insertCountDown(date, length) {
    getLockedAnimalIds(function (lockedAnimalIds) {

        const request = indexedDB.open('zooDb');

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['countdowns'], 'readwrite');
            const objectStore = transaction.objectStore('countdowns');

            let animalId = lockedAnimalIds[Math.floor(Math.random() * lockedAnimalIds.length) + 1];

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

const countDownObjectName = "countDownObject";

function setCurrentCountDownObject(dateStarted, length) {
    const countDownObject = {date: dateStarted, length: length};

    localStorage.setItem(countDownObjectName, JSON.stringify(countDownObject));
}

function getCurrentCountDownObject() {
    return localStorage.getItem(countDownObjectName);
}

function getRemainingSeconds() {
    var object = JSON.parse(getCurrentCountDownObject());
    if (object) {
        console.log("db: ", object.date);
        console.log("now: ", new Date());
        return Math.floor((object.length * 60 - ((new Date() - new Date(object.date)) / (1000)))) + 1;
    }

    return null;
}

function insertCountDownIfFinished() {
    var object = JSON.parse(getCurrentCountDownObject());
    if (object) {
        const startTime = new Date();
        startTime.setMinutes(startTime.getMinutes() - object.length);

        console.log(new Date(object.date));
        console.log(startTime);

        if (new Date(object.date) < startTime) {
            insertCountDown(object.date, object.length);
            deleteCountDownItem();
        }
    }
}

function deleteCountDownItem(){
    localStorage.removeItem(countDownObjectName);
}

function insertCountDownObject() {
    var object = JSON.parse(getCurrentCountDownObject());
    if (object) {
        insertCountDown(object.date, object.length);
        deleteCountDownItem();
    }
}
