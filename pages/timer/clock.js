import * as countdown from '../../db/countdown.js';

let timer = document.getElementById("timer");

let timeLeft = 0;

// Function to update the timer display
function updateClock() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getRemainingSeconds(callback) {
    return countdown.getRemainingSeconds(function (value){
        console.log("got: ", value);
        callback(value)
    });
}

// Function to start the countdown
export function startNewClock(minutes, clockFinishedCallback) {
    countdown.setCurrentCountDownObject(new Date(), minutes, function () {
        startClock(minutes * 60, clockFinishedCallback);
    });
}

export function startClock(seconds, clockFinishedCallback) {
    showClock();
    timeLeft = seconds;
    updateClock();
    const timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateClock();
        } else {
            clockFinished();
            clearInterval(timerInterval);
            clockFinishedCallback();
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
}

function showClock() {
    timer = document.getElementById("timer");
    timer.style.display = "block";
}

function hideClock() {
    timer.style.display = "none";
}

function clockFinished() {
    hideClock();
}

export function cancelClock() {
    countdown.deleteCountDownItem();
    hideClock();
}