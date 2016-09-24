var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: [
      'js/**/*',
      'src/**/*',
      'tor/**/*',
      'style/**/*',
      'vendor/**/*',
      'package.json',
      'index.html'
    ],
    platforms: ['win32'],
    flavor: 'sdk',
    appName: 'ph-client',
    appVersion: '0.1.1',
    buildDir: './build',
    zip: true
});

nw.on('log',  console.log);

nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});
