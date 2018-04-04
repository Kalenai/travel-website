var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    gulp.src('src/assets/styles/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    gulp.src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['styles', 'images', 'html'], function() {
    browserSync.init({
        server: "./build"
    });

    gulp.watch('src/assets/styles/*.css', ['styles']);
    gulp.watch('src/assets/images/*', ['images']);
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});