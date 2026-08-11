/**
 * Modelo: Adulto Responsable
 *
 * Representa la identidad propia y permanente del adulto que configura
 * y acompaña la experiencia de NIDO.
 *
 * Esta identidad NO depende del dispositivo ni de localStorage.
 * En una etapa posterior podrá sincronizarse mediante un servicio remoto.
 */

/**
 * Crea un Adulto Responsable.
 * @param {Object} datos - Información mínima del adulto.
 * @param {string} datos.nombre - Nombre o seudónimo del adulto.
 * @param {Object} [datos.metodoAcceso] - Método de acceso (SIN credenciales).
 * @returns {Object} Adulto Responsable.
 */
function crearAdultoResponsable(datos = {}) {
  if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new Error('El nombre del adulto responsable es obligatorio.');
  }

  const momentoActual = new Date().toISOString();

  return {
    id: crypto.randomUUID(),          // Identidad permanente, única e independiente del dispositivo
    nombre: datos.nombre.trim(),
    metodo_acceso: datos.metodoAcceso || { tipo: 'sin_acceso' },
    estudiantes: [],                  // Ids de estudiantes asociados (Adulto → múltiples estudiantes)
    fecha_creacion: momentoActual,
    fecha_actualizacion: momentoActual,
    // Preparado para sincronización futura (sin implementar).
    sincronizacion: {
      estado: 'local',                // 'local' | 'pendiente' | 'sincronizado'
      version: 1
    }
  };
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.crearAdultoResponsable = crearAdultoResponsable;