module.exports = function (gulp, data, util, taskName) {

    var postcss = require('gulp-postcss');

    gulp.task(taskName, function () {
        return gulp.src('./.styleguide/styles/all.css').pipe( // any files have to existing
            postcss([
                require('mdcss')({
                    theme: require('mdcss-theme-engage')({
                        logo: 'icon.png',
                        examples: {
                            css: ['./all.css']
                        }
                    }),
                    destination: './.styleguide' // to create mdcss
                })
            ])
        ).pipe(
            gulp.dest('./.styleguide') // dest des styles
        );
    });
};
