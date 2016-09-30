var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: [
      'public/**/*',
      'src/**/*',
      'tor/**/*',
      'package.json'
    ],
    platforms: ['win32', 'win64'],
    flavor: 'normal',
    appName: 'ph-client',
    appVersion: '1.0.0',
    buildDir: './build',
    buildType: 'versioned'
    zip: true
});

nw.on('log',  console.log);

nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
