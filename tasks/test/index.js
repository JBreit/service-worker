const { exec, extend } = require('../utils');

module.exports = (options) => {
  options = extend({
    saucelabs: false,
  }, options);
  return exec(
    './node_modules/.bin/karma',
    [
      'start',
      'tasks/test/karma.conf.js',
    ],
    {
      LIBRARY_NAME: global.library,
      TRAVIS_JOB_ID: process.env.TRAVIS_JOB_ID,
      SAUCE_USERNAME: 'es6projectstarterkit',
      SAUCE_ACCESS_KEY: 'bedf1991-5777-472f-8e14-3cde10fbd01f',
      SAUCELABS: options.saucelabs,
    });
};
