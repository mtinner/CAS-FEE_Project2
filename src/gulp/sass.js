module.exports = function (gulp, data, util, taskName) {

    var sass = require('gulp-sass');

    gulp.task(taskName + ':Dist', function () {
        return gulp.src('./frontend/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.root + '.dist/frontend'));
    });

    gulp.task(taskName + ':E2e', function () {
        return gulp.src('./frontend/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.root + '.tmp/frontend'));
    });

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src('./**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.root + '.styleguide/styles'));
    });
};
