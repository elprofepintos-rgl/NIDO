/**
 * Modelo: Dispositivo
 *
 * Representa ÚNICAMENTE una asociación LOCAL entre un dispositivo
 * y su estudiante habitual.
 *
 * Regla funcional:
 *   Dispositivo A → Estudiante X
 *   Dispositivo B → Estudiante X
 *   Ambos representan al mismo estudiante, sin duplicarlo.
 *
 * Este modelo NO almacena la identidad completa, perfil ni progreso
 * del estudiante. Solo conserva el id del estudiante habitual
 * (estudiante_habitual_id).
 *
 * La identidad y el progreso pertenecen al Estudiante, no al dispositivo.
 */

/**
 * Identificador local único del dispositivo.
 * Se genera una vez y se conserva en esta instalación.
 * @returns {string} Identificador único.
 */
function generarIdDispositivo() {
  return crypto.randomUUID();
}

/**
 * Crea la asociación local del dispositivo.
 * @param {Object} [datos] - Datos opcionales.
 * @param {string} [datos.estudianteHabitualId] - Id del estudiante habitual en este dispositivo.
 * @returns {Object} Dispositivo (asociación local).
 */
function crearDispositivo(datos = {}) {
  const momentoActual = new Date().toISOString();

  return {
    id_dispositivo: generarIdDispositivo(),
    estudiante_habitual_id: datos.estudianteHabitualId || null,
    fecha_actualizacion: momentoActual
  };
}

/**
 * Cambia el estudiante habitual de este dispositivo.
 * @param {Object} dispositivo - Objeto dispositivo (asociación local).
 * @param {string} estudianteId - Id del nuevo estudiante habitual.
 * @returns {Object} Nuevo estado del dispositivo.
 */
function cambiarEstudianteHabitual(dispositivo, estudianteId) {
  if (!dispositivo) {
    throw new Error('El dispositivo es obligatorio.');
  }

  return {
    ...dispositivo,
    estudiante_habitual_id: estudianteId,
    fecha_actualizacion: new Date().toISOString()
  };
}

/**
 * Indica si el dispositivo tiene un estudiante habitual asociado.
 * @param {Object} dispositivo - Objeto dispositivo.
 * @returns {boolean} True si hay estudiante habitual.
 */
function tieneEstudianteHabitual(dispositivo) {
  return Boolean(dispositivo && dispositivo.estudiante_habitual_id);
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.crearDispositivo = crearDispositivo;
window.NIDO.modelos.cambiarEstudianteHabitual = cambiarEstudianteHabitual;
window.NIDO.modelos.tieneEstudianteHabitual = tieneEstudianteHabitual;