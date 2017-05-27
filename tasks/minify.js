const { extend, print } = require('./utils');
const { writeFile } = require('fs');
const uglify = require('uglify-js');
const pkg = require('../package');

module.exports = (options) => {
  options = extend({
    base: 'dist/',
  }, options);
  const sourcePath = `${options.base}${pkg.name}.js`;
  const outputPath = `${options.base}${pkg.name}.min.js`;
  const output = uglify.minify(sourcePath);
  /**
   * Create a promise based on the result of the uglify output
   */
  return new Promise((resolve, reject) => {
    writeFile(outputPath, output.code, (err) => {
      if (err) {
        print(err, 'error');
        reject(err);
      } else {
        print('Library minified', 'confirm');
        print(`Created file: ${outputPath}`, 'cool');
        resolve();
      }
    });
  });
};
