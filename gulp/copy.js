'use strict';

module.exports = function (gulp, data, util, taskName) {

    let stream = require('event-stream'),
        removeCode = require('gulp-remove-code'),
        replace = require('gulp-replace-task');

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
            './src/index.html',
            './src/manifest.json',
            './src/favicon.ico'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.dist));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/core-js/client/shim.min.js.map',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.dist + 'frontend/scripts/vendor'));

        var backend = gulp.src([
            data.path.backend + '**',
            '!./**/*mocha.js',
        ], {base: data.path.backend})
            .pipe(replace({
                patterns: [
                    {
                        match: 'location',
                        replacement: ''
                    }
                ]
            }))
            .pipe(gulp.dest(data.path.dist));


        return stream.merge([app, scripts, backend]);
    });


    gulp.task(taskName + ':tmpProd', function () {
        var app = gulp.src([
            data.path.frontend + '**/*.ts',
            data.path.frontend + '**/*.html',
            '!./**/*.scss',
            data.path.frontend + 'scripts/**',
            '!./src/manifest.json',
            '!./src/favicon.ico'
        ], {base: './src/frontend'})
            .pipe(removeCode({development: true}))
            .pipe(gulp.dest(data.path.tmpProd));

        return stream.merge([app]);
    });

    gulp.task(taskName + ':prodMain', function () {
        var app = gulp.src([
            data.path.frontend + '**/main.ts'
        ], {base: './src/frontend'})
            .pipe(removeCode({production: true}))
            .pipe(gulp.dest(data.path.tmpProd));

        return stream.merge([app]);
    });

    gulp.task(taskName + ':E2eApp', function () {
        var app = gulp.src([
            data.path.frontend + 'components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            data.path.frontend + 'fonts/**',
            './src/index.html',
            './src/manifest.json',
            './src/favicon.ico'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.tmpE2e));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/core-js/client/shim.min.js.map',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend/scripts/vendor'));

        var backend = gulp.src([
            data.path.backend + '**',
            '!./**/*mocha.js',
        ], {base: data.path.backend})
            .pipe(replace({
                patterns: [
                    {
                        match: 'location',
                        replacement: data.path.tmpE2e
                    }
                ]
            }))
            .pipe(gulp.dest(data.path.tmpE2e));

        return stream.merge([app, scripts,backend]);
    });
};
