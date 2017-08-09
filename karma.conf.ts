module.exports = function (config: any) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests/tests.js',
    ],
    exclude: [],
    preprocessors: {
      'tests/tests.js': ['webpack'],
    },
    // webpack configuration
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      stats: 'errors-only',
    },


    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    // 'PhantomJS',
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
      },
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      require('karma-webpack'),
      require('karma-chai'),
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
    ],

  });
};
