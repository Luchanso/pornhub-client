const spawn = require('child_process').spawn;
const bin = spawn('tor/tor/tor.exe');
const EventEmitter = require('events');

let tor = {
  bin: bin,
  events: new EventEmitter(),
};

bin.stdout.on('data', (data) => {
  console.log(data.toString());

  let str = data.toString();
  let progress = chainParser(str);

  tor.events.emit('message', str);
  tor.events.emit('progress', progress);
});

function chainParser(string) {
  let progress = 0;
  let bootstraped = getBootstraped(string);

  if (typeof bootstraped === 'number') {
    progress = bootstraped;
  }

  return progress;
}

function getBootstraped(string) {
  const firstPath = 'Bootstrapped ';

  let startSymbol = string.indexOf(firstPath) + firstPath.length;
  let endSymbol = string.indexOf('%');


  if (startSymbol - firstPath.length === -1) {
    return null;
  }

  let numberStr = string.substring(startSymbol, endSymbol);

  return Number.parseInt(numberStr) / 100;
}

module.exports = tor;
