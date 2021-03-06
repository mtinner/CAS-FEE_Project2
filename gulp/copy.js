'use strict';

module.exports = function(gulp, data, util, taskName) {

    let stream = require('event-stream'),
        removeCode = require('gulp-remove-code'),
        replace = require('gulp-replace-task'),
        uglify = require('gulp-uglify'),
        strip = require('gulp-strip-comments');

    gulp.task(taskName + ':App', function() {
        var app = gulp.src([
            data.path.frontend + 'app/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            data.path.frontend + 'fonts/**',
            './src/favicon.ico'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.dist));

        // icons will not be displayed if index.html in app task (problem removeCode task)
        var index = gulp.src([
            './src/index.html',
            './src/manifest.json',
        ], {base: './src'})
            .pipe(removeCode({development: true}))
            .pipe(strip())
            .pipe(gulp.dest(data.path.dist));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/core-js/client/shim.min.js.map',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.dist + 'frontend/scripts/vendor'));

        var backend = gulp.src([
            data.path.backend + '**'
        ], {base: data.path.backend})
            .pipe(replace({
                patterns: [
                    {
                        match: 'location',
                        replacement: ''
                    }
                ]
            }))
            .pipe(removeCode({development: true}))
            .pipe(gulp.dest(data.path.dist));

        return stream.merge([app, index, scripts, backend]);
    });


    gulp.task(taskName + ':tmpProd', function() {
        var app = gulp.src([
            data.path.frontend + '**/*.ts',
            data.path.frontend + '**/*.html',
            '!./**/*.scss',
            '!./**/main.ts',
            data.path.frontend + 'scripts/**',
            '!./src/manifest.json',
            '!./src/favicon.ico'
        ], {base: './src/frontend'})
            .pipe(gulp.dest(data.path.tmpProd));

        var mainTs = gulp.src([
            data.path.frontend + '**/main.ts',
        ], {base: './src/frontend'})
            .pipe(removeCode({development: true}))
            .pipe(gulp.dest(data.path.tmpProd));

        return stream.merge([app, mainTs]);
    });

    gulp.task(taskName + ':ProdMain', function() {
        var app = gulp.src([
            data.path.frontend + '**/main.ts'
        ], {base: './src/frontend'})
            .pipe(removeCode({production: true}))
            .pipe(gulp.dest(data.path.tmpProd));

        return stream.merge([app]);
    });

    gulp.task(taskName + ':Prod', function() {
        var index = gulp.src([
            './src/index.html',
            './src/**/manifest.json'
        ], {base: './src'})
            .pipe(removeCode({production: true}))
            .pipe(strip())
            .pipe(gulp.dest(data.path.prod));

        var favicon = gulp.src([
            './src/favicon.ico',
        ], {base: './src'})
            .pipe(gulp.dest(data.path.prod));

        var imagFonts = gulp.src([
            './src/**/images/**/*',
            data.path.frontend + 'fonts/**'
        ], {base: './src/frontend'})
            .pipe(gulp.dest(data.path.prod));

        var scripts = gulp.src([
            './node_modules/zone.js/dist/zone.min.js',
            './node_modules/reflect-metadata/Reflect.js'
        ])
            .pipe(uglify())
            .pipe(gulp.dest(data.path.prod + 'scripts'));

        var backend = gulp.src([
            data.path.backend + '**'
        ], {base: data.path.backend})
            .pipe(replace({
                patterns: [
                    {
                        match: 'location',
                        replacement: ''
                    }
                ]
            }))
            .pipe(removeCode({production: true}))
            .pipe(gulp.dest(data.path.prod));

        return stream.merge([index, favicon, imagFonts, scripts, backend]);
    });

    gulp.task(taskName + ':E2eApp', function() {
        var app = gulp.src([
            data.path.frontend + 'app/**',
            '!./**/*.ts',
            '!./**/*.scss',
            data.path.frontend + 'images/**',
            data.path.frontend + 'scripts/**',
            data.path.frontend + 'fonts/**',
            './src/favicon.ico'
        ], {base: './src'})
            .pipe(gulp.dest(data.path.tmpE2e));

        // icons will not be displayed if index.html in app task (problem removeCode task)
        var index = gulp.src([
            './src/index.html',
            './src/manifest.json',
        ], {base: './src'})
            .pipe(removeCode({development: true}))
            .pipe(strip())
            .pipe(gulp.dest(data.path.tmpE2e));

        var scripts = gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/core-js/client/shim.min.js.map',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.tmpE2e + 'frontend/scripts/vendor'));

        var backend = gulp.src([
            data.path.backend + '**'
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

        return stream.merge([app, index, scripts, backend]);
    });
};
