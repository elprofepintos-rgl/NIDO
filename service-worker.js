const CACHE_NAME = 'nido-v0.1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/aplicacion/pantallas/presentacion_nido.html',
  '/aplicacion/pantallas/inicio.html',
  '/aplicacion/pantallas/configuracion_inicial.html',
  '/aplicacion/pantallas/eleccion_mascota.html',
  '/aplicacion/pantallas/mi_nido.html',
  '/aplicacion/pantallas/aventuras.html',
  '/aplicacion/pantallas/escena.html',
  '/aplicacion/estilos/estilo_principal.css',
  '/aplicacion/modelos/adulto_responsable.js',
  '/aplicacion/modelos/estudiante.js',
  '/aplicacion/modelos/dispositivo.js',
  '/aplicacion/modelos/configuracion_local.js',
  '/aplicacion/modelos/mascota.js',
  '/aplicacion/modelos/aventura.js',
  '/aplicacion/modelos/recorrido_educativo.js',
  '/aplicacion/servicios/almacenamiento.js',
  '/aplicacion/servicios/mascotas.js',
  '/aplicacion/servicios/aventuras.js',
  '/aplicacion/servicios/progreso_educativo.js',
  '/aplicacion/servicios/motor_escenas.js',
  '/aplicacion/datos/escenas.js',
  '/aplicacion/servicios/configuracion_adulto.js',
  '/aplicacion/servicios/estudiantes.js',
  '/aplicacion/servicios/dispositivo.js',
  '/aplicacion/servicios/acceso.js',
  '/aplicacion/servicios/aplicacion.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const solicitud = event.request;
  const esVideoPresentacion = solicitud.url.indexOf('Presentacion%20NIDO.mp4') !== -1 ||
    solicitud.url.indexOf('Presentacion NIDO.mp4') !== -1;

  if (esVideoPresentacion) {
    // El video de presentación se cachea bajo demanda para no bloquear
    // la instalación del service worker por su tamaño.
    event.respondWith(
      caches.match(solicitud).then((cacheado) => {
        if (cacheado) {
          return cacheado;
        }
        return fetch(solicitud).then((respuesta) => {
          if (respuesta && respuesta.ok) {
            const copia = respuesta.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(solicitud, copia));
          }
          return respuesta;
        });
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    fetch(solicitud)
      .then((response) => response)
      .catch(() => caches.match(solicitud).then((cached) => cached || caches.match('/index.html')))
  );
});
