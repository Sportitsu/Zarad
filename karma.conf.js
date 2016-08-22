// Karma configuration
// Generated on Mon Aug 01 2016 18:41:17 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter


    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'www/ionic/js/angular/angular.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ionic/js/ionic.js',
      'www/lib/angular-youtube-mb/dist/angular-youtube-embed.min.js',
      'www/lib/ionic/js/ionic-angular.js',
      'www/lib/ionic/js/ionic.bundle.js',
      'www/ionic/js/ionic.bundle.js',
      'www/ng-cordova.min.js',
      'www/lib/ionic-material/dist/ionic.material.min.js',
      'www/lib/ionic/js/ionic.js',
      'www/lib/ionic/js/ionic.bundle.js',
      'www/app.js',
      'www/js/**/*.js',
      'test/front-end/tournamentSpec.js',
      'test/front-end/userSpec.js',
      'test/front-end/clubSpec.js',
      'test/front-end/adminSpec.js',
      'test/front-end/ServicesSpec.js',
      'test/front-end/profileSpec.js'
    ],


    

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'www/js/**/*.js' : 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec','coverage'],

    coverageReporter : {
      type : 'html',
      dir : 'coverage/',
      file : 'coverage.txt'
    },
    // web server port
    port: 9876,


    jasmineNodeOpts: {
        isVerbose: true,
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'
    // , 'Chrome_without_security'
    ],  

    // you can define custom flags 
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}