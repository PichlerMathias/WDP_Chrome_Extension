import * as countdown from "../../db/countdown.js";
import * as animal from "../../db/animals.js";

animal.getAllAnimals(function (animals) {
    countdown.getUnlockedAnimalIds(function (unlockedIds) {

        let container = document.getElementById("animalContainer");

        animals.forEach((animal) => {
            // Create a new div element for the animal
            const animalDiv = document.createElement('div');
            animalDiv.classList.add('animal-item');

            // Create an image element
            const img = document.createElement('img');
            img.classList.add('img-fluid');
            img.height = 70;
            img.width = 70;

            img.src = '../../db/data/animalImg/' + animal.animalPath;

            if (!unlockedIds.includes(animal.animalId)) {
                img.classList.add('img-locked');
            }

            // Append the image to the animal div
            animalDiv.appendChild(img);

            // Append the animal div to the container
            container.appendChild(animalDiv);
        });

    })
});
