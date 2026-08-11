/**
 * Servicio: Dispositivo — Asociación local dispositivo → estudiante habitual
 *
 * Gestiona la asociación LOCAL entre este dispositivo y su estudiante habitual.
 *
 * Reglas fundamentales:
 * - id_dispositivo identifica únicamente al dispositivo (generado por el modelo).
 * - El id del estudiante es exactamente el id generado por el modelo Estudiante.
 * - estudiante_habitual_id es SOLO una referencia al estudiante (su id).
 * - NO se copian datos del estudiante dentro de nido:dispositivo.
 * - nido:configuracion conserva únicamente la referencia local (estudiante_habitual_id).
 *
 * La identidad del estudiante permanece en el modelo Estudiante.
 * El dispositivo no es la identidad del estudiante.
 *
 * Este servicio utiliza EXCLUSIVAMENTE window.NIDO.servicios.almacenamiento.
 * No accede a localStorage directamente.
 */

(function () {
  'use strict';

  /**
   * Obtiene el dispositivo asociado a esta instalación.
   * Si no existe, lo crea con el modelo y lo persiste.
   * @returns {Object} El dispositivo (asociación local).
   */
  function obtenerDispositivo() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var modelos = window.NIDO.modelos;

    var dispositivo = almacenamiento.obtenerDispositivo();

    if (!dispositivo) {
      dispositivo = modelos.crearDispositivo();
      almacenamiento.guardarDispositivo(dispositivo);
    }

    return dispositivo;
  }

  /**
   * Asocia un estudiante como habitual de este dispositivo.
   * Valida que exista un adulto configurador y que el estudiante exista.
   * @param {string} estudianteId - Id del estudiante (generado por el modelo Estudiante).
   * @returns {Object} El dispositivo actualizado.
   */
  function asociarEstudianteHabitual(estudianteId) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var configuracionAdulto = window.NIDO.servicios.configuracionAdulto;
    var estudiantes = window.NIDO.servicios.estudiantes;
    var modelos = window.NIDO.modelos;

    // 1. Verificar que exista un adulto configurador.
    if (!configuracionAdulto.estaConfigurado()) {
      throw new Error('No se puede asociar un estudiante porque la instalación no tiene un Adulto Responsable configurador.');
    }

    // 2. Verificar que el estudiante exista (su id debe pertenecer a un estudiante real).
    var estudiante = estudiantes.obtenerEstudiantePorId(estudianteId);
    if (!estudiante) {
      throw new Error('No se puede asociar el estudiante porque no existe en la colección local.');
    }

    // 3. Obtener o crear el dispositivo (sin duplicar).
    var dispositivo = obtenerDispositivo();

    // 4. Asociar el estudiante mediante el modelo (referencia por id).
    var dispositivoActualizado = modelos.cambiarEstudianteHabitual(dispositivo, estudianteId);

    // 5. Guardar el dispositivo.
    almacenamiento.guardarDispositivo(dispositivoActualizado);

    // 6. Obtener la configuración local.
    var configuracion = almacenamiento.obtenerConfiguracion();

    // 7. Si no existe configuración, se crea con el modelo antes de actualizarla.
    if (!configuracion) {
      configuracion = modelos.crearConfiguracionLocal();
    }

    // 8. Actualizar estudiante_habitual_id mediante el modelo.
    var configuracionActualizada = modelos.asignarEstudianteHabitual(configuracion, estudianteId);

    // 9. Guardar la configuración.
    almacenamiento.guardarConfiguracion(configuracionActualizada);

    return dispositivoActualizado;
  }

  /**
   * Cambia el estudiante habitual de este dispositivo por otro.
   * Realiza las mismas validaciones que asociarEstudianteHabitual.
   * Reemplaza la referencia anterior sin crear un nuevo dispositivo.
   * @param {string} estudianteId - Id del nuevo estudiante habitual.
   * @returns {Object} El dispositivo actualizado.
   */
  function cambiarEstudianteHabitual(estudianteId) {
    return asociarEstudianteHabitual(estudianteId);
  }

  /**
   * Obtiene el estudiante habitual de este dispositivo.
   * @returns {Object|null} El estudiante completo o null si no hay asociación.
   */
  function obtenerEstudianteHabitual() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var estudiantes = window.NIDO.servicios.estudiantes;

    var dispositivo = almacenamiento.obtenerDispositivo();

    if (!dispositivo || !dispositivo.estudiante_habitual_id) {
      return null;
    }

    // Busca el estudiante por su id original (no se copia su perfil en el dispositivo).
    return estudiantes.obtenerEstudiantePorId(dispositivo.estudiante_habitual_id);
  }

  /**
   * Indica si este dispositivo tiene un estudiante habitual asociado.
   * @returns {boolean} True si hay estudiante habitual.
   */
  function tieneEstudianteHabitual() {
    var modelos = window.NIDO.modelos;
    var dispositivo = obtenerDispositivo();
    return modelos.tieneEstudianteHabitual(dispositivo);
  }

  /**
   * Quita la asociación al estudiante habitual de este dispositivo.
   * Deja estudiante_habitual_id en null en el dispositivo y en la configuración local.
   * @returns {Object} El dispositivo actualizado.
   */
  function quitarEstudianteHabitual() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var modelos = window.NIDO.modelos;

    var dispositivo = obtenerDispositivo();

    // Establecer estudiante_habitual_id en null mediante el modelo existente.
    var dispositivoActualizado = modelos.cambiarEstudianteHabitual(dispositivo, null);
    almacenamiento.guardarDispositivo(dispositivoActualizado);

    // Actualizar la configuración local.
    var configuracion = almacenamiento.obtenerConfiguracion();
    if (configuracion) {
      var configuracionActualizada = modelos.asignarEstudianteHabitual(configuracion, null);
      almacenamiento.guardarConfiguracion(configuracionActualizada);
    }

    return dispositivoActualizado;
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.dispositivo = {
    obtenerDispositivo: obtenerDispositivo,
    asociarEstudianteHabitual: asociarEstudianteHabitual,
    obtenerEstudianteHabitual: obtenerEstudianteHabitual,
    tieneEstudianteHabitual: tieneEstudianteHabitual,
    cambiarEstudianteHabitual: cambiarEstudianteHabitual,
    quitarEstudianteHabitual: quitarEstudianteHabitual
  };
})();