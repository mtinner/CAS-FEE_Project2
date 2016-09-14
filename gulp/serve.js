module.exports = function (gulp, data, util, taskName) {

    var server = require('gulp-express');

    gulp.task(taskName + ':Dist', function () {
        return server.run([data.path.dist + 'server.js'], {}, false);
    });
};