module.exports = function (gulp, data, util, taskName) {

    var connect = require('gulp-connect');

    gulp.task(taskName + ':E2e', function () {
        return connect.server({
            root: [data.path.tmpE2e, 'node_modules'],
            port: 9001
        });
    });

    gulp.task(taskName + ':Styleguide', function () {
        return connect.server({
            root: [data.path.styleguide],
            port: 8000
        });
    });
};
