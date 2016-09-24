module.exports = function (gulp, data, util, taskName) {

    var watch = require('gulp-watch'),
        print = require('gulp-print'),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload');

    gulp.task(taskName + ':Listen', function () {
        livereload.listen();
    });

    gulp.task(taskName + ':All', function () {
        return watch(data.path.frontend + '**/*', function () {
            runSequence(
                'lint:Es',
                'lint:Ts',
                'clean:Dist',
                ['transpiling:Dist', 'sass:Dist'],
                'copy:App'
            );
        }).pipe(_printChanges());
    });

    gulp.task(taskName + ':Transpiling', function () {
        return watch(data.path.frontend + '**/*.ts', function () {
            runSequence('transpiling:Dist');
        }).pipe(_printChanges());
    });

    gulp.task(taskName + ':Sass', function () {
        return watch(data.path.frontend + '**/*.scss', function () {
            runSequence('sass:Dist');
        }).pipe(_printChanges());
    });

    gulp.task(taskName + ':Html', function () {
        return watch(data.path.frontend + '**/*.html')
            .pipe(_printChanges())
            .pipe(gulp.dest(data.path.dist + 'frontend/'))
            .pipe(livereload());
    });

    function _printChanges() {
        return print(function (filepath) {
            return 'Changed: ' + filepath;
        });
    }
};