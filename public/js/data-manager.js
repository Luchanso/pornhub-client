const fs = require('fs')
const passwordFile = 'pass'
const crypto = require('crypto')
const path = require('path')
const dataPath = path.parse(nw.App.getDataPath()).dir + '/'

class DataManager {
  static get password() {
    let file = null

    try {
      file = fs.readFileSync(dataPath + passwordFile).toString()
    } catch (e) {
      file = file
    }

    return file
  }
  static set password(value) {
    let encryptData = DataManager.getHash(value)

    fs.writeFile(dataPath + passwordFile, encryptData)

    return value
  }

  static getHash(string) {
    const hash = crypto.createHash('sha512')
    return hash.update(string).digest('hex')
  }

  static clearCache() {
    nw.global.chrome.browsingData.remove({
      since: 0
    }, {
      appcache: true,
      cache: true,
      cookies: true,
      downloads: true,
      fileSystems: true,
      formData: true,
      history: true,
      indexedDB: true,
      localStorage: true,
      pluginData: true,
      passwords: true,
      serverBoundCertificates: true,
      serviceWorkers: true,
      webSQL: true
    })
  }
}
