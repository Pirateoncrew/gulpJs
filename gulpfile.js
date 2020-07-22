const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

function copyHtml() {
  return gulp.src("src/*.html").pipe(gulp.dest("build"));
}

function sassCompile() {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
  gulp
    .watch("src/js/*.js", gulp.series(scripts))
    .on("change", browserSync.reload);
  gulp.watch("src/sass/*.scss", gulp.series(sassCompile));
  gulp
    .watch("src/*.html", gulp.series(copyHtml))
    .on("change", browserSync.reload);
}

gulp.task("default", gulp.parallel(copyHtml, sassCompile, scripts));

exports.watch = watch;
