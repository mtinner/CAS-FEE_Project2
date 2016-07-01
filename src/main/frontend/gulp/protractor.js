module.exports = function (gulp, data, util, taskName) {
    var protractor = require("gulp-protractor").protractor;

    gulp.task(taskName, function () {

        return gulp.src([data.path.e2e + "suites/*.js"])
            .pipe(protractor({
                configFile: data.path.e2e + "protractor.config.js"
            }))
            .on('error', function (e) {
                throw e
            })
    });
};
