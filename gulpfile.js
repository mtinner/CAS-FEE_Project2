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
                prod: './prod/',
                tmpE2e: './src/.tmpE2e/',
                tmpProd: './src/.tmpProd/',
                aot: './src/.aot/',
                e2e: './src/e2e/',
                spec: './src/spec/',
                dist: './src/.dist/'
            },
            anyValue: 1,
            anyParams: []
        },
        pack
    )
});

gulp.task('Default', function (callback) {
    runSequence(
        'lint:Es',
        'lint:Ts',
        'Build',
        'serve:Dist',
        ['watch:All'],
        callback
    );
});

gulp.task('Build', function (callback) {
    runSequence(
        'clean:Dist',
        ['transpiling:Dist', 'sass:Dist'],
        ['copy:App'],
        callback
    );
});

gulp.task('Prod', function (callback) {
    runSequence(
        ['clean:Prod'],
        ['sass:Prod', 'copy:tmpProd'],
        ['transpiling:Prod'],
        ['copy:ProdMain'],
        ['transpiling:Prod'],
        ['copy:Prod', 'rollup:Prod'],
        'serve:Prod',
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
        'serve:E2e',
        'angularProtractor',
        callback
    );
});
