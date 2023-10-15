
function getChartData() {
    let data = [];

    getAllCountdowns(function (countdowns) {
        countdowns.forEach((countdown) => {

            var date = new Date(countdown.date);

            const day = date.getDate().toString().padStart(2, '0'); // Get the day and format it with leading zeros if needed
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month, add 1 to get the actual month, and format it
            const year = date.getFullYear(); // Get the full year

            const formattedDate = `${day}.${month}.${year}`;

            var entry = [formattedDate, countdown.length, countdown.animalId];

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

        console.log("try get ", entry[2]);

        getAnimalImageById(entry[2], function(imgPath) {
            if (imgPath) {
                img.src = "../db/data/animalImg/" + imgPath;
                console.log("read: " , imgPath);
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
