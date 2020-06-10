/* jslint node: true */

'use strict'

const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const standard = require('gulp-standard')

const devBuild = (process.env.NODE_ENV !== 'prod')

const env = process.env.NODE_ENV || 'dev'

const config = {
  dev: {
    tasks: ['build', 'develop'],
    startPoint: 'build/src/index.js',
    config: {
      src: 'src/**/*.json',
      dest: './build/src/'
    },
    default: {
      src: 'src/**/*.js'
    },
    clean: {
      src: 'build/*'
    },
    compile: {
      src: 'src/**/*.js',
      dest: './build/src/'
    },
    eslint: {
      files: '"src/**/*.js" "test/**/*.js"'
    }

  },
  prod: {
    tasks: ['build', 'develop'],
    src: 'src/**/*.js',
    dest: './build/src/'
  },
  test: {
    tasks: ['build', 'develop'],
    config: {
      src: 'src/**/*.json',
      dest: './build/src/'
    },
    default: {
      src: 'src/**/*.js'
    },
    clean: {
      src: 'build/*'
    },
    compile: {
      src: 'src/**/*.js',
      dest: './build/src/'
    },
    eslint: {
      files: '"src/**/*.js" "test/**/*.js"'
    }
  }
}

// function watch () {
//   const watcher = gulp.watch(config[env].default.src, { events: 'all' }, function (cb) {
//     cb()
//   })
//   watcher.on('change', async function (path) {
//     console.log(`File ${path} was changed`)
//     const buildPath = `build/${path}`
//     const fpath = buildPath.substring(0, buildPath.lastIndexOf('/'))
//     return gulp
//       .src(`${path}`, { read: false })
//       .pipe(shell([`standard ${path}`]))
//       .pipe(gulp.src(`build/${path}`, { read: false })
//         .pipe(clean()))
//       .pipe(gulp.src(`${path}`))
//       .pipe(babel({ presets: ['@babel/preset-env'] }))
//       .pipe(gulp.dest(fpath))
//   })
//   watcher.on('error', () => {
//     console.error('\nApplication has crashed\n')
//   })
//   return watcher
// }

// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         targets: {
//           esmodules: true,
//         },
//       },
//     ],
//   ],
// }

function cleaning () {
  return gulp.src(config[env].clean.src, {
    read: false
  }).pipe(clean())
}

function compileJs () {
  return gulp.src(config[env].compile.src)
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ]
    }))
    .pipe(gulp.dest(config[env].compile.dest))
}

function copyConf () {
  return gulp.src(config[env].config.src)
    .pipe(gulp.dest(config[env].config.dest))
}

function eslint () {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
}

function develop (cb) {
  if (devBuild) {
    cb()
    return nodemon({
      script: config[env].startPoint,
      watch: 'src/',
      ext: 'js json',
      ignore: [
        'node_modules/',
        'test/'
      ],
      tasks: function (changedFiles) {
        const tasks = ['build']
        if (!changedFiles) {
          return tasks
        }

        changedFiles.forEach(function (file) {
          const fullpath = `${file}`
          const cwd = `${process.cwd()}`
          const path = fullpath.replace(cwd + '/', '')
          console.log(`File ${path} was changed`)
          const buildPath = `build/${path}`
          const fpath = buildPath.substring(0, buildPath.lastIndexOf('/'))
          return gulp
            .src([`${path}`])
            .pipe(standard())
            .pipe(standard.reporter('default', {
              breakOnError: true,
              quiet: true
            }))
            // .pipe(shell([`standard ${path}`]))
            .pipe(gulp.src(`build/${path}`, { read: false })
              .pipe(clean()))
            .pipe(gulp.src(`${path}`))
            .pipe(babel({ presets: ['@babel/preset-env'] }))
            .pipe(gulp.dest(fpath))
        })
        return []
      }
    })
      .on('crash', () => {
        // console.error(err)
        console.error('\nApplication has crashed!\n')
      })
  }
}

exports.build = gulp.series(eslint, cleaning, gulp.parallel(compileJs, copyConf))
exports.default = gulp.series(exports.build, develop)

// gulp.task('default', gulp.series(config[env].tasks,shell.task(
//   `NODE_ENV=${env} node ${config[env].startPoint}`
// )) )
