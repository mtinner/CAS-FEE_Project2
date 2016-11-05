module.exports = function (gulp, data, util, taskName) {

    var ts = require('gulp-typescript'),
        tsProject = ts.createProject("tsconfig.json"),
        sourcemaps = require('gulp-sourcemaps'),
        livereload = require('gulp-livereload'),
        exec = require('child_process').exec;

    gulp.task(taskName + ':Prod', function (cb) {
        exec('"node_modules/.bin/ngc" -p "tsconfig-aot.json"', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });

    gulp.task(taskName + ':Dist', function () {
        var tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(tsProject());

        return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(data.path.dist + 'frontend'))
            .pipe(livereload());
    });

    gulp.task(taskName + ':Spec', function () {
        var tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(tsProject());

        return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(data.path.spec + 'frontend'));
    });

    gulp.task(taskName + ':E2e', function () {
        var tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(tsProject());

        return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend'));
    });
};
