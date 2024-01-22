function getAnimalById(animalId, callback) {
    // Open a connection to the database
    const request = indexedDB.open('zooDb');

    // Handle database open success
    request.onsuccess = function (event) {
        const db = event.target.result;

        // Open a transaction on the "animals" object store
        const transaction = db.transaction('animals', 'readonly');

        // Get a reference to the object store
        const objectStore = transaction.objectStore('animals');

        // Retrieve the animal by animalId
        const getRequest = objectStore.get(animalId);

        getRequest.onsuccess = function (event) {
            const animal = event.target.result;

            if (animal) {
                // Animal found
                callback(animal);
            } else {
                // Animal not found
                callback(null);
            }

            // Close the database connection
            db.close();
        };

        getRequest.onerror = function (event) {
            // Handle any errors that may occur during the request
            console.error("Error getting animal by animalId:", event.target.error);
            callback(null);
            db.close();
        };
    };

    // Handle database open error
    request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
        callback(null);
    };
}

export function getAllAnimals(callback) {
    // Open a connection to the database
    const request = indexedDB.open('zooDb');

    // Handle database open success
    request.onsuccess = function (event) {
        const db = event.target.result;

        // Open a transaction on the "animals" object store
        const transaction = db.transaction('animals', 'readonly');

        // Get a reference to the object store
        const objectStore = transaction.objectStore('animals');

        // Use getAll to retrieve all animals in the object store
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
            const animals = event.target.result;

            if (animals.length > 0) {
                // Animals found
                callback(animals);
            } else {
                // No animals found
                callback([]);
            }
            // Close the database connection

            db.close();
        };

        getAllRequest.onerror = function (event) {
            // Handle any errors that may occur during the request
            console.error("Error getting all animals:", event.target.error);
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


export function getAnimalImageById(animalId, callback) {
    getAnimalById(animalId, function(animal) {
        if (animal) {
            // Check if the animal object has an 'imgPath' property
            if (animal) {
                // Return the imgPath
                callback(animal.animalPath);
            } else {
                // Animal object doesn't have imgPath property
                callback(null);
            }
        } else {
            // Animal not found
            callback(null);
        }
    });
}