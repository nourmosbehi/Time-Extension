document.getElementById('startTimer').addEventListener('click', () => {
  document.getElementById('status').textContent = "Timer started!";
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "startTimer"});
  });
  setTimeout(() => document.getElementById('status').textContent = "", 2000);
});

document.getElementById('resetTimer').addEventListener('click', () => {
  document.getElementById('status').textContent = "Timer reset!";
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "resetTimer"});
  });
  setTimeout(() => document.getElementById('status').textContent = "", 2000);
});