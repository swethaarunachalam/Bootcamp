let timerInterval;
let minutes = 0;
let seconds = 0;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');


function updateDisplay() {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    display.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 1000);

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
}


function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
