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

  if ('serviceWorker' in navigator && "SyncManager" in window) {
    addEventListener('load', function (event) {
      navigator.serviceWorker.register('service-worker.js', { scope: '/' });
      navigator.serviceWorker.ready.then(function (registration) {
        console.info('> [ServiceWorker] registration successful with scope: ', registration.scope);
      }).catch(function (err) {
        console.info('> [ServiceWorker] registration failed: ', err);
      });
    });
  } else {
    console.log(event);
  }
});