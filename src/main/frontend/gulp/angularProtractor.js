module.exports = function (gulp, data, util, taskName) {
    var gulp = require('gulp');
    var angularProtractor = require('gulp-angular-protractor');

    gulp.task(taskName, function () {

        gulp.src([data.path.e2e + 'suites/*.js'])
            .pipe(angularProtractor({
                'configFile': data.path.e2e + 'protractor.config.js'
            }))
            .on('error', function (e) {
                throw e
            })
    });
};

