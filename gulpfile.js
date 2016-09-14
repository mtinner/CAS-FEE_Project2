var gulp = require('gulp'),
    config = require('load-gulp-config'),
    runSequence = require('run-sequence');


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
                frontend: './src/frontend/',
                backend: './src/backend/',
                tmpE2e: './src/.tmpE2e/',
                e2e: './src/e2e/',
                spec: './src/spec/',
                dist: './src/.dist/',
                styleguide: './src/.styleguide/'
            },
            anyValue: 1,
            anyParams: []
        },
        pack
    )
});

gulp.task('Default', function (callback) {
    runSequence(
        'clean:Dist',
        ['transpiling:Dist', 'sass:Dist'],
        ['copy:App'],
        ['serve:Dist'],
        ['watch:Transpiling', 'watch:Sass'],
        callback
    );
});

gulp.task('ServeStyleGuide', function (callback) {
    runSequence(
        ['clean:Styleguide'],
        ['sass:Styleguide'],
        ['concat:Styleguide'],
        ['styleguide'],
        ['copy:StyleguideIcon', 'connect:Styleguide'],
        callback
    );
});


gulp.task('Spec', function (callback) {
    runSequence(
        'clean:Spec',
        ['transpiling:Spec'],
        'connect:Spec',
        callback
    );
});

gulp.task('E2e', function (callback) {
    runSequence(
        'clean:E2e',
        ['transpiling:E2e', 'sass:E2e'],
        ['copy:E2eApp'],
        'connect:E2e',
        'angularProtractor',
        callback
    );
});