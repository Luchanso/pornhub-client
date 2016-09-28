const {app, BrowserWindow} = require('electron')
const pages = `file://${__dirname}/../public/pages`;

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(`${pages}/index.html`);
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
