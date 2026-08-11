/**
 * Modelo: Mascota
 *
 * Representa el compañero virtual de aprendizaje del estudiante.
 *
 * La mascota acompaña, guía y motiva durante la experiencia educativa.
 * Cada mascota tiene una personalidad propia, expresiones y recursos visuales.
 *
 * La relación Estudiante → Mascota se establece mediante `mascota_id`
 * en el modelo Estudiante (referencia por id, sin duplicar datos).
 */

/**
 * Catálogo de mascotas disponibles en NIDO.
 * Cada mascota es un objeto declarativo con sus datos y recursos.
 */
const CATALOGO_MASCOTAS = [
  {
    id: 'pipo',
    nombre: 'Pipo',
    especie: 'Pingüino explorador',
    personalidad: 'Curioso, tranquilo y amigable',
    descripcion: 'Pipo es un pingüino explorador que ama descubrir cosas nuevas. Siempre está listo para acompañarte en cada aventura.',
    imagen: 'activos/mascotas/pipo_modelo_oficial_v1.png',
    expresiones: {
      feliz: 'activos/mascotas/pipo_modelo_oficial_v1.png',
      sorprendido: 'activos/mascotas/pipo_modelo_oficial_v1.png',
      pensativo: 'activos/mascotas/pipo_modelo_oficial_v1.png'
    },
    accesorios_disponibles: [],
    fecha_creacion: new Date().toISOString()
  }
];

/**
 * Obtiene el catálogo completo de mascotas disponibles.
 * @returns {Array} Lista de mascotas disponibles.
 */
function obtenerCatalogoMascotas() {
  return CATALOGO_MASCOTAS.map(function (mascota) {
    return {
      id: mascota.id,
      nombre: mascota.nombre,
      especie: mascota.especie,
      personalidad: mascota.personalidad,
      descripcion: mascota.descripcion,
      imagen: mascota.imagen
    };
  });
}

/**
 * Busca una mascota por su id en el catálogo.
 * @param {string} id - Id de la mascota.
 * @returns {Object|null} La mascota o null si no existe.
 */
function obtenerMascotaPorId(id) {
  if (!id) {
    return null;
  }

  for (var i = 0; i < CATALOGO_MASCOTAS.length; i++) {
    if (CATALOGO_MASCOTAS[i].id === id) {
      return CATALOGO_MASCOTAS[i];
    }
  }

  return null;
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.obtenerCatalogoMascotas = obtenerCatalogoMascotas;
window.NIDO.modelos.obtenerMascotaPorId = obtenerMascotaPorId;