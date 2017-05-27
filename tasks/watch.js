const { extend, print } = require('./utils');
const eslint = require('./eslint');
const build = require('./build');
const { watch } = require('chokidar');

module.exports = (options) => {
  options = extend({
    watchEvents: [
      'change',
      'add',
      'unlink',
      'unlinkDir',
      'addDir',
    ],
  }, options);
  const runOnlyOn = (event) => {
    if (!options.watchEvents.indexOf(event)) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  print('Watching the files in the src/**/**/*.js path', 'cool');
  watch('src/**/**/*.js', {
    ignoreInitial: true,
  }).on('all', (event) => {
    // this tasks will run only if the current event matches the ones in the watchEvents array
    runOnlyOn(event)
      .then(eslint)
      .then(build)
      .catch(e => print(e, 'error'));
  });
};
