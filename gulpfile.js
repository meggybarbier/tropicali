var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")

var browserSync = require('browser-sync').create();

var imagemin = require("gulp-imagemin")

sass.compiler = require('node-sass');

function defaultTask(cb) {
  cb();
}

exports.default = defaultTask

gulp.task("sass", function() {
  // we want to run 'sass css/app.scss app.css ==watch'
  return gulp.src("src/css/app.scss")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(
    cleanCss({
      compatibility:'ie8'
    })
  )
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("dist"))
  .pipe(browserSync.stream())
})

gulp.task("html", function() {
  return gulp.src("src/index.html")
  .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function() {
  return gulp.src("src/fonts/*")
  .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
  return gulp.src("src/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/fonts"))
})

gulp.task("watch", function() {



    browserSync.init({
      server: {
        baseDir: "dist"
      }
    })


  gulp.watch("src/index.html", gulp.series("html")).on("change", browserSync.reload);
  gulp.watch("src/css/app.scss", gulp.series("sass"));
  gulp.watch("src/fonts/*", gulp.series("fonts"))
  gulp.watch("src/img/*", gulp.series("images"))
})

gulp.task('default', gulp.series("html", "sass", "fonts", "watch"));
