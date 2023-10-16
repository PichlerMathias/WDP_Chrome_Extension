import * as countdown from "../db/countdown.js";
import * as animal from "../db/animals.js";

animal.getAllAnimals(function (animals) {
    countdown.getUnlockedAnimalIds(function (unlockedIds) {

        let container = document.getElementById("animalContainer");

        animals.forEach((animal) => {
            // Create a new div element for the animal
            const animalDiv = document.createElement('div');
            animalDiv.classList.add('col-sm-2', 'col-md-2', 'col-lg-1'); // Bootstrap classes for column sizing

            // Create an image element
            const img = document.createElement('img');
            img.classList.add('img-fluid'); // Make the image responsive with Bootstrap class
            img.height = 70;
            img.width = 70;

            img.src = '../db/data/animalImg/' + animal.animalPath;
            if (!unlockedIds.includes(animal.animalId)) {
                img.style.opacity = "0.15";

            }

            // Append the image and ID to the animal div
            animalDiv.appendChild(img);

            // Append the animal div to the container
            container.appendChild(animalDiv);
        });

    })
});