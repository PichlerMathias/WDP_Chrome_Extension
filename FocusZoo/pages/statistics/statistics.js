import * as dbCountDown from '../../db/countdown.js';
import * as dbAnimals from '../../db/animals.js';

function getChartData() {
    let data = [];

    dbCountDown.getAllCountdowns(function (countdowns) {
        countdowns.forEach((countdown) => {

            var date = new Date(countdown.date);

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${day}.${month}.${year}`;

            var entry = [formattedDate, countdown.length/60, countdown.animalId];

            data.push(entry);
        });
    });

    return data;

}

async function fetchData() {
    let data = getChartData();

    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    return data;
}


fetchData().then(data => {
    const chart = document.getElementById("chart");
    document.getElementById("loading_text").remove();
    data.forEach(entry => {
        const row = document.createElement("div");
        row.className = "bar-row";

        const date = document.createElement("p");
        date.innerHTML = entry[0];

        const img = document.createElement("img");

        dbAnimals.getAnimalImageById(entry[2], function(imgPath) {
            if (imgPath) {
                img.src = "../../db/data/animalImg/" + imgPath;
            } else {
            }
        });


        img.height = 30;

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = entry[1] * 10 + "px"; // Adjust the scale as needed
        bar.textContent = entry[1];
        row.appendChild(date);
        row.appendChild(img);
        row.appendChild(bar);
        chart.appendChild(row);
    })
})
