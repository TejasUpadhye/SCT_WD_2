let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
  if (!running) {
    startTime = Date.now() - difference;
    tInterval = setInterval(updateTime, 1000);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pauseTimer() {
  running = false;
  clearInterval(tInterval);
  difference = Date.now() - startTime;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function updateTime() {
  updatedTime = Date.now() - startTime;
  let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

  display.innerHTML = (hours > 9 ? hours : '0' + hours) + ':' + 
                      (minutes > 9 ? minutes : '0' + minutes) + ':' + 
                      (seconds > 9 ? seconds : '0' + seconds);
}

function recordLap() {
  if (running) {
    let lapTime = display.innerHTML;
    laps.push(lapTime);
    let lapItem = document.createElement('li');
    lapItem.textContent = 'Lap ' + laps.length + ': ' + lapTime;
    lapItem.classList.add('animate');
    lapsList.appendChild(lapItem);
  }
}
