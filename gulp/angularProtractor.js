module.exports = function (gulp, data, util, taskName) {
    var angularProtractor = require('gulp-angular-protractor'),
        connect = require('gulp-connect');

    gulp.task(taskName, function () {

        gulp.src([data.path.e2e + 'suites/*.js'])
            .pipe(angularProtractor({
                'configFile': data.path.e2e + 'protractor.config.js'
            }))
            .on('end', function () {
                connect.serverClose();
            })
            .on('error', function (e) {
                throw e
            })
    });
};

