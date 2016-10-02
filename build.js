const fs = require('fs')
let isPortable = false

if (process.argv.includes('--portable')) {
  isPortable = true
  buildPortableVersion()
}

const NwBuilder = require('nw-builder')
const utilityFile = [
  'ffmpeg.dll'
]
const options = {
  files: [
    'public/**/*',
    'src/**/*',
    'tor/**/*',
    'index.html',
    'package.json'
  ],
  platforms: ['win32', 'win64'],
  flavor: 'normal',
  appName: 'ph-client',
  appVersion: '1.0.5',
  buildDir: isPortable ? './build/portable' : './build',
  buildType: 'versioned',
  zip: true
}

if (isPortable) {
  options.platforms = ['win32']
}

const nw = new NwBuilder(options)

nw.on('log', console.log)

nw.build().then(function() {
  if (options.platforms.includes('win32')) {
    for (let file of utilityFile) {
      console.log('Copy win32 ', file)
      fs.createReadStream(file).pipe(fs.createWriteStream(`./build/${options.appName} - v${options.appVersion}/win32/${file}`))
    }
  }
  if (options.platforms.includes('win64')) {
    for (let file of utilityFile) {
      console.log('Copy win64 ', file)
      fs.createReadStream(file).pipe(fs.createWriteStream(`./build/${options.appName} - v${options.appVersion}/win64/${file}`))
    }
  }
  console.log('All done!')
  if (isPortable)
    finishBuildPortableVersion()
}).catch(function(error) {
  console.error(error)
  if (isPortable)
    finishBuildPortableVersion()
})

function buildPortableVersion() {
  let rowData = fs.readFileSync('package.json').toString()

  fs.writeFileSync('package.lock.json', rowData)

  data = JSON.parse(rowData)
  data["chromium-args"] = "-user-data-dir='./data/'"

  fs.writeFileSync('package.json', JSON.stringify(data))
}

function finishBuildPortableVersion() {
  let rowData = fs.readFileSync('package.lock.json').toString()
  fs.unlinkSync('package.lock.json')

  fs.writeFileSync('package.json', rowData)
}
