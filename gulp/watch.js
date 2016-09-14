module.exports = function (gulp, data, util, taskName) {

    var gulp = require('gulp'),
        watch = require('gulp-watch'),
        print = require('gulp-print'),
        runSequence = require('run-sequence');

    gulp.task(taskName + ':Transpiling', function () {
        return watch(data.path.frontend + '**/*.ts', function () {
            runSequence('transpiling:Dist');
        }).pipe(print());
    });
};