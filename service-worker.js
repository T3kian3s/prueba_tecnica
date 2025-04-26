importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('✅ Workbox cargado');

  // Precaching recursos esenciales para offline inicial
  workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: '1' },
    { url: 'html/gestor-tareas.html', revision: '1' },
    { url: 'styles/login.css', revision: '1' },
    { url: 'styles/style.css', revision: '1' },
    { url: 'js/app.js', revision: '1' },
    { url: 'js/main.js', revision: '1' },
    { url: 'manifest.json', revision: '1' },
    { url: 'img/task_icon.png', revision: '1' },
  ]);

  // Estrategia para navegación (Network First)
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
    })
  );

  // Estrategia para CSS y JS (Stale-While-Revalidate)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'assets-cache',
    })
  );

  // Estrategia para imágenes (Cache First)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // máximo de imágenes cacheadas
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 semana
        }),
      ],
    })
  );

  // Estrategia para manifest (Cache First)
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('manifest.json'),
    new workbox.strategies.CacheFirst({
      cacheName: 'manifest-cache',
    })
  );

} else {
  console.log('❌ Workbox no se pudo cargar');
}

// Instalación y activación inmediata
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});