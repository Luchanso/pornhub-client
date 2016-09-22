const tor = require('./tor.js');

function main() {
  const gui = window.require('nw.gui');
  const App = gui.App;

  const proxyConfig = 'socks4://127.0.0.1:9050';

  App.setProxyConfig(proxyConfig);
}

console.log('Runing node...');
setTimeout(main, 0);

global.tor = tor;
