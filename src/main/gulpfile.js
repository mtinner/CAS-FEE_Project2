var gulp = require('gulp'),
  config = require('load-gulp-config'),
  runSequence = require('run-sequence'),
  server = require('gulp-express');

// Specifics of npm's package.json handling.
// @see https://docs.npmjs.com/files/package.json
var pack = config.util.readJSON('package.json');

config(gulp, {
  // path to task's files, defaults to gulp dir.
  configPath: config.util.path.join('gulp', '*.js'),
  // data passed into config task.
  data: Object.assign(
    {
      path: {
        root: '../../',
        e2e: '../test/e2e/'
      },
      anyValue: 1,
      anyParams: []
    },
    pack
  )
});

gulp.task('default', function (callback) {
  runSequence(
    'clean:Dist',
    ['transpiling:Dist', 'sass:Dist'],
    ['copy:App', 'copy:Scripts'],
    ['connect:Dist', 'serve'],
    callback
  );
});

gulp.task('serveStyleGuide', function (callback) {
  runSequence(
    ['clean:Styleguide'],
    ['sass:Styleguide'],
    ['concat:Styleguide'],
    ['styleguide'],
    ['copy:StyleguideIcon', 'connect:Styleguide'],
    callback
  );
});

gulp.task('e2e', function (callback) {
  runSequence(
    'clean:E2e',
    ['transpiling:E2e', 'sass:E2e'],
    ['copy:E2eApp', 'copy:E2eScripts'],
    'connect:E2e',
    'angularProtractor',
    callback
  );
});

gulp.task('serve', function () {
  server.run(['./backend/server.js']);
});