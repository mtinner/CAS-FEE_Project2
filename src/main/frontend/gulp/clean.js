module.exports = function (gulp, data, util, taskName) {

    var clean = require('gulp-clean');
    gulp.task(taskName + ':Dist', function () {
        return gulp.src(data.path.root + '.dist', {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src(data.path.root + '.styleguide', {read: false})
            .pipe(clean({force: true}));
    });
};
