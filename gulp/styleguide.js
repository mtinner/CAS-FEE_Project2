module.exports = function (gulp, data, util, taskName) {

    var postcss = require('gulp-postcss');

    gulp.task(taskName, function () {
        return gulp.src(data.path.styleguide + 'styles/all.css').pipe( // any files have to existing
            postcss([
                require('mdcss')({
                    theme: require('mdcss-theme-engage')({
                        logo: 'icon.png',
                        examples: {
                            css: ['./all.css']
                        }
                    }),
                    destination: data.path.styleguide // to create mdcss
                })
            ])
        ).pipe(
            gulp.dest(data.path.styleguide) // dest des styles
        );
    });
};
