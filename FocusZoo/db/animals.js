// gets animal from database
function getAnimalById(animalId, callback) {
    const request = indexedDB.open('zooDb');

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('animals', 'readonly');
        const objectStore = transaction.objectStore('animals');
        const getRequest = objectStore.get(animalId);

        getRequest.onsuccess = function (event) {
            const animal = event.target.result;

            if (animal) {
                callback(animal);
            } else {
                callback(null);
            }

            db.close();
        };

        getRequest.onerror = function (event) {
            console.error("Error getting animal by animalId:", event.target.error);
            callback(null);
            db.close();
        };
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        callback(null);
    };
}

// gets all animals from database
export function getAllAnimals(callback) {
    const request = indexedDB.open('zooDb');

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('animals', 'readonly');
        const objectStore = transaction.objectStore('animals');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
            const animals = event.target.result;

            if (animals.length > 0) {
                callback(animals);
            } else {
                callback([]);
            }

            db.close();
        };

        getAllRequest.onerror = function (event) {
            console.error("Error getting all animals:", event.target.error);
            callback([]);
            db.close();
        };
    };

    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        callback([]);
    };
}

// gets corresponding image for animal
export function getAnimalImageById(animalId, callback) {
    getAnimalById(animalId, function(animal) {
        if (animal) {
            if (animal) {
                callback(animal.animalPath);
            } else {
                callback(null); // Animal-object doesn't have imgPath property
            }
        } else {
            callback(null);
        }
    });
}