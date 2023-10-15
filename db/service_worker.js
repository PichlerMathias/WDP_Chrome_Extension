// Function to delete the database
function deleteZooDatabase() {
    const request = indexedDB.deleteDatabase('zooDb');
    request.onsuccess = function () {
        console.log('zooDb deleted successfully');
    };
    request.onerror = function (event) {
        console.error('Error deleting zooDb:', event.target.error);
    };
}

// Function to create the database and set up the object store
function createZooDatabase() {
    const request = indexedDB.open('zooDb', 1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;

        // animals table
        const objectStoreAnimals = db.createObjectStore('animals', {keyPath: 'animalId'});
        objectStoreAnimals.createIndex('animalPath', 'animalPath', {unique: true});

        // countdown table
        const objectStoreCountdown = db.createObjectStore('countdowns', {keyPath: 'countDownId', autoIncrement: true});
        objectStoreCountdown.createIndex('date', 'date', {unique: false});
        objectStoreCountdown.createIndex('length', 'length', {unique: false});
        objectStoreCountdown.createIndex('animalId', 'animalId', {unique: false});

        return true;
    };

    request.onsuccess = function () {
        console.log('zooDb created and initialized successfully');
    };

    request.onerror = function (event) {
        console.error('Error creating zooDb:', event.target.error);
    };

    return false;
}

const inputArray = [
    'baby_chicken',
    'bug',
    'camel',
    'cow',
    'crab',
    'dog',
    'dolphin',
    'fish',
    'fox-face',
    'giraffe',
    'honeybee',
    'horse-face',
    'lion-face',
    'monkey',
    'mouse',
    'penguin',
    'pig-face',
    'rabbit',
    'ram',
    'rooster',
    'sheep',
    'snail',
    'spouting-whale',
    'turtle',
    'unicorn-face',
    'whale'
];

function getAnimals() {
    return inputArray.map((animalPath, index) => ({
        animalId: index + 1,
        animalPath: animalPath + ".svg"
    }));
}

function insertAnimals() {
    const request = indexedDB.open('zooDb');

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['animals'], 'readwrite');
        const objectStore = transaction.objectStore('animals');

        let animals = getAnimals();
        animals.forEach(animal => {
                const addRequest = objectStore.add(animal);

                addRequest.onsuccess = function () {
                    console.log('Animal inserted successfully');
                };

                addRequest.onerror = function (event) {
                    console.error('Error inserting animal:', event.target.error);
                };
            }
        )
    };
}

function insertCountdown(date, length, animalId) {
    const request = indexedDB.open('zooDb');

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['countdowns'], 'readwrite');
        const objectStore = transaction.objectStore('countdowns');

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
}

function initDatabase()
{
    //deleteZooDatabase();

    if(createZooDatabase()){
        console.log("insert values");
        insertAnimals();

        insertCountdown(new Date(2023, 10, 1), 15, 1);
        insertCountdown(new Date(2023, 10, 3), 5, 3);
        insertCountdown(new Date(2023, 10, 7), 25, 17);
        insertCountdown(new Date(2023, 10, 7), 50, 6);
        insertCountdown(new Date(2023, 10, 8), 15, 13);
        insertCountdown(new Date(2023, 10, 11), 5, 14);
    }
}

initDatabase();