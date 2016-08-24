var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;

var paths = {
  sass: ['./scss/**/*.scss'],
  lint: ['./www/app/**/*.js','./server/**/*.js']
};

gulp.task('default', ['sass', 'lint' , 'watch']);

gulp.task('scripts',function(){
  return gulp.src(['www/app.js',
                    'www/js/services/services.js',
                    'www/js/controller/user/*.js',
                    'www/js/controller/*.js'
  ])
          .pipe(concat('all.js'))
          .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(done) {
   gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/cssionic/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/cssionic/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.lint, ['lint'])
});

gulp.task('uglify',function(){

});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


gulp.task('lint', function(){
  return gulp.src(['./www/js/**/*.js','./server/**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('default'))
})


gulp.task('combine', function(){
       gulp.src([ './www/services/services.js',
                  './www/app/Admin/AdminHome.js.js',
                  './www/app/auth/auth.js',
                  './www/club/club.js',
                  './www/profile/profile.js',
                  './www/app.js'
        ])
             .pipe(concat('app.min.js'))
             .pipe(uglify())
             .pipe(gulp.dest('./www/dist/'));
       gulp.src(['./www/lib/**/*.js', './www/ionic/**/*.js'])
           .pipe(concat('libraries.js'))
           .pipe(gulp.dest('./www/dist'));
      return 'done';
});


gulp.task('test', function (cb) {
  exec('npm test', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
