module.exports = function (gulp, data, util, taskName) {

    var tslint = require('gulp-tslint');

    gulp.task(taskName + ':Ts', () =>
        gulp.src(data.path.frontend + '**/*.ts')
            .pipe(tslint({
                formatter: "verbose"
            }))
            .pipe(tslint.report({
                emitError: false
            }))
    );
};
