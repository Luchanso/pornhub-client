const tor = require('./tor')
const async = require('async')

global.tor = tor

let gui
let hotkeys = []

function main(next) {
  gui = window.require('nw.gui')

  if (next) next()
}

function runProxy(next) {
  tor.start();

  if (next) next()
}

function connectToProxy(next) {
  const App = gui.App

  const proxyConfig = 'socks4://127.0.0.1:9050'

  App.setProxyConfig(proxyConfig)

  if (next) next()
}

function bindHotkeys(next) {
  createKey('Escape', pressEscape)

  next()
}

function pressEscape() {
  gui.App.closeAllWindows()
}

function createKey(keyName, callback) {
  const key = new gui.Shortcut({key: keyName})
  gui.App.registerGlobalHotKey(key)
  key.on('active', callback)

  hotkeys.push(key)
}

setTimeout(() => {
  async.waterfall([
    runProxy,
    main,
    bindHotkeys,
    connectToProxy
  ], (err, res) => {
    if (err) throw err
  })
}, 1000);
