import * as countdown from '../../db/countdown.js';
import {insertCountDownIfFinished} from "../../db/countdown.js";

let timer = document.getElementById("timer");

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;


const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};


let remainingPathColor = COLOR_CODES.info.color;


export function getRemainingSeconds(callback) {
    return countdown.getRemainingSeconds(function (value, limit) {
        callback(value, limit);
    });
}

export function initClock(callback) {
    initClockHtml();
    getRemainingSeconds(function (remainingSeconds, limit) {
        if (remainingSeconds && remainingSeconds > 0) {
            callback(true);
        } else {
            insertCountDownIfFinished(function () {
                callback(false);
            })
        }
    });
}

function initClockHtml() {
    document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">TODO</span>
</div>
`;
}


// Function to start the countdown
export function startNewClock(seconds, clockFinishedCallback) {
    countdown.setCurrentCountDownObject(new Date(), seconds, function () {
        startClock(seconds, seconds, clockFinishedCallback);
    });
}

function updateClock(timeLeft, limit) {
    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
    );
    setCircleDasharray(timeLeft, limit);
    setRemainingPathColor(timeLeft);
}

let timerInterval;

export function startClock(timeLeft, limit, clockFinishedCallback) {
    showClock();

    updateClock(timeLeft, limit);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateClock(timeLeft, limit);

        if (timeLeft === 0) {
            hideClock();
            countdown.insertCountDownIfFinished(function () {
                clearInterval(timerInterval);
                clockFinishedCallback();
            });
        }
    }, 1000);
}





function showClock() {
    timer = document.getElementById("timer");
    timer.style.display = "block";
}

function hideClock() {
    timer.style.display = "none";
}

export function cancelClock() {
    clearInterval(timerInterval);
    countdown.deleteCountDownItem(function () {
        hideClock();
    });
}


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const {alert, warning, info} = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft -1 <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction(timeLeft, limit) {
    const rawTimeFraction = timeLeft / limit;
    return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLeft, limit) {
    const circleDasharray = `${(
        calculateTimeFraction(timeLeft, limit) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}
