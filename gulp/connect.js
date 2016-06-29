module.exports = function (gulp, data, util, taskName) {

    var connect = require('gulp-connect');

    gulp.task(taskName + ':Dist', function () {
        return connect.server({
            root: ['.dist/webapp', 'node_modules'],
            port: 9000
        });
    });

    gulp.task(taskName + ':Styleguide', function () {
        return connect.server({
            root: ['.styleguide'],
            port: 8000
        });
    });
};
