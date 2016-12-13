module.exports = function (gulp, data, util, taskName) {

    var clean = require('gulp-clean');
    gulp.task(taskName + ':Dist', function () {
        return gulp.src(data.path.dist, {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task(taskName + ':Prod', function () {
        return gulp.src([data.path.tmpProd, data.path.aot, data.path.prod], {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task(taskName + ':E2e', function () {
        return gulp.src(data.path.tmpE2e, {read: false})
            .pipe(clean({force: true}));
    });
};
