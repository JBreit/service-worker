const { exec, extend, optionsToArray } = require('./utils');

module.exports = (options) => {
  options = extend({
    port: 3000,
  }, options);
  return exec('./node_modules/.bin/serve', optionsToArray(options));
};
