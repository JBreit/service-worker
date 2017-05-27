const { rollup } = require('rollup');
const mkdirp = require('mkdirp');
const { writeFileSync } = require('fs');
const babel = require('babel-core');
const { clean, print } = require('./utils');
const pkg = require('../package');

module.exports = (options) => {
  clean('./dist/');
  /**
   * Create a promise based on the result of the webpack compiling script
   */
  return new Promise((resolve, reject) => {
    rollup({
      entry: './src/main.js',
    }).then((bundle) => {
      const result = babel.transform(
        bundle.generate({
          format: 'cjs',
        }).code,
        {
          moduleId: pkg.name,
          moduleIds: true,
          comments: false,
          presets: ['es2015'],
          plugins: ['transform-es2015-modules-umd'],
        }).code;
      mkdirp('./dist/', () => {
        try {
          writeFileSync(`./dist/${pkg.name}.js`, result, 'utf8');
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }).catch((e) => { print(e, 'error'); });
  });
};
