const fs = require('fs')

const NwBuilder = require('nw-builder')
const utilityFile = [
  'remove-run.bat',
  'remove.bat',
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
  appVersion: '1.0.3',
  buildDir: './build',
  buildType: 'versioned',
  zip: true
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
      fs.createReadStream(file).pipe(fs.createWriteStream(`./build/${options.appName} - v${options.appVersion}/win32/${file}`))
    }
  }
  console.log('All done!')
}).catch(function(error) {
  console.error(error)
})
