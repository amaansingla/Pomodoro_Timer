let workTime = 15 //* 60; // 25 minutes in seconds
let breakTime = 5 //* 60;  // 5 minutes in seconds
let time = workTime;
let timeInterval = null;
const bell = new Audio("bell.mov");

const timeDisplay = document.getElementById("time");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let mode = document.getElementById("mode");
let alertBox = document.getElementById("alert");

let currentMode = "Work";
let alertTimeout;

// Helper function to show inline alerts with fade out
function showAlert(message, duration = 5000) {
  bell.play();
  alertBox.textContent = `Alert: ${message}`;
  alertBox.style.opacity = 1; // fade in
  if (alertTimeout) clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => {
    alertBox.style.opacity = 0; // fade out
  }, duration);
}

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  mode.textContent = `Mode: ${currentMode}`;
}

function startTimer() {
  showAlert("Timer has started", 3000);
  if (timeInterval) return;
  timeInterval = setInterval(() => {
    time--;
    updateTimer();

    if (time <= 0) {
      if (currentMode === "Work") {
        currentMode = "Break";
        time = breakTime;
        showAlert("Break Time", 5000);
      } else {
        currentMode = "Work";
        showAlert("Break is Over. Study Time!", 5000);
        clearInterval(timeInterval);
        timeInterval = null;
      }
      updateTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timeInterval);
  timeInterval = null;
  currentMode = "Work";
  time = workTime;
  updateTimer();
  showAlert("Timer has been reset", 3000);
}

start.addEventListener("click", startTimer);
reset.addEventListener("click", resetTimer);

updateTimer();
