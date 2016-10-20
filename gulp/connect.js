module.exports = function (gulp, data, util, taskName) {

    var connect = require('gulp-connect');

    gulp.task(taskName + ':Styleguide', function () {
        return connect.server({
            root: [data.path.styleguide],
            port: 8000
        });
    });

    gulp.task(taskName + ':Spec', function () {
        return connect.server({
            root: [data.path.spec, './'],
            port: 9002
        });
    });
};
