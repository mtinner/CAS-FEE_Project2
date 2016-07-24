module.exports = function (gulp, data, util, taskName) {

    var concat = require('gulp-concat');

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src(data.path.styleguide + 'styles/**/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest(data.path.styleguide + 'styles'));
    });
};
