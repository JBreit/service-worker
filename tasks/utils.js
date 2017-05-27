const { spawn } = require('child_process');
const { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } = require('fs');
const { normalize } = require('path');
const { platform } = require('os');

const utils = {
  /**
   * Delete synchronously any folder or file
   * @param { String } path - path to clean
   */
  clean(path) {
    const files = utils.listFiles(path, true);
    utils.print(`Deleting the following files: \n ${files.join('\n')}`, 'cool');
  },
  /**
   * Simple object extend function
   * @param { Object } obj1 - destination
   * @param { Object } obj2 - source
   * @returns { Object } - destination object
   */
  extend(obj1, obj2) {
    for (const i in obj2) {
      if (obj2.hasOwnProperty(i)) {
        obj1[i] = obj2[i];
      }
    }
    return obj1;
  },
  /**
   * Run system command
   * @param { String } command - command to execute
   * @param { Array } args - command arguments
   * @param { Object } envVariables - command environment variables
   * @returns { Promise } chainable promise object
   */
  exec(command, args, envVariables) {
    return new Promise((resolve, reject) => {
      if (platform() === 'win32' || platform() === 'win64') { command += '.cmd'; }

      utils.extend(process.env, envVariables);
      utils.print(`Executing: ${command}  ${args.join(' ')} \n`, 'confirm');
      const cmd = spawn(normalize(command), args, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
      cmd.on('exit', (code) => {
        if (code === 1) {
          reject();
        } else {
          resolve();
        }
      });
    });
  },
  /**
   * Read all the files crawling starting from a certain folder path
   * @param { String } path directory path
   * @param { bool } mustDelete delete the files found
   * @returns { Array } files path list
   */
  listFiles(path, mustDelete) {
    utils.print(`Listing all the files in the folder: ${path}`, 'confirm');
    const files = [];
    if (existsSync(path)) {
      const tmpFiles = readdirSync(path);
      tmpFiles.forEach((file) => {
        const curPath = `${path}/${file}`;
        files.push(curPath);
        if (lstatSync(curPath).isDirectory()) { // recurse
          utils.listFiles(curPath, mustDelete);
        } else if (mustDelete) { // delete file
          unlinkSync(curPath);
        }
      });
      if (mustDelete) {
        rmdirSync(path);
      }
    }
    return files;
  },
  /**
   * Convert an options object into a valid arguments array for the child_process.spawn method
   * from:
   *   var options = {
   *     foo: 'hello',
   *     baz: 'world'
   *   }
   * to:
   *   ['--foo=', 'hello', '--baz=','world']
   *
   * @param { Object }  obj - object we need to convert
   * @param { Array }   optionsPrefix - use a prefix for the new array created
   * @param { Boolean } hasEquals - set the options commands using the equal
   * @returns { Array } - options array
   */
  optionsToArray(obj, optionsPrefix, hasEquals) {
    optionsPrefix = optionsPrefix || '--';
    const ret = [];
    Object.keys(obj).forEach((key) => {
      ret.push(optionsPrefix + key + (hasEquals ? '=' : ''));
      if (obj[key]) ret.push(obj[key]);
    });
    return ret;
  },
  /**
   * Log messages in the terminal using custom colors
   * @param { String } msg - message to output
   * @param { String } type - message type to handle the right color
   */
  print(msg, type) {
    let color;
    switch (type) {
      case 'error':
        color = '\x1B[31m';
        break;
      case 'warning':
        color = '\x1B[33m';
        break;
      case 'confirm':
        color = '\x1B[32m';
        break;
      case 'cool':
        color = '\x1B[36m';
        break;
      default:
        color = '';
    }
    console.log(`${color} ${msg} \x1B[39m`);
  },
};
module.exports = utils;
