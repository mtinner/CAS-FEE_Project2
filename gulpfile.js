var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject("tsconfig.json"),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');


gulp.task('default', function (callback) {
  runSequence(
      'cleanDist',
      ['transpiling','sass'],
      ['copyApp', 'copyScripts', 'copyNodeModules'],
      'connectDist',
      callback
  );
});

gulp.task('cleanDist', function () {
  return gulp.src('.dist', {read: false})
      .pipe(clean());
});

gulp.task('transpiling', function () {
  var tsResult= tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject));

  return tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.dist/webapp/app'));
});

gulp.task('sass', function () {
  return gulp.src('./src/main/webapp/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('.dist/webapp'));
});

gulp.task('connectDist', function () {
  return connect.server({
    root: ['.dist/webapp','node_modules'],
    port: 9000
  });
});

gulp.task('copyApp', function () {
  return gulp.src([
        './src/main/webapp/**',
        '!./src/main/webapp/**/*.ts',
        '!./src/main/webapp/**/*.scss'
      ], {base: './src/main/webapp'})
      .pipe(gulp.dest('.dist/webapp'));
});

gulp.task('copyScripts', function () {
  return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/zone.js/dist/zone.js'
      ])
      .pipe(gulp.dest('.dist/webapp/app/scripts/vendor'));
});

gulp.task('copyNodeModules', function () {
  return gulp.src([
        'node_modules/@angular/*/bundles/*.js',
        'node_modules/rxjs/**',
        'node_modules/angular2-in-memory-web-api/**'
      ], {base: './node_modules/*'})
      .pipe(gulp.dest('.dist/webapp/app/scripts/vendor/*'));
});

