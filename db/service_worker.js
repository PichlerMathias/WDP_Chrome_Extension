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

        // Create the "animals" object store with a keyPath and an index
        const objectStoreAnimals = db.createObjectStore('animals', {keyPath: 'animalId'});
        objectStoreAnimals.createIndex('animalPath', 'animalPath', {unique: true});
    };

    request.onsuccess = function () {
        console.log('zooDb created and initialized successfully');
    };

    request.onerror = function (event) {
        console.error('Error creating zooDb:', event.target.error);
    };
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
       animalPath: animalPath+".svg"
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


deleteZooDatabase()
createZooDatabase();
insertAnimals();
