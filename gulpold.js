// /* jslint node: true */

// 'use strict'

// const gulp = require('gulp')
// const clean = require('gulp-clean')
// const shell = require('gulp-shell')
// const nodemon = require('gulp-nodemon')
// const babel = require('gulp-babel')
// const livereload = require('gulp-livereload')

// const devBuild = (process.env.NODE_ENV !== 'prod')

// const env = process.env.NODE_ENV || 'dev'

// const config = {
//   dev: {
//     tasks: ['build', 'develop'],
//     config: {
//       src: 'src/**/*.json',
//       dest: './build/src/'
//     },
//     default: {
//       src: 'src/**/*.js'
//     },
//     clean: {
//       src: 'build/*'
//     },
//     compile: {
//       src: 'src/**/*.js',
//       dest: './build/src/'
//     },
//     eslint: {
//       files: '"src/**/*.js" "test/**/*.js"'
//     }

//   },
//   prod: {
//     tasks: ['build', 'develop'],
//     src: 'src/**/*.js',
//     dest: './build/src/'
//   },
//   test: {
//     tasks: ['build', 'develop'],
//     config: {
//       src: 'src/**/*.json',
//       dest: './build/src/'
//     },
//     default: {
//       src: 'src/**/*.js'
//     },
//     clean: {
//       src: 'build/*'
//     },
//     compile: {
//       src: 'src/**/*.js',
//       dest: './build/src/'
//     },
//     eslint: {
//       files: '"src/**/*.js" "test/**/*.js"'
//     }
//   }
// }

// // src = 'src/'
// // build = 'build/'

// // Remove build directory.

// gulp.task('clean', () => {
//   return gulp.src(config[env].clean.src, {
//     read: false
//   })
//     .pipe(clean())
// })

// // Compiling using babel.

// gulp.task('compile', () => {
//   return gulp.src(config[env].compile.src)
//     .pipe(babel({
//       presets: ['@babel/preset-env']
//     }))
//     .pipe(gulp.dest(config[env].compile.dest))
// })

// // Copy config files

// gulp.task('configs', () => {
//   return gulp.src(config[env].config.src)
//     .pipe(gulp.dest(config[env].config.dest))
// })

// // Lint all custom Javascript files.

// gulp.task('eslint', gulp.series('clean', 'compile', 'configs', shell.task([
//   `standard ${config[env].eslint.files}`
// ]
// )))

// // Build the project.

// gulp.task('build', gulp.series('eslint', (done) => {
//   console.log('Building the project ...')
//   done()
// }))

// // Build the project when there are changes in Javascript files

// gulp.task('develop', (done) => {
//   if (devBuild) {
//     return nodemon({
//       script: 'build/src/server.js',
//       watch: 'src/',
//       ext: 'js json',
//       ignore: [
//         'node_modules/',
//         'test/'
//       ],
//       tasks: ['build']
//     })
//       .on('restart', () => {
//         done()
//         console.log('restarted the build process')
//       })
//       .on('crash', () => {
//         done()
//         console.error('\nApplication has crashed!\n')
//       })
//   }
// })

// gulp.task('default', gulp.series(config[env].tasks), () => {
//   // const watcher =  gulp.watch(config[env].default.src, { events: 'all' }, function (cb) {
//   //   cb()
//   // })
//   // watcher.on('change',function(){
//   //   console.log('$%%%%%%%%%%%%%%%%%%%%%%%%%%$%$%$%$')
//   //   // livereload.changed(file.path)
//   //   // console.log('FILES CHANGED'+'('+file.path+')')
//   // })
//   // return watcher

// })
