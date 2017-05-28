/* global window*/

let width = document.body.clientWidth;
let height = document.body.clientHeight;

const isLocallHost = Boolean(window.location.host === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    ));

document.write(`width: ${width}`);
document.write(`height: ${height}`);

if ('serviceWorker' in navigator &&
    "SyncManager" in window &&
    (window.location.protocol === 'https:' || isLocalhost)) {
      addEventListener('load', (event) => {
        navigator.serviceWorker.register('service-worker.js', { scope: '/' });
        navigator.serviceWorker.ready.then((registration) => {
          console.info(`
            > [ServiceWorker] registration successful with scope:
            ${registration.scope}
          `);

          registration.addEventListener('updatefound', () => {
            if (navigator.serviceWorker.controller) {
              const installingWorker = registration.installing;

              installingWorker.addEventListener('statechange', () => {
                switch (installingWorker.state) {
                  case 'installed':
                    break;
                  case 'redundant':
                    throw new Error('The installing service worker became redundant');
                  default:
                }
              });
            }
          });
        }).catch((err) => {
          console.info(`> [ServiceWorker] registration failed: ${err}`);
        });
      });
} else {
  console.log(event);
}
