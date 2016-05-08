var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    webserver = require('gulp-webserver');

gulp.task('hint', function() {
  return gulp.src('demos/js/*.js')
    .pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function () {
    return sass('sass/style.scss', {
      sourcemap: true,
      //compressed
      style: 'compound'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('demos/css'));
});

gulp.task('watch', function() {
  gulp.watch('demos/js/**/*', ['hint']);
  gulp.watch(['sass/**/*'], ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('demos/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'watch', 'webserver']);
