const spawn = require('child_process').spawn;
const bin = spawn('tor/tor/tor.exe');
const EventEmitter = require('events');

var tor = {
  bin: bin,
  events: new EventEmitter(),
};

bin.stdout.on('data', (data) => {
  console.log(data.toString());

  var str = data.toString();
  var progress = chainParser(str);

  tor.events.emit('message', str);
  tor.events.emit('progress', progress);
});

function chainParser(string) {
  var progress = 0;
  var bootstraped = getBootstraped(string);

  if (typeof bootstraped === 'number') {
    progress = bootstraped;
  }

  return progress;
}

function getBootstraped(string) {
  const firstPath = 'Bootstrapped ';

  var startSymbol = string.indexOf(firstPath) + firstPath.length;
  var endSymbol = string.indexOf('%');


  if (startSymbol - firstPath.length === -1) {
    return null;
  }

  var numberStr = string.substring(startSymbol, endSymbol);

  return Number.parseInt(numberStr) / 100;
}

module.exports = tor;
