module.exports = function (gulp, data, util, taskName) {
    
    var clean = require('gulp-clean');
    
    gulp.task(taskName + ':Dist', function () {
        return gulp.src('.dist', {read: false})
            .pipe(clean());
    });

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src('.styleguide', {read: false})
            .pipe(clean());
    });
};
