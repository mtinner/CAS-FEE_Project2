module.exports = function (gulp, data, util, taskName) {


    gulp.task(taskName + ':StyleguideIcon', function () {
        return gulp.src([
            'app/images/icon.png'
        ])
            .pipe(gulp.dest(data.path.root + '.styleguide'));
    });

    gulp.task(taskName + ':App', function () {
        return gulp.src([
            './app/components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            './app/images/**',
            './app/scripts/**',
            './*index.html'
        ], {base: './'})
            .pipe(gulp.dest(data.path.root + '.dist/frontend'));
    });

    gulp.task(taskName + ':E2eApp', function () {
        return gulp.src([
            './app/components/**',
            '!./**/*.ts',
            '!./**/*.scss',
            './app/images/**',
            './app/scripts/**',
            './*index.html'
        ], {base: './'})
            .pipe(gulp.dest(data.path.root + '.tmp/frontend'));
    });

    gulp.task(taskName + ':Scripts', function () {
        return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.root + '.dist/frontend/app/scripts/vendor'));
    });
    
    gulp.task(taskName + ':E2eScripts', function () {
        return gulp.src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/zone.js/dist/zone.js'
        ])
            .pipe(gulp.dest(data.path.root + '.tmp/frontend/app/scripts/vendor'));
    });
};
