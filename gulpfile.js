'use strict';

require("babel/register");

var gulp          = require('gulp'),
    connect       = require('gulp-connect'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    sourcemaps    = require('gulp-sourcemaps'),
    plumber       = require('gulp-plumber'),
    browserify    = require('browserify'),
    babelify      = require('babelify'),
    buffer        = require('vinyl-buffer'),
    source        = require('vinyl-source-stream'),
    util          = require('gulp-util'),
    notification  = require('node-notifier'),
    filter        = require('gulp-filter'),
    bowerSrc      = require('gulp-bower-src'),
    flatten       = require('gulp-flatten'),
    clean         = require('gulp-clean'),
    order         = require('gulp-order'),
    runSequence   = require('run-sequence'),

    Router        = require('react-router'),
    Routes        = require('./src/js/router/Router'),
    React         = require('react'),
    fs            = require('fs'),
    url           = require('url');

function onError(namespace) {
  return function (err) {
    notification.notify({
      title: [namespace || 'Error'],
      message: [err.message, err.file + ':' + err.line].join('\n\n')
    });

    util.log(util.colors.red('Error'), err.message);
  };
}

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    middleware: function (connect, options) {
			return [
        function (req, res, next) {
          if (url.parse(req.url).pathname.indexOf('.') !== -1) {
            return next();
          }

          Router.run(new Routes().getRoutes(), req.url, function (Handler) {
            var content = React.renderToString(React.createElement(Handler, null));

            fs.readFile('./src/index.html', 'utf8', function (err, data) {
              data = data.replace('<section id="application"></section>', '<section id="application">' + content + '</section>');

              res.setHeader('Content-Type', 'text/html');
              res.setHeader('Content-Length', data.length);

              return res.end(data);
            });
          });
        }
      ];
		}
  });
});

gulp.task('bower', function () {
  bowerSrc()
    .pipe(filter('**/*.css', '!**/*.min.css'))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'));

  bowerSrc()
    .pipe(filter('**/*.css.map'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('sass', function () {
  return gulp.src([
    'src/**/*.sass'
  ])
    .pipe(order([
      'src/**/_*.sass',
      'src/css/**/*.sass',
      'src/**/*.sass'
    ]))
    .pipe(concat('app.sass'))
    .pipe(sass({
      onError: onError('Sass'),
      sourceMap: 'sass',
      sourceComments: 'map',
      indentedSyntax: true
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('reload', function () {

});

gulp.task('watch', function () {
  gulp.watch([
    './src/js/**/*.js'
  ], [
    'compile:js'
  ]);

  gulp.watch([
    'gulpfile.js'
  ], ['reload']);

  gulp.watch([
    './src/**/*.html'
  ], [
    'html'
  ]);

  gulp.watch([
    'src/*.sass',
    'src/**/*.sass'
  ], [
    'compile:css'
  ]);
});

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('browserify-babel', function () {
  var b = browserify({
    entries: './src/js/app.js',
    debug: true,
    transform: [babelify.configure({
      nonStandard: true,
      modules: 'common'
    })],
  });

  return b.bundle()
    .on("error", onError('Babel'))
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('compile:css', ['sass', 'bower']);
gulp.task('compile:js', ['html', 'browserify-babel']);
gulp.task('default', runSequence(['compile:js', 'compile:css'], ['connect', 'watch']));
