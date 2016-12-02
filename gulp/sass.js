module.exports = function (gulp, data, util, taskName) {

    var sass = require('gulp-sass'),
        stream = require('event-stream');

    gulp.task(taskName + ':Dist', function () {
        return gulp.src(data.path.frontend + '**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.dist + 'frontend'));
    });

    gulp.task(taskName + ':Prod', function () {
        var inStyle = gulp.src([data.path.frontend + '**/*.scss', '!all.scss'])
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.tmpProd));

        var globalStyle = gulp.src(data.path.frontend + '**/all.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(data.path.prod));

        return stream.merge([inStyle, globalStyle]);

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
