module.exports = function (gulp, data, util, taskName) {

    var gulp = require('gulp'),
        watch = require('gulp-watch'),
        print = require('gulp-print'),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload');

    gulp.task(taskName + ':Transpiling', function () {
        return watch(data.path.frontend + '**/*.ts', function () {
            runSequence('transpiling:Dist');
        }).pipe(_printChanges());
    });

    gulp.task(taskName + ':Sass', function () {
        return watch(data.path.frontend + '**/*.scss', function (file) {
            runSequence('sass:Dist');
        }).pipe(_printChanges());
    });

    gulp.task(taskName + ':Listen', function () {
        livereload.listen();
    });

    function _printChanges() {
        return print(function (filepath) {
            return 'Changed: ' + filepath;
        });
    }
};