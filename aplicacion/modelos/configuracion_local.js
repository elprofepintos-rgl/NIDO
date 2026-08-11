/**
 * Modelo: ConfiguracionLocal
 *
 * Representa EXCLUSIVAMENTE la configuración de ESTA instalación de NIDO.
 * No representa la cuenta ni la identidad del Adulto Responsable.
 *
 * La identidad del Adulto Responsable y del Estudiante son permanentes e
 * independientes del dispositivo (ver modelos correspondientes).
 *
 * Esta configuración vive en localStorage de esta instalación.
 * El almacenamiento local NO es el destino definitivo de las identidades
 * que necesitan estar disponibles en múltiples dispositivos.
 */

/**
 * Crea la configuración local de NIDO.
 * @param {Object} [datos] - Datos opcionales de configuración.
 * @returns {Object} Configuración local de esta instalación.
 */
function crearConfiguracionLocal(datos = {}) {
  const momentoActual = new Date().toISOString();

  return {
    configurado: false,                       // ¿Ya se realizó la configuración inicial?
    rol_principal: datos.rolPrincipal || null, // 'adulto' | 'docente' (quién configuró)
    adulto_id: datos.adultoId || null,         // Id del adulto que configuró (si aplica)
    docente_id: datos.docenteId || null,       // Id del docente que configuró (si aplica)
    estudiante_habitual_id: datos.estudianteHabitualId || null, // Asociación dispositivo → estudiante
    preferencias_globales: {
      idioma: 'es-AR',
      accesibilidad: datos.accesibilidad || {},
      sonido: true,
      tiempo_diario: null
    },
    version_modelo: 1,                        // Para migraciones futuras del esquema
    fecha_actualizacion: momentoActual
  };
}

/**
 * Marca la configuración como realizada.
 * @param {Object} configuracion - Configuración local.
 * @param {Object} [actualizaciones] - Campos opcionales a actualizar.
 * @returns {Object} Nueva configuración local actualizada.
 */
function marcarConfigurado(configuracion, actualizaciones = {}) {
  if (!configuracion) {
    throw new Error('La configuración es obligatoria.');
  }

  return {
    ...configuracion,
    ...actualizaciones,
    configurado: true,
    fecha_actualizacion: new Date().toISOString()
  };
}

/**
 * Asigna el estudiante habitual de este dispositivo en la configuración.
 * @param {Object} configuracion - Configuración local.
 * @param {string} estudianteId - Id del estudiante habitual.
 * @returns {Object} Nueva configuración con el estudiante habitual actualizado.
 */
function asignarEstudianteHabitual(configuracion, estudianteId) {
  if (!configuracion) {
    throw new Error('La configuración es obligatoria.');
  }

  return {
    ...configuracion,
    estudiante_habitual_id: estudianteId,
    fecha_actualizacion: new Date().toISOString()
  };
}

// Exposición global para uso en la aplicación PWA.
window.NIDO = window.NIDO || {};
window.NIDO.modelos = window.NIDO.modelos || {};
window.NIDO.modelos.crearConfiguracionLocal = crearConfiguracionLocal;
window.NIDO.modelos.marcarConfigurado = marcarConfigurado;
window.NIDO.modelos.asignarEstudianteHabitual = asignarEstudianteHabitual;