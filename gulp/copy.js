module.exports = function (gulp, data, util, taskName) {


    gulp.task(taskName + ':StyleguideIcon', function () {
        return gulp.src([
            data.path.frontend + 'images/icon.png'
        ])
            .pipe(gulp.dest(data.path.styleguide));
    });

    gulp.task(taskName + ':App', function () {
        var app = gulp.src([
            data.path.frontend + 'components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            './src/index.html'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.dist));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.dist + 'frontend/scripts/vendor'));


        return Promise.all([app, scripts])
    });

    gulp.task(taskName + ':E2eApp', function () {
        return gulp.src([
            data.path.frontend + 'components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            './src/index.html'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.root + '.tmp/frontend'));
    });

    gulp.task(taskName + ':E2eScripts', function () {
        return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.root + '.tmp/frontend/frontend/scripts/vendor'));
    });
};
