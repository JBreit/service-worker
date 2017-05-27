(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('jbreit.github.io', [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.jbreitGithubIo = mod.exports;
  }
})(this, function () {
  'use strict';

  document.write('test');
});