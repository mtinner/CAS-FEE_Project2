module.exports = function (gulp, data, util, taskName) {

    var sass = require('gulp-sass');

    gulp.task(taskName + ':Dist', function () {
        return gulp.src('./src/main/webapp/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('.dist/webapp'));
    });

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src('./src/main/webapp/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('.styleguide/styles'));
    });
};
