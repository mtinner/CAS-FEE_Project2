module.exports = function (gulp, data, util, taskName) {

    var ts = require('gulp-typescript'),
        tsProject = ts.createProject("tsconfig.json"),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task(taskName + ':Dist', function () {
        var tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject));

        return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(data.path.dist + 'frontend'));
    });

    gulp.task(taskName + ':E2e', function () {
        var tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject));

        return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend'));
    });
};
