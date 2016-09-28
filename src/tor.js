const spawn = require('child_process').spawn
const bin = spawn('tor/tor.exe')
const EventEmitter = require('events')

class Tor {
  constructor() {
    this.bin = bin
    this.events = new EventEmitter()
    this.progress = 0
    this.isReady = false

    bin.stdout.on('data', this.stdoutPrint.bind(this))
  }

  start(callback = null) {
    this.events.on('ready', () => {
      if (callback) callback()
    })
  }

  stdoutPrint(data) {
    let str = data.toString()
    this.progress = this.chainParser(str)

    this.events.emit('message', str)
    this.events.emit('progress', this.progress)
    if (this.progress === 1) {
      this.isReady = true
      this.events.emit('ready')
    }
  }

  chainParser(string) {
    let progress = 0
    let bootstraped = this.getBootstraped(string)

    if (typeof bootstraped === 'number') {
      progress = bootstraped
    }

    return progress
  }

  getBootstraped(string) {
    const firstPath = 'Bootstrapped '

    let startSymbol = string.indexOf(firstPath) + firstPath.length
    let endSymbol = string.indexOf('%')

    if (startSymbol - firstPath.length === -1) {
      return null
    }

    let numberStr = string.substring(startSymbol, endSymbol)

    return Number.parseInt(numberStr) / 100
  }
}

module.exports = new Tor();
