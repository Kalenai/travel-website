var gulp         = require('gulp'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    imagemin     = require('gulp-imagemin'),
    browserSync  = require('browser-sync').create();

gulp.task('css', function() {
    gulp.src('src/assets/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
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

gulp.task('default', ['css', 'images', 'html'], function() {
    browserSync.init({
        server: "./build"
    });

    gulp.watch('src/assets/styles/*.scss', ['css']);
    gulp.watch('src/assets/images/*', ['images']);
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});