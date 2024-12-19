let minutes = 0, seconds = 0, milliseconds = 0;
let interval = null;
let isRunning = false;

// References to the DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');
const button1 = document.getElementById('button1'); 
const button2 = document.getElementById('button2');

// Start Stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateStopwatch, 10); 
        button1.textContent = 'Stop';
        button1.className = 'stop';
        button2.textContent = 'Lap';
        button2.className = 'lap';
        button2.disabled = false; 
        button1.onclick = stopStopwatch; 
        button2.onclick = recordLap; 
    }
}

// Stop Stopwatch
function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval); 
        button1.textContent = 'Resume';
        button1.className = 'start';
        button2.textContent = 'Reset';
        button2.className = 'reset';
        button2.onclick = resetStopwatch; 
        button1.onclick = startStopwatch;
    }
}

// Reset Stopwatch
function resetStopwatch() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay(); 
    lapsContainer.innerHTML = ''; 
    button1.textContent = 'Start';
    button1.className = 'start';
    button2.textContent = 'Lap';
    button2.className = 'lap';
    button2.disabled = true;
    button1.onclick = startStopwatch;
}

// Record a Lap
function recordLap() {
    if (isRunning) {
        const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
        const li = document.createElement('li');
        li.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(li); 
    }
}

// Update Stopwatch Time
function updateStopwatch() {
    milliseconds += 1;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) { 
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

// Update Time Display
function updateDisplay() {
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds);
}

// Pad Single-Digit Numbers
function pad(value) {
    return value.toString().padStart(2, '0');
}

// Initial Setup
button1.textContent = 'Start'; 
button2.textContent = 'Lap'; 
button2.disabled = true; 
button1.onclick = startStopwatch;
