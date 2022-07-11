const { src, dest, watch, lastRun } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();

// =================================
// sass task
// =================================
function sassTask() {
  return src("./src/css/*.scss", { since: lastRun(sassTask) })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

// =================================
// js task
// =================================
function js_compile() {
  return (
    src("./src/js/compiled_files/*.js")
      // .pipe(uglify())
      .pipe(concat("main.js"))
      .pipe(dest("./dist/js"))
      .pipe(browserSync.stream())
  );
}

function js_file() {
  return src("./src/js/js_files/*.js").pipe(uglify()).pipe(dest("./dist/js")).pipe(browserSync.stream());
}

function watcher() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  watch(["./dist/**/*.html"]).on("change", browserSync.reload);
  watch("./src/css/**/*.scss", sassTask);
  watch("./src/js/js_files/*.js", js_file);
  watch("./src/js/compiled_files/*.js", js_compile);
}

module.exports = {
  default: watcher
};
