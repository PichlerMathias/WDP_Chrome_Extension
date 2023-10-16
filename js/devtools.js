import * as database from '../db/database.js';
import * as countdown from '../db/countdown.js';


document.getElementById('deleteDatabase').addEventListener("click", function () {
    database.deleteZooDatabase();
});
document.getElementById('createDatabase').addEventListener("click", function () {
    database.createZooDatabase();
});
document.getElementById('insertCountdowns').addEventListener("click", function () {
    countdown.insertCountDown(new Date(2023, 9, Math.floor(Math.random() * 30) + 1), 15);
    countdown.insertCountDown(new Date(2023, 9, Math.floor(Math.random() * 30) + 1), 50);
    countdown.insertCountDown(new Date(2023, 9, Math.floor(Math.random() * 30) + 1), 5);
    countdown.insertCountDown(new Date(2023, 9, Math.floor(Math.random() * 30) + 1), 25);
});