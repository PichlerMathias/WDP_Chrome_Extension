import * as clock from './clock.js';

let button1 = document.getElementById("start1");
let button5 = document.getElementById("start5");
let button10 = document.getElementById("start10");
let button25 = document.getElementById("start25");
let button50 = document.getElementById("start50");
const buttons = [button1, button5, button10, button25, button50];
let cancel = document.getElementById("cancel");

// event listeners for all timer-buttons
button1.addEventListener("click", function () {
    clock.startNewClock(3, showStartButtons);
    hideStartButtons();
});
button5.addEventListener("click", function () {
    clock.startNewClock(5*60, showStartButtons);
    hideStartButtons();
});
button10.addEventListener("click", function () {
    clock.startNewClock(10*60, showStartButtons);
    hideStartButtons();
});
button25.addEventListener("click", function () {
    clock.startNewClock(25*60, showStartButtons);
    hideStartButtons();
});
button50.addEventListener("click", function () {
    clock.startNewClock(50*60, showStartButtons);
    hideStartButtons();
});

cancel.addEventListener("click", function () {
    clock.cancelClock();
    showStartButtons();
});


clock.initClock(function (timerIsRunning) {
    if (timerIsRunning) {

        clock.getRemainingSeconds(function (remainingSeconds, limit) {
            hideStartButtons();
            clock.startClock(remainingSeconds, limit, showStartButtons);
        });
    }

})


function hideStartButtons() {
    buttons.forEach(button => {
        button.style.display = "none";
    });
    cancel.style.display = "block";
}

function showStartButtons() {
    buttons.forEach(button => {
        button.style.display = "block";
    });

    cancel.style.display = "none";
}
