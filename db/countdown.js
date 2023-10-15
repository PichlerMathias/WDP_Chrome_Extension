

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