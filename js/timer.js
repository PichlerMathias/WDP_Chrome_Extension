import * as countdown from '../db/countdown.js';

let timer = document.getElementById("timer");
let button1 = document.getElementById("start1");
let button5 = document.getElementById("start5");
let button10 = document.getElementById("start10");
let button25 = document.getElementById("start25");
let button50 = document.getElementById("start50");
let cancel = document.getElementById("cancel");
const buttons = [button1, button5, button10, button25, button50];

button1.addEventListener("click", function () {
    startTimer(0.05);
});
button5.addEventListener("click", function () {
    startTimer(5);
});
button10.addEventListener("click", function () {
    startTimer(10);
});
button25.addEventListener("click", function () {
    startTimer(25);
});
button50.addEventListener("click", function () {
    startTimer(50);
});
cancel.addEventListener("click", function () {
    cancelTimer();
});


let timeLeft = 0;
loadTimerIfRunning();

// Function to update the timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function loadTimerIfRunning() {
    let remainingSeconds = countdown.getRemainingSeconds();
    if (remainingSeconds) {
        startClock(remainingSeconds);
    }
}

// Function to start the countdown
function startTimer(minutes) {
    countdown.setCurrentCountDownObject(new Date(), minutes);

    startClock(minutes * 60);
}

function startClock(seconds) {
    showTimer();

    timeLeft = seconds;
    updateTimer();
    const timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            timerFinished();
            clearInterval(timerInterval);
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
}

function showTimer() {
    buttons.forEach(button => {
        button.style.display = "none";
    });
    timer.style.display = "block";
    cancel.style.display = "block";

}

function showButtons() {
    buttons.forEach(button => {
        button.style.display = "block";
    });
    timer.style.display = "none";
    cancel.style.display = "none";
}

function timerFinished() {
    showButtons();
    countdown.insertCountDownObject();
}

function cancelTimer(){
    countdown.deleteCountDownItem();
    showButtons();
}