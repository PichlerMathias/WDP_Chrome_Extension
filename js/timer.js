
timer = document.getElementById("timer");
button1 = document.getElementById("start1");
button5 = document.getElementById("start5");
button10 = document.getElementById("start10");
button25 = document.getElementById("start25");
button50 = document.getElementById("start50");
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


let timeLeft = 30 * 60;

// Function to update the timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to start the countdown
function startTimer(minutes) {
    setCurrentCountDownObject(new Date(), minutes);

    showTimer();

    timeLeft = minutes * 60;
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

}

function showButtons() {
    buttons.forEach(button => {
        button.style.display = "block";
    });
    timer.style.display = "none";
}

function timerFinished() {
    showButtons();
    insertCountDownObject();
}