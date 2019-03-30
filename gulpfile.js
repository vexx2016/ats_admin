/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    filter = require('gulp-filter'),
    browserSync = require('browser-sync').create(),
    BSreload      = browserSync.reload;
var svgmin      = require('gulp-svgmin'),
    svgstore    = require('gulp-svgstore'),
    cheerio     = require('gulp-cheerio'),
    includes    = require('gulp-file-include');

// Html
gulp.task('html', function() {
    gulp.src(['*.html'])
        .pipe(includes({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});



// Sass
gulp.task('sass', function() {
    gulp.src('assets/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/assets/css'))
    // .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.stream());
});



// Scripts
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(gulp.dest('build/assets/js'))
        .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        .pipe(gulp.dest('build/assets/js/min'))
        //.pipe(notify({ message: 'Scripts task complete' }))
        .pipe(browserSync.stream());
});

// favicon
gulp.task('favicon', function() {
    return gulp.src('assets/favicon/*')
        .pipe(gulp.dest('build//'))
        .pipe(browserSync.stream());
});
// Images
gulp.task('images', function() {
    return gulp.src('assets/img/**')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/assets/img/'))
        //.pipe(notify({ message: 'Images task complete' }))
        .pipe(browserSync.stream());
});
gulp.task('svg', function() {
    return gulp.src('assets/img/svg/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/assets/img/svg'))
        //.pipe(notify({ message: 'Svg task complete' }))
        .pipe(browserSync.stream());
});

//fonts
gulp.task('fonts', function() {
    return gulp.src('assets/fonts/*')
        // .pipe(filter('*.{eot,svg,ttf,woff}'))
        .pipe(gulp.dest('build/assets/fonts'))
        .pipe(browserSync.stream());
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['build/'], {read: false})
        .pipe(rimraf());
});


//svg icons
gulp.task('icons', function () {
  return gulp.src('assets/img/svg/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('symbol').each(function(){
              if ($(this).attr('id').indexOf('--clr')<0) {
                $(this).find('[fill]').removeAttr('fill');
              }
          });
          // $('[stroke]').removeAttr('stroke');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename({basename: 'icons'}))
    .pipe(gulp.dest('assets/img/icons/'))
    .pipe(browserSync.stream());
});




// Watch
gulp.task('watch', function() {
  browserSync.init({
        server: "build"
    });

    gulp.watch(['*.html'], ['html']);
    gulp.watch(['template/*'], ['html']);
    gulp.watch(['assets/scss/*'], ['sass']);
    gulp.watch(['assets/js/*.js'], ['scripts']);
    // gulp.watch(['assets/img/*/**'], ['images']);
    gulp.watch(['assets/img/**'], ['images']);
    gulp.watch(['assets/img/svg/**'], ['svg','icons','html']);
});

gulp.task('ta-dam', function() {
    return gulp.src('*')
    .pipe(notify({ message: 'Gulp complete' }))
});

// Default task
gulp.task('default', function() {
    gulp.start('fonts' ,'sass', 'html', 'scripts','favicon','icons', 'images', 'svg','watch')
});
