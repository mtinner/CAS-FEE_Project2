module.exports = function (gulp, data, util, taskName) {

    var runSequence = require('run-sequence'),
        server = require('gulp-express');

    gulp.task(taskName + ':All', function () {
        gulp.watch([
            data.path.frontend + '**/*.html',
            data.path.frontend + '**/*.scss',
            data.path.frontend + '**/*.ts'
        ], function(event) {
            runSequence('Build', reload(event));
        });
    });

    function reload(event) {
        return function () {
            console.log('Autoreload');
            server.notify(event);
        }
    }
};
