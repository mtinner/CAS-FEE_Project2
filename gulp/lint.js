module.exports = function (gulp, data, util, taskName) {

    var tslint = require('gulp-tslint'),
        eslint = require('gulp-eslint');

    gulp.task(taskName + ':Ts', () =>
        gulp.src(data.path.frontend + '**/*.ts')
            .pipe(tslint({
                formatter: 'verbose'
            }))
            .pipe(tslint.report({
                emitError: false
            }))
    );

    gulp.task(taskName + ':Es', () =>
        gulp.src(data.path.backend + '**/*.js')
            .pipe(eslint())
            .pipe(eslint.format())
    );
};
