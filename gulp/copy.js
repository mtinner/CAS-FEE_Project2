module.exports = function (gulp, data, util, taskName) {

    let stream = require('event-stream');

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
            data.path.frontend + 'fonts/**',
            './src/index.html'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.dist));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.dist + 'frontend/scripts/vendor'));

        var backend = gulp.src([
            data.path.backend + '**'
        ], {base: data.path.backend})
            .pipe(gulp.dest(data.path.dist));

        return stream.merge([app, scripts, backend]);
    });

    gulp.task(taskName + ':E2eApp', function () {
        var app = gulp.src([
            data.path.frontend + 'components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            './src/index.html'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.tmpE2e));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend/scripts/vendor'));

        return stream.merge([app, scripts]);
    });
};
