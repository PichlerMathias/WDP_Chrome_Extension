import * as countdown from "../../db/countdown.js";
import * as animal from "../../db/animals.js";

// inserts all animal-images onto the page
animal.getAllAnimals(function (animals) {
    countdown.getUnlockedAnimalIds(function (unlockedIds) {

        let container = document.getElementById("animalContainer");

        animals.forEach((animal) => {
            const animalDiv = document.createElement('div');
            animalDiv.classList.add('animal-item');

            const img = document.createElement('img');
            img.classList.add('img-fluid');
            img.height = 70;
            img.width = 70;

            img.src = '../../db/data/animalImg/' + animal.animalPath;

            if (!unlockedIds.includes(animal.animalId)) {
                img.classList.add('img-locked');
            }

            animalDiv.appendChild(img);

            container.appendChild(animalDiv);
        });

    })
});
