var gulp = require('gulp');
var Queue = require('streamqueue');
var concat = require('gulp-concat');
var css2js = require('gulp-css2js');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

gulp.task('compile', function () {
  return Queue({ objectMode: true },
    gulp.src('./src/index.css')
      .pipe(cssmin())
      .pipe(css2js()),
    gulp.src('./src/index.js'))
    .pipe(concat('perspector.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['compile'], function () {
  gulp.watch('src/**/*', ['compile']);
});

gulp.task('default', ['watch']);
