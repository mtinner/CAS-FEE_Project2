module.exports = function (gulp, data, util, taskName) {
    var angularProtractor = require('gulp-angular-protractor'),
        server = require('gulp-express');

    gulp.task(taskName, function () {

        gulp.src([data.path.e2e + 'suites/*.js'])
            .pipe(angularProtractor({
                'configFile': data.path.e2e + 'protractor.config.js'
            }))
            .on('end', function () {
                server.stop();
            })
            .on('error', function (e) {
                console.log(e);
                server.stop();
            })
    });
};

