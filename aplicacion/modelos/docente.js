/**
 * Modelo: Docente
 *
 * Representa al profesional educativo con identidad propia y permanente.
 *
 * Puede acompañar a múltiples estudiantes y (a futuro) gestionar grupos,
 * sin duplicar perfiles ni progreso.
 *
 * No almacena contraseñas ni credenciales.
 * La autenticación, si se implementa, pertenecerá a un servicio específico.
 */

/**
 * Crea un Docente.
 * @param {Object} datos - Información mínima del docente.
 * @param {string} datos.nombre - Nombre completo del docente.
 * @param {string} [datos.institucion] - Institución o escuela asociada.
 * @returns {Object} Docente.
 */
function crearDocente(datos = {}) {
  if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new Error('El nombre del docente es obligatorio.');
  }

  const momentoActual = new Date().toISOString();

  return {
    id: crypto.randomUUID(),          // Identidad permanente, independiente del dispositivo
    nombre: datos.nombre.trim(),
    institucion: datos.institucion || '',
    grupos: [],                       // Ids de grupos (a futuro)
    estudiantes: [],                  // Ids de estudiantes que acompaña (Docente → múltiples estudiantes)
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
window.NIDO.modelos.crearDocente = crearDocente;