module.exports = function (gulp, data, util, taskName) {

    var sass = require('gulp-sass');

    gulp.task(taskName + ':Dist', function () {
        return gulp.src(data.path.frontend + '**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.dist + 'frontend'));
    });

    gulp.task(taskName + ':E2e', function () {
        return gulp.src(data.path.frontend + '**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend'));
    });

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src(data.path.frontend + '**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.styleguide + 'styles'));
    });
};
