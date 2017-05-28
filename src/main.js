/* global window*/

if ('serviceWorker' in navigator && "SyncManager" in window) {
  addEventListener('load', (event) => {
    navigator.serviceWorker.register('service-worker.js', { scope: '/' });
    navigator.serviceWorker.ready.then((registration) => {
      console.info('> [ServiceWorker] registration successful with scope: ', registration.scope);
    }).catch((err) => {
      console.info('> [ServiceWorker] registration failed: ', err);
    });
  });
} else {
  console.log(event);
}
