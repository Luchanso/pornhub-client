console.log('Electron Run');

const {app, BrowserWindow, ipcMain} = require('electron')
const async = require('async')
const tor = require('./tor')
const storage = require('electron-json-storage')
const pages = `file://${__dirname}/../public/pages/`

let win

tor.events.on('ready', () => {
  createProxy()
})

ipcMain.on('password', setPassword)

function setPassword(event, password) {
  storage.set('password', {pass: password});
}

function createWindow(next) {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.setMenu(null);

  next();
}

function runApp(isLocked, next) {
  let page = 'index.html'

  if (isLocked) page = 'password-page.html'

  win.loadURL(pages + page)
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })

  next()
}

function createProxy(next = null) {
  const proxyConfig = {
    proxyRules: 'socks4://127.0.0.1:9050'
  }
  const ses = win.webContents.session
  ses.setProxy(proxyConfig, () => {
    if (next) next()
  })
}

function initTor(next) {
  global.tor = tor;

  if (tor.isReady) return next()

  tor.start(next)
}

function checkPassword(next) {
  storage.has('password', next)
}

function appIsReady() {
  initTor();

  async.waterfall([
    createWindow,
    checkPassword,
    runApp
  ], (err) => {
    if (err) {
      throw err
    }
  })
}

app.on('ready', appIsReady)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
