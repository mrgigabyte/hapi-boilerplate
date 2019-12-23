/* jslint node: true */

'use strict'

const gulp = require('gulp')
const clean = require('gulp-clean')
const shell = require('gulp-shell')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')

// devBuild = (process.env.NODE_ENV !== 'prod');

// src = 'src/'
// build = 'build/'

/**
 * Remove build directory.
 */

gulp.task('clean', () => {
  return gulp.src('build/*', {
    read: false
  })
    .pipe(clean())
});

/**
 * Compiling using babel.
 */

gulp.task('compile', () => {
  return gulp.src('src/**/*')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./build/src/'))
});

/**
 * Copy config files
 */

gulp.task('configs', () => {
  return gulp.src('src/config/*.json')
    .pipe(gulp.dest('./build/src/config'))
});

/**
 * Lint all custom Javascript files.
 */

gulp.task('eslint', gulp.series('clean','compile','configs', shell.task([
  'standard "src/**/*.js" "test/**/*.js"'
]
)))

/**
 * Watch for changes in Javascript
 */

// gulp.task('watch', shell.task([
//   'npm run tsc-watch'
// ]))

/**
 * Build the project.
 */

gulp.task('build', gulp.series('eslint', (done) => {
  console.log('Building the project ...')
  done()
}))

/**
 * Build the project when there are changes in Javascript files
 */

gulp.task('develop', function () {
  var stream = nodemon({
    script: 'build/src/index.js',
    ext: 'es',
    tasks: ['build']
  })
  stream
    .on('restart', function () {
      console.log('restarted the build process')
    })
    .on('crash', function () {
      console.error('\nApplication has crashed!\n')
    })
})

gulp.task('default', gulp.parallel('build'), () => {
  watch('src/**/*.js', { events: 'all' }, function(cb) {
    // body omitted
    cb();
  });
})
