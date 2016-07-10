module.exports = function (gulp, data, util, taskName) {

    var connect = require('gulp-connect');

    gulp.task(taskName + ':Dist', function () {
        return connect.server({
            root: [data.path.root + '.dist/frontend', 'node_modules'],
            port: 9000
        });
    });

    gulp.task(taskName + ':E2e', function () {
        return connect.server({
            root: [data.path.root + '.tmp/frontend', 'node_modules'],
            port: 9001
        });
    });

    gulp.task(taskName + ':Styleguide', function () {
        return connect.server({
            root: [data.path.root + '.styleguide'],
            port: 8000
        });
    });
};
