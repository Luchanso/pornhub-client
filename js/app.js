var tor = global.tor;

tor.events.on('progress', updateProgress.bind(this));
tor.events.on('message', writeInLog.bind(this));

function rederictOnPornHub() {
  const delay = 3;
  var timer = {
    tick: 0
  };

  writeInLog(`Running in ${delay} sec...`);

  setTimeout(() => {
    window.location = 'http://pornhub.com';
  }, delay * 1000);

  timer.counter = setInterval(() => {
    timer.tick++;

    writeInLog(`Running in ${delay - timer.tick} sec...`);
    if (timer.tick >= delay) {
      clearInterval(timer.counter);
    }
  }, 1000);
}

function updateProgress(value) {
  progressbar.set(value);
  progressbar.text.textContent = 'Loading... ' + Math.round(value * 100) + '%';

  if (value === 1) {
    rederictOnPornHub();
  }
}

/**
 * Write in page log
 * @param  {String} message Your message
 */
function writeInLog(message) {
  var paragraph = document.createElement('p');
  var newLine = document.createElement('br');
  var node = document.createTextNode('[' + new Date().toLocaleTimeString() + '] ' + message);

  paragraph.appendChild(node);
  paragraph.appendChild(newLine);

  var log = document.getElementsByClassName('log')[0];
  log.appendChild(paragraph);
}

var progressbar = new ProgressBar.Circle('.container', {
  strokeWidth: 2,
  color: '#FF9900',
  svgStyle: {
    display: 'block',
    width: '320px',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
  text: {
    value: 'Loading...',
  }
});
