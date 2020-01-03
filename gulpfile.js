/* jslint node: true */

'use strict'

const gulp = require('gulp')
const clean = require('gulp-clean')
const shell = require('gulp-shell')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')

const devBuild = (process.env.NODE_ENV !== 'prod')

// src = 'src/'
// build = 'build/'

// Remove build directory.

gulp.task('clean', () => {
  return gulp.src('build/*', {
    read: false
  })
    .pipe(clean())
})

// Compiling using babel.

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./build/src/'))
})

// Copy config files

gulp.task('configs', () => {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('./build/src/'))
})

// Lint all custom Javascript files.

gulp.task('eslint', gulp.series('clean', 'compile', 'configs', shell.task([
  'standard "src/**/*.js" "test/**/*.js"'
]
)))

// Build the project.

gulp.task('build', gulp.series('eslint', (done) => {
  console.log('Building the project ...')
  done()
}))

// Build the project when there are changes in Javascript files

gulp.task('develop', (done) => {
  if (devBuild) {
    return nodemon({
      script: 'build/src/server.js',
      watch: 'src/',
      ext: 'js json',
      ignore: [
        'node_modules/',
        'test/'
      ],
      tasks: ['build']
    })
      .on('restart', () => {
        done()
        console.log('restarted the build process')
      })
      .on('crash', () => {
        done()
        console.error('\nApplication has crashed!\n')
      })
  }
})

gulp.task('default', gulp.series('build', 'develop'), () => {
  return gulp.watch('src/**/*', { events: 'all' }, function (cb) {
    cb()
  })
})
