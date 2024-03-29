// ==========================================
// TABLE OF CONTENT
// ==========================================
// 1. Dependencies
// 2. Config
// 3. Functions
// 4. Gulp tasks

// ==========================================
// 1. DEPENDENCIES
// ==========================================
// gulp-dev-dependencies
// const gulp = require('gulp');
const { dest, parallel, series, src, watch } = require("gulp");
// check package.json for gulp plugins
const gulpLoadPlugins = require("gulp-load-plugins");
const sass = require("gulp-sass")(require("sass"));

// dev-dependencies
const browserSync = require("browser-sync").create();
const del = require("del");
const { rollup } = require("rollup");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");
const postcssAutoprefixer = require("autoprefixer");
const postcssCssnano = require("cssnano");

const $ = gulpLoadPlugins();

// ==========================================
// 2. CONFIG
// ==========================================
const config = {
  // COMMAND ARGUMENTS
  cmd: {
    // check if "gulp --production"
    // http://stackoverflow.com/questions/28538918/pass-parameter-to-gulp-task#answer-32937333
    production: process.argv.indexOf("--production") > -1 || false,
  },
  // FOLDERS
  src: {
    folder: "src/",
    fonts: "src/fonts/**/*.*",
    img: "src/img/**/**/*.{jpg,png,svg,gif}",
    js: {
      folder: "src/js/",
      files: "src/js/**/*.js",
      main: "src/js/main.js",
      library: "src/js/lib/",
      vendor: [
        // 'node_modules/justified-layout/dist/justified-layout.min.js',
      ],
      vendorFiles: "src/js/vendor/**/*.js",
    },
    scss: "src/scss/**/*.scss",
  },
  dist: {
    folder: "assets/",
    css: "assets/css/",
    fonts: "assets/fonts/",
    img: "assets/img/",
    js: "assets/js/",
    jsVendor: "assets/js/vendor/",
  },
  // plugin settings
  // SERVER
  browserSync: {
    proxy: "localhost/tomas-skala/",
    // files: '**/*.html',
    files: ["**/*.md", "**/*.twig", "**/*.yaml"],
    ghostMode: {
      // click: true,
      // location: true,
      // forms: true,
      // scroll: true,
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: "info",
    notify: false,
    reloadDelay: 100,
    // startPath: "/cviceni/"
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
    ui: false,
  },
  // POSTCSS
  postcss: {
    plugins: [postcssAutoprefixer(), postcssCssnano()],
  },
  // ROLLUP
  rollup: {
    main: {
      bundle: {
        input: "src/js/main.js",
        plugins: [
          commonjs(),
          nodeResolve(),
          babel({
            babelHelpers: "bundled",
          }),
          terser(),
        ],
      },
      output: {
        file: "assets/js/main.build.js",
        format: "iife",
        name: "tomasSkala",
        sourcemap: true,
      },
    },
    admin: {
      bundle: {
        input: "src/js/admin-custom.js",
        plugins: [
          commonjs(),
          nodeResolve(),
          babel({
            babelHelpers: "bundled",
          }),
          terser(),
        ],
      },
      output: {
        file: "assets/js/admin-custom.build.js",
        format: "iife",
        name: "tomasSkala",
        sourcemap: true,
      },
    },
  },
  // SASS
  sass: {
    errLogToConsole: true,
    outputStyle: "compressed",
  },
};

// ==========================================
// 3. FUNCTIONS
// ==========================================
function serve(done) {
  if (browserSync.active) {
    return;
  }
  browserSync.init(config.browserSync);
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

// ==========================================
// 4. TASKS
// ==========================================
// CLEAN
function clean() {
  return del(config.dist.folder);
}

// SASS
function css() {
  return src(config.src.scss, { sourcemaps: true })
    .pipe(sass(config.sass).on("error", sass.logError))
    .pipe($.if(config.cmd.production, $.postcss(config.postcss.plugins)))
    .pipe(dest(config.dist.css, { sourcemaps: "./maps" }))
    .pipe(browserSync.stream({ match: "**/*.css" }));
}

// JAVASCRIPT
// JS:VENDOR
function jsVendor() {
  return src([config.src.js.vendorFiles, ...config.src.js.vendor]).pipe(
    dest(config.dist.js)
  );
}

// main
async function jsMain() {
  const bundle = await rollup(config.rollup.main.bundle);
  bundle.write(config.rollup.main.output);
}

// admin
async function jsAdmin() {
  const bundle = await rollup(config.rollup.admin.bundle);
  bundle.write(config.rollup.admin.output);
}

// IMAGES
function images() {
  return src(config.src.img)
    .pipe($.if(config.cmd.production, $.imagemin(config.images)))
    .pipe(dest(config.dist.img));
}

// FONTS
function fonts() {
  return src(config.src.fonts).pipe(dest(config.dist.fonts));
}

// WATCH
function watcher(done) {
  // css
  watch(config.src.scss, series(css));
  // js:app
  watch(
    [config.src.js.files, `!${config.src.js.vendor}`],
    series(parallel(jsMain, jsAdmin), reload)
  );
  // js:vendor
  watch(config.src.js.vendor, series(jsVendor, reload));
  // images
  watch(config.src.img, series(images, reload));
  // images
  // watch([
  //   config.src.images.files,
  //   `!${config.src.images.photos}`,
  //   `!${config.src.images.favicon}`,
  // ], series(images, reload));
  // watch(config.src.images.photos, series(imagesPhotos, reload));
  // // fonts
  watch(config.src.fonts, series(fonts, reload));

  done();
}

// GULP
exports.default = series(
  clean,
  parallel(
    css,
    jsMain,
    jsAdmin,
    jsVendor,
    images,
    // imageFavicon,
    // imagesPhotos,
    fonts
  ),
  serve,
  watcher
);

exports.build = series(
  clean,
  parallel(
    css,
    jsMain,
    jsAdmin,
    jsVendor,
    images,
    // imageFavicon,
    // imagesPhotos,
    fonts
  )
);
