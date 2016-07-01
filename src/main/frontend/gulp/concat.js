module.exports = function (gulp, data, util, taskName) {

    var concat = require('gulp-concat');

    gulp.task(taskName + ':Styleguide', function () {
        return gulp.src(data.path.root + '.styleguide/styles/**/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest(data.path.root + '.styleguide/styles'));
    });
};
