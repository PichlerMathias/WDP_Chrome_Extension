getAllAnimals(function (animals){
    let table = document.getElementById("imageTable");

    animals.forEach((animal) => {
        // Create a new row
        const row = table.insertRow();

        // Create a table cell (<td>) for the image
        const cell1 = row.insertCell();
        const id = document.createElement('p');
        id.innerHTML = animal.animalId;
        cell1.appendChild(id);

        const cell2 = row.insertCell();

        // Create an image tag and set its source attribute
        const img = document.createElement('img');
        img.height = 70;
        img.width = 70;
        img.src = '../db/data/animalImg/' + animal.animalPath;

        // Append the image to the table cell
        cell2.appendChild(img);
    })
})