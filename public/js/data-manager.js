const fs = require('fs')
const passwordPath = './data/pass'
const crypto = require('crypto')
const exec = require('child_process').execFile

class DataManager {
  static get password() {
    let file = null

    try {
      file = fs.readFileSync(passwordPath).toString()
    } catch (e) {
      file = file
    }

    return file
  }
  static set password(value) {
    let encryptData = DataManager.getHash(value)

    fs.writeFile(passwordPath, encryptData)

    return value
  }

  static getHash(string) {
    const hash = crypto.createHash('sha512')
    return hash.update(string).digest('hex')
  }

  static clearCache() {
    exec('remove-run.bat')
  }
}
