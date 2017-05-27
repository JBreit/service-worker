const { clean, print } = require('./utils')
const { rollup } = require('rollup')
// const postcss = require('rollup-plugin-postcss')
// const cssnext = require('postcss-cssnext')
// const postcssModules = require('postcss-modules')
const mkdirp = require('mkdirp')
const { writeFileSync } = require('fs')
const babel = require('babel-core')

module.exports = (options) => {

  clean('./dist/')

  const cssExportMap = {}

  /**
   * Create a promise based on the result of the webpack compiling script
   */

  return new Promise((resolve, reject) => {
    rollup({
      entry: './src/main.js'// ,
      // plugins: [postcss({
      // extensions: ['.css', '.scss'],  // default value
      //   plugins: [
      //     postcssModules({
      //       getJSON (id, exportTokens) {
      //         cssExportMap[id] = exportTokens
      //       }
      //     }),
      //     cssnext(),
      //     // yourPostcssPlugin()
      //   ],
      //   getExport (id) {
      //     return cssExportMap[id];
      //   }
      //   //sourceMap: false, // default value
      //   //extract: false, // default value
      //   // parser: sugarss
      // })]
    }).then(bundle => {

      // convert to valid es5 code with babel
      const result = babel.transform(
        // create a single bundle file
        bundle.generate({
          format: 'cjs'
        }).code,
        {
          moduleId: global.library,
          moduleIds: true,
          comments: false,
          presets: ['es2015'],
          plugins: ['transform-es2015-modules-umd']
        }
      ).code

      mkdirp('./dist/', () => {
        try {
          writeFileSync(`./dist/${global.library}.js`, result, 'utf8')
          resolve()
        } catch (e) {
          reject(e)
        }
      })

    }).catch(e => { print(e, 'error') })
  })

}
