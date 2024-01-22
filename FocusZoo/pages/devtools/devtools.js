import * as database from '../../db/database.js';
import * as countdown from '../../db/countdown.js';
import * as websites from '../../db/websites.js';


document.getElementById('deleteDatabase').addEventListener("click", function () {
    database.deleteZooDatabase();
});
document.getElementById('createDatabase').addEventListener("click", function () {
    database.createZooDatabase();
    websites.initWebsites(function (){

    });
});
document.getElementById('insertCountdowns').addEventListener("click", function () {
    let length = [5, 15, 25, 50];

    countdown.insertCountDown(new Date(2023, 9, Math.floor(Math.random() * 30) + 1), length[Math.floor(Math.random() * 4)]*60);
});
