/**
 * Modelo: Estudiante
 *
 * Representa la identidad propia y permanente del estudiante.
 *
 * Su id permanece igual aunque utilice distintos dispositivos.
 * El dispositivo solo conserva localmente la asociación
 * dispositivo → estudiante (ver modelo_dispositivo).
 */

/**
 * Crea un Estudiante.
 * @param {Object} datos - Información mínima del estudiante.
 * @param {string} datos.nombre - Nombre o alias del estudiante.
 * @param {string} [datos.avatar] - Ruta o clave del avatar.
 * @param {string} [datos.nivelInicial] - Nivel inicial ('inicial', etc.).
 * @returns {Object} Estudiante.
 */
function crearEstudiante(datos = {}) {
  if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new Error('El nombre del estudiante es obligatorio.');
  }

  const momentoActual = new Date().toISOString();

  return {
    id: crypto.randomUUID(),          // Identidad permanente, independiente del dispositivo
    nombre: datos.nombre.trim(),
    avatar: datos.avatar || null,
    nivel_inicial: datos.nivelInicial || 'inicial',
    preferencias: {
      accesibilidad: datos.accesibilidad || {},
      sonido: true,
      nivel_ayuda: 'media'
    },
    mascota_id: null,                 // Se asignará en la elección de mascota
    progreso: {},                     // Progreso propio del estudiante (motor educativo futuro)
    monedas: 0,
    inventario: [],
    adultos_responsables: [],         // Ids de adultos responsables (Estudiante → múltiples adultos)
    docentes: [],                     // Ids de docentes (Estudiante → múltiples docentes)
    fecha_creacion: momentoActual,
    fecha_actualizacion: momentoActual,
    sincronizacion: {
      estado: 'local',                // Preparado para sincronización futura (sin implementar)
      version: 1
    }
  };
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.crearEstudiante = crearEstudiante;