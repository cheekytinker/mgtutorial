var gulp = require("gulp");
var sourceMaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("dist"));
});