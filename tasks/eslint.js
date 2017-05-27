const { exec, extend } = require('./utils');

module.exports = (options) => {
  options = extend({
    folders: [
      'tasks',
      'src',
      'test',
    ],
  }, options);
  return exec('./node_modules/.bin/eslint', options.folders);
};
