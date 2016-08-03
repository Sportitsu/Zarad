// Karma configuration
<<<<<<< HEAD
// Generated on Mon Aug 01 2016 19:28:08 GMT+0300 (EEST)
=======
// Generated on Mon Aug 01 2016 18:41:17 GMT+0300 (EEST)
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
<<<<<<< HEAD
<<<<<<< HEAD
    frameworks: ['mocha','chai', 'sinon'],
=======
    frameworks: ['mocha','chai','sinon'],
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
=======

    frameworks: ['jasmine','mocha','chai'],
>>>>>>> 5b8664bf56c6a38e65535354727026242fdd3cf1


    // list of files / patterns to load in the browser
    files: [
      'client/lib/angular/angular.js',
<<<<<<< HEAD
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-mocks/angular-mocks.js',

      'client/app.js',
      // our app code
      'client/app/**/*.js',

      // our spec files - in order of the README
=======
      'client/lib/angular-mocks/angular-mocks.js',
      'client/lib/angular-route/angular-route.js',
      'client/app.js',
      'client/app/auth/auth.js',
      'client/app/services/services.js',
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
      'test/front-end/clientSpec.js'
    ],


    // list of files to exclude
    exclude: [
<<<<<<< HEAD

=======
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
<<<<<<< HEAD
=======
        'client/app/**/*.js' : 'coverage'
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
<<<<<<< HEAD
    reporters: ['progress'],


=======
    reporters: ['progress','coverage'],

    coverageReporter : {
      type : 'html',
      dir : 'coverage/',
      file : 'coverage.txt'
    },
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
<<<<<<< HEAD
    browsers: ['PhantomJS'],
=======
    browsers: ['Chrome'],
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
