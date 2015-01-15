'use strict';

module.exports = function (config) {

  config.set({

    basePath: './',

    frameworks: ['browserify', 'jasmine'],

    files: [
      'src/*.js',
      'test/custom-matchers.js',
      'test/*-spec.js'
    ],

    preprocessors: {
      'src/*.js': ['browserify'],
      'test/*.js': ['browserify']
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'junit'],

    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: ['PhantomJS'],

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: true,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    browserify: {
      debug: true
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter',
      'karma-browserify'
    ]
  });
};
