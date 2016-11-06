module.exports = function (gulp, data, util, taskName) {

    var server = require('gulp-express');

    gulp.task(taskName + ':Dist', function () {
        return server.run([data.path.dist + 'server.js'], {}, false);
    });

    gulp.task(taskName + ':E2e', function () {
        return server.run([data.path.tmpE2e + 'server.js'], {}, false);
    });

    gulp.task(taskName + ':Prod', function () {
        return server.run([data.path.prod + 'server.js'], {}, false);
    });
};
