/**
 * Modelo: Recorrido Educativo
 *
 * Representa un recorrido de aprendizaje continuo de NIDO.
 *
 * Un recorrido agrupa áreas de conocimiento con niveles secuenciales.
 * El contenido está separado de la navegación: cada nivel declara
 * su actividad y el orquestador conecta la navegación real.
 *
 * Estructura conceptual:
 *   recorrido
 *     └── área (masa, longitud, tiempo)
 *           └── nivel (actividad educativa)
 */

/**
 * Catálogo de recorridos educativos de NIDO.
 * Cada recorrido es un objeto declarativo con sus áreas y niveles.
 */
const CATALOGO_RECORRIDOS = [
  {
    id: 'jugamos_a_medir',
    titulo: 'Jugamos a medir las cosas',
    descripcion: 'Descubrí junto a Pipo cómo medimos el mundo.',
    icono: '📏',
    orden: 1,
    areas: [
      {
        id: 'masa',
        nombre: 'Masa',
        descripcion: 'Descubrimos qué es la masa.',
        icono: '🍎',
        orden: 1,
        niveles: [
          {
            id: 'masa_manzana',
            area: 'masa',
            orden: 1,
            titulo: 'La manzana',
            descripcion: 'Acompañá a Pipo a descubrir la masa de una manzana.',
            actividad: 'primer_encuentro_masa',
            recompensa: {
              tipo: 'estrella',
              cantidad: 1,
              identificador: 'estrella_masa_manzana'
            }
          }
        ]
      },
      {
        id: 'longitud',
        nombre: 'Longitud',
        descripcion: 'Descubrimos cómo medir distancias.',
        icono: '📏',
        orden: 2,
        niveles: []
      },
      {
        id: 'tiempo',
        nombre: 'Tiempo',
        descripcion: 'Descubrimos cómo medir el tiempo.',
        icono: '⏱️',
        orden: 3,
        niveles: []
      }
    ]
  }
];

/**
 * Obtiene el catálogo de recorridos educativos.
 * @returns {Array} Lista de recorridos disponibles.
 */
function obtenerCatalogoRecorridos() {
  return CATALOGO_RECORRIDOS.map(function (recorrido) {
    return {
      id: recorrido.id,
      titulo: recorrido.titulo,
      descripcion: recorrido.descripcion,
      icono: recorrido.icono,
      orden: recorrido.orden,
      areas: recorrido.areas.map(function (area) {
        return {
          id: area.id,
          nombre: area.nombre,
          descripcion: area.descripcion,
          icono: area.icono,
          orden: area.orden,
          niveles: area.niveles.map(function (nivel) {
            return {
              id: nivel.id,
              area: nivel.area,
              orden: nivel.orden,
              titulo: nivel.titulo,
              descripcion: nivel.descripcion,
              actividad: nivel.actividad,
              recompensa: nivel.recompensa
            };
          })
        };
      })
    };
  });
}

/**
 * Busca un recorrido por su id.
 * @param {string} id - Id del recorrido.
 * @returns {Object|null} El recorrido o null si no existe.
 */
function obtenerRecorridoPorId(id) {
  if (!id) {
    return null;
  }

  for (var i = 0; i < CATALOGO_RECORRIDOS.length; i++) {
    if (CATALOGO_RECORRIDOS[i].id === id) {
      return CATALOGO_RECORRIDOS[i];
    }
  }

  return null;
}

/**
 * Busca un área dentro de un recorrido.
 * @param {string} recorridoId - Id del recorrido.
 * @param {string} areaId - Id del área.
 * @returns {Object|null} El área o null si no existe.
 */
function obtenerAreaPorId(recorridoId, areaId) {
  var recorrido = obtenerRecorridoPorId(recorridoId);
  if (!recorrido) {
    return null;
  }

  for (var i = 0; i < recorrido.areas.length; i++) {
    if (recorrido.areas[i].id === areaId) {
      return recorrido.areas[i];
    }
  }

  return null;
}

/**
 * Busca un nivel por su id dentro de un recorrido.
 * @param {string} recorridoId - Id del recorrido.
 * @param {string} nivelId - Id del nivel.
 * @returns {Object|null} El nivel o null si no existe.
 */
function obtenerNivelPorId(recorridoId, nivelId) {
  var recorrido = obtenerRecorridoPorId(recorridoId);
  if (!recorrido) {
    return null;
  }

  for (var i = 0; i < recorrido.areas.length; i++) {
    var area = recorrido.areas[i];
    for (var j = 0; j < area.niveles.length; j++) {
      if (area.niveles[j].id === nivelId) {
        return area.niveles[j];
      }
    }
  }

  return null;
}

/**
 * Obtiene todos los niveles de un recorrido en orden secuencial.
 * @param {string} recorridoId - Id del recorrido.
 * @returns {Array} Lista de niveles ordenados.
 */
function obtenerNivelesDelRecorrido(recorridoId) {
  var recorrido = obtenerRecorridoPorId(recorridoId);
  if (!recorrido) {
    return [];
  }

  var niveles = [];
  recorrido.areas.forEach(function (area) {
    area.niveles.forEach(function (nivel) {
      niveles.push(nivel);
    });
  });

  return niveles;
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.obtenerCatalogoRecorridos = obtenerCatalogoRecorridos;
window.NIDO.modelos.obtenerRecorridoPorId = obtenerRecorridoPorId;
window.NIDO.modelos.obtenerAreaPorId = obtenerAreaPorId;
window.NIDO.modelos.obtenerNivelPorId = obtenerNivelPorId;
window.NIDO.modelos.obtenerNivelesDelRecorrido = obtenerNivelesDelRecorrido;