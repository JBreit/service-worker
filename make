#!/usr/bin/env node

'use strict';

global.library = require('./package.json').name;

const build = require('./tasks/build');
const	eslint = require('./tasks/eslint');
const	minify = require('./tasks/minify');
const	serve = require('./tasks/serve');
const	test = require('./tasks/test');
const utils = require('./tasks/utils');
const	watch = require('./tasks/watch');

switch(process.argv[2]) {
  case 'build':
  	build()
  	break
  case 'eslint':
  	eslint()
  	break
  case 'minify':
  	minify()
  	break
  case 'saucelabs':
  	test({
  		saucelabs: true
  	})
  	break
  case 'serve':
  	serve()
  	break
  case 'test':
  	test()
  	break
  case 'watch':
  	watch()
  	break
  default:
  	eslint()
  		.then(build)
  		.then(minify)
  		.then(test)
  		.then(() => {
  			utils.print('Project successfully compiled', 'confirm')
  		})
}
