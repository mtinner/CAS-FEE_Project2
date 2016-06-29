module.exports = function (gulp, data, util, taskName) {


    gulp.task(taskName + ':StyleguideIcon', function () {
        return gulp.src([
            './src/main/webapp/resources/icon.png'
        ])
            .pipe(gulp.dest('./.styleguide'));
    });

    gulp.task(taskName + ':App', function () {
        return gulp.src([

            './src/main/webapp/**',
            '!./src/main/webapp/**/*.ts',
            '!./src/main/webapp/**/*.scss'
        ], {base: './src/main/webapp'})
            .pipe(gulp.dest('.dist/webapp'));
    });

    gulp.task(taskName + ':Scripts', function () {
        return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest('.dist/webapp/app/scripts/vendor'));
    });
};
