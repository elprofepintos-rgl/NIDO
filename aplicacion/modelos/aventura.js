/**
 * Modelo: Aventura
 *
 * Representa una aventura educativa de NIDO.
 *
 * Una aventura es una experiencia guiada por Pipo que introduce
 * un contenido educativo específico de un área del conocimiento.
 *
 * El contenido está separado de la navegación:
 * cada aventura declara su ruta de inicio y el orquestador
 * se encarga de conectar la navegación real.
 */

/**
 * Catálogo de aventuras disponibles en NIDO.
 * Cada aventura es un objeto declarativo con sus datos.
 */
const CATALOGO_AVENTURAS = [
  {
    id: 'masa',
    nombre: 'Descubrimos la masa',
    descripcion: 'Acompañá a Pipo a descubrir qué es la masa.',
    area: 'fisica',
    contenido: 'masa',
    imagen: '🍎',
    disponible: true,
    orden: 1
  }
];

/**
 * Obtiene el catálogo de aventuras disponibles.
 * @returns {Array} Lista de aventuras disponibles.
 */
function obtenerCatalogoAventuras() {
  return CATALOGO_AVENTURAS.map(function (aventura) {
    return {
      id: aventura.id,
      nombre: aventura.nombre,
      descripcion: aventura.descripcion,
      area: aventura.area,
      contenido: aventura.contenido,
      imagen: aventura.imagen,
      disponible: aventura.disponible,
      orden: aventura.orden
    };
  });
}

/**
 * Busca una aventura por su id en el catálogo.
 * @param {string} id - Id de la aventura.
 * @returns {Object|null} La aventura o null si no existe.
 */
function obtenerAventuraPorId(id) {
  if (!id) {
    return null;
  }

  for (var i = 0; i < CATALOGO_AVENTURAS.length; i++) {
    if (CATALOGO_AVENTURAS[i].id === id) {
      return CATALOGO_AVENTURAS[i];
    }
  }

  return null;
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.obtenerCatalogoAventuras = obtenerCatalogoAventuras;
window.NIDO.modelos.obtenerAventuraPorId = obtenerAventuraPorId;