var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer')
var path = require('path');
var pkg = require('./package.json');

var IMG_DIR_NAME = 'img';
var CSS_DIR_NAME = 'css';
var JS_DIR_NAME = 'js';

var proj_config = {
    img: 'asset/img/**/*',
    less: ['asset/less/global/global.less', 'asset/less/page/**/*.less'],
    font: [],
    js: [],
    page: 'page/**/*',
    dist: 'dist'
};

function image_task(conf) {
  return gulp
    .src(conf.img)
    // .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(path.join(conf.dist, IMG_DIR_NAME)));
}

function font_task(conf) {
  return gulp
    .src(conf.font)
    .pipe(gulp.dest(path.join(conf.dist, CSS_DIR_NAME)));
}

function less_task(conf) {
  return gulp
    .src(conf.less)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'ie 9', 'iOS 4', 'Android 4'],
      cascade: false
    }))
    .pipe(gulp.dest(path.join(conf.dist, CSS_DIR_NAME)));
}

// function js_task(conf) {
//   return gulp
//     .src(conf.js)
//     // .pipe(sourcemaps.init())
//     .pipe(uglify())
//     // .pipe(sourcemaps.write())
//     .pipe(gulp.dest(path.join(conf.dist, JS_DIR_NAME)));
// }

function page_task(conf) {
  return gulp
    .src(conf.page)
    .pipe(gulp.dest(conf.dist));
}

gulp.task('wx-image', function() {
  return image_task(proj_config);
});
gulp.task('wx-less', function () {
  return less_task(proj_config);
});
gulp.task('wx-font', function () {
  return font_task(proj_config);
});
// gulp.task('wx-js', function () {
//   return js_task(proj_config);
// });
gulp.task('wx-page', function () {
  return page_task(proj_config);
});

gulp.task('default', ['wx-image', 'wx-less', 'wx-page', 'wx-font']);

gulp.task('watch', ['default'], function() {
  gulp.watch([proj_config.img], ['wx-image']);
  gulp.watch([proj_config.less], ['wx-less']);
  // gulp.watch([proj_config.js, 'asset/js/**/*'], ['wx-js']);
  gulp.watch([proj_config.page], ['wx-page']);
});

// MODULES="zepto event ajax form touch fx_methods fx detect" npm run-script dist
