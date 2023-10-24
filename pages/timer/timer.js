import * as clock from './clock.js';

let button1 = document.getElementById("start1");
let button5 = document.getElementById("start5");
let button10 = document.getElementById("start10");
let button25 = document.getElementById("start25");
let button50 = document.getElementById("start50");
const buttons = [button1, button5, button10, button25, button50];
let cancel = document.getElementById("cancel");

button1.addEventListener("click", function () {
    clock.startNewClock(0.05, showStartButtons);
    hideStartButtons();
});
button5.addEventListener("click", function () {
    clock.startNewClock(5, showStartButtons);
    hideStartButtons();
});
button10.addEventListener("click", function () {
    clock.startNewClock(10, showStartButtons);
    hideStartButtons();
});
button25.addEventListener("click", function () {
    clock.startNewClock(25, showStartButtons);
    hideStartButtons();
});
button50.addEventListener("click", function () {
    clock.startNewClock(50, showStartButtons);
    hideStartButtons();
});

cancel.addEventListener("click", function () {
    clock.cancelClock();
    showStartButtons();
});

clock.getRemainingSeconds(function (remainingSeconds){
    if(remainingSeconds){
        hideStartButtons();
        clock.startClock(remainingSeconds, showStartButtons);
    }
});


function hideStartButtons(){
    buttons.forEach(button => {
        button.style.display = "none";
    });
    cancel.style.display = "block";
}

function showStartButtons(){
    buttons.forEach(button => {
        button.style.display = "block";
    });

    cancel.style.display = "none";
}