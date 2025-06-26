let timer;
let minutes = 30;
let seconds = 0;
let isWorkTime = true;
let timerRunning = false;

// Create timer element
const timerElement = document.createElement('div');
timerElement.id = 'educationTimer';
timerElement.style.position = 'fixed';
timerElement.style.bottom = '10px';
timerElement.style.right = '10px';
timerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
timerElement.style.color = 'white';
timerElement.style.padding = '10px';
timerElement.style.borderRadius = '5px';
timerElement.style.zIndex = '9999';
timerElement.style.fontFamily = 'Arial, sans-serif';
timerElement.style.fontSize = '16px';
document.body.appendChild(timerElement);

function updateDisplay() {
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerElement.textContent = `${isWorkTime ? 'WORK' : 'BREAK'}: ${displayMinutes}:${displaySeconds}`;
  
  // Remove all classes and add the appropriate one
  timerElement.className = '';
  timerElement.classList.add(isWorkTime ? 'work-mode' : 'break-mode');
  
  // Add pulse animation when time changes
  if (seconds === 0 && minutes === (isWorkTime ? 30 : 10)) {
    timerElement.classList.add('time-change');
    setTimeout(() => timerElement.classList.remove('time-change'), 500);
  }
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        // Time's up - switch mode
        isWorkTime = !isWorkTime;
        minutes = isWorkTime ? 30 : 10;
        seconds = 0;
        
        // Notify user
        const notification = new Notification(isWorkTime ? 'Work Time!' : 'Break Time!', {
          body: isWorkTime ? '30 minutes of work starts now!' : 'Take a 10-minute break!'
        });
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  minutes = 30;
  seconds = 0;
  isWorkTime = true;
  timerRunning = false;
  updateDisplay();
}

// Initialize display
updateDisplay();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    startTimer();
  } else if (request.action === "resetTimer") {
    resetTimer();
  }
});