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
const gulp = require('gulp');
// check package.json for gulp plugins
const gulpLoadPlugins = require('gulp-load-plugins');

// dev-dependencies
const browserSync = require('browser-sync').create();
const del = require('del');
// const fs = require('fs');
const rollup = require('rollup').rollup;
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const rollupUglify = require('rollup-plugin-uglify');
const runSequence = require('run-sequence');
// const source = require('vinyl-source-stream');

const $ = gulpLoadPlugins();


// ==========================================
// 2. CONFIG
// ==========================================
const config = {
  // BUILD TASKS
  tasks: ['css', 'js:vendor', 'js', 'images', 'fonts'],
  // COMMAND ARGUMENTS
  cmd: {
    // check if "gulp --production"
    // http://stackoverflow.com/questions/28538918/pass-parameter-to-gulp-task#answer-32937333
    production: process.argv.indexOf('--production') > -1 || false,
  },
  // FOLDERS
  src: {
    folder: 'src/',
    fonts: 'src/fonts/**/*.*',
    img: 'src/img/**/**/*.{jpg,png,svg,gif}',
    js: {
      folder: 'src/js/',
      files: 'src/js/**/*.js',
      main: 'src/js/main.js',
      library: 'src/js/lib/',
      vendor: [
        'src/js/vendor/lory.min.js',
        'src/js/vendor/lory.min.js.map',
      ],
      vendorFiles: 'src/js/vendor/**/*.js',
    },
    scss: 'src/scss/**/*.scss',
  },
  dist: {
    folder: 'assets/',
    css: 'assets/css/',
    fonts: 'assets/fonts/',
    img: 'assets/img/',
    js: 'assets/js/',
    jsVendor: 'assets/js/vendor/',
  },
  // plugin settings
  // AUTORPEFIXER
  autoprefixer: {
    cascade: true,
    precision: 10,
  },
  // SERVER
  browserSync: {
    proxy: 'localhost:8888/grav-admin/',
    files: '../**/**/*.*',
    ghostMode: {
      click: true,
      // location: true,
      forms: true,
      scroll: true,
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    notify: false,
    reloadDelay: 100,
    // startPath: "/cviceni/"
  },
  // ROLLUP
  rollup: {
    main: {
      bundle: {
        input: 'src/js/main.js',
        plugins: [
          rollupNodeResolve({
            browser: true,
            jsnext: true,
            main: true,
          }),
          rollupBabel({
            exclude: 'node_modules/**',
          }),
          rollupUglify(),
        ],
      },
      output: {
        file: 'assets/js/main.build.js',
        format: 'iife',
        name: 'main',
        sourcemap: true,
      },
    },
  },
  // SASS
  sass: {
    errLogToConsole: true,
    outputStyle: 'expanded',
  },
};


// ==========================================
// 3. FUNCTIONS
// ==========================================
function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  browserSync.init(config.browserSync);
}

function reload() {
  return browserSync.reload();
}


// ==========================================
// 4. TASKS
// ==========================================
// CLEAN
gulp.task('clean', done =>
  del(config.dist.folder, done));


// SASS
gulp.task('css', () =>
  gulp.src(config.src.scss)
    .pipe($.if(!config.cmd.production, $.sourcemaps.init()))
    .pipe($.sass(config.sass).on('error', $.sass.logError))
    .pipe($.if(config.cmd.production, $.autoprefixer(config.autoprefixer)))
    .pipe($.if(config.cmd.production, $.cleanCss()))
    .pipe($.if(!config.cmd.production, $.sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.dist.css))
    .pipe(browserSync.stream({ match: '**/*.css' })));


// JAVASCRIPT
// JS:VENDOR
gulp.task('js:vendor', () => {
  gulp.src(config.src.js.vendorFiles)
    .pipe(gulp.dest(config.dist.js));
});
gulp.task('js:vendor-watch', ['js:vendor'], reload);

// main
gulp.task('js:main', () =>
  rollup(config.rollup.main.bundle)
    .then((bundle) => {
      bundle.write(config.rollup.main.output);
    }));
gulp.task('js:main-watch', ['js:main'], reload);

gulp.task('js', ['js:vendor', 'js:main']);
gulp.task('js-watch', ['js'], reload);


// IMAGES
gulp.task('images', () =>
  gulp.src(config.src.img)
    .pipe($.if(config.cmd.production, $.imagemin(config.images)))
    .pipe(gulp.dest(config.dist.img)));
gulp.task('images-watch', ['images'], reload);


// FONTS
gulp.task('fonts', () =>
  gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.dist.fonts)));
gulp.task('fonts-watch', ['fonts'], reload);


// SERVER
gulp.task('serve', () =>
  startBrowserSync());

// WATCH
gulp.task('watch', ['serve'], () => {
  // css
  gulp.watch(config.src.scss, ['css']);
  // js:app
  gulp.watch([config.src.js.files, `!${config.src.js.vendorFiles}`], ['js-watch']);
  // js:vendor
  gulp.watch(config.src.js.vendorFiles, ['js:vendor-watch']);
  // images
  gulp.watch(config.src.img, ['images-watch']);
  // fonts
  gulp.watch(config.src.fonts, ['fonts-watch']);
});

// GULP
gulp.task('default', ['clean'], () => {

  runSequence(config.tasks, () => {
    gulp.start('watch');
  });

});
