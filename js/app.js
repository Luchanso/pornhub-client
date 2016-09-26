let tor = global.tor;

let progressbar = new ProgressBar.Circle('.container', {
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

tor.events.on('progress', updateProgress.bind(this));
tor.events.on('message', console.log.bind(this));

addEvents();

function rederictOnPornHub() {
  window.location = 'http://pornhub.com';
}

function updateProgress(value) {
  progressbar.set(value);
  progressbar.text.textContent = 'Loading... ' + Math.round(value * 100) + '%';

  if (value === 1) {
    progressbar.text.textContent = 'Ready to start';
    activeStartBtn();
  }
}

function activeStartBtn() {
  let btn = document.getElementsByClassName('btn-start')[0];
  btn.attributes.removeNamedItem('disabled');
}

function addEvents() {
  let btn = document.getElementsByClassName('btn-start')[0];
  btn.onclick = rederictOnPornHub;
}
