/**
 * Servicio: Acceso de NIDO
 *
 * Determina, a partir del estado local real, qué flujo debe seguir la aplicación.
 * Conecta los servicios previos (configuración del adulto, estudiantes y dispositivo)
 * en una única capa de decisión, sin implementar pantallas ni navegación.
 *
 * Estados de acceso posibles:
 * - 'sin_configurar': la instalación aún no tiene un Adulto Responsable configurador.
 * - 'configurado_sin_estudiante': hay adulto configurador pero no hay estudiante habitual asociado.
 * - 'configurado_con_estudiante': hay adulto configurador y un estudiante habitual puede acceder.
 *
 * Este servicio utiliza EXCLUSIVAMENTE las APIs reales de los servicios existentes.
 * No accede a localStorage directamente.
 */

(function () {
  'use strict';

  /**
   * Obtiene el estado de acceso de esta instalación.
   * @returns {string} 'sin_configurar' | 'configurado_sin_estudiante' | 'configurado_con_estudiante'
   */
  function obtenerEstadoAcceso() {
    var configuracionAdulto = window.NIDO.servicios.configuracionAdulto;
    var dispositivo = window.NIDO.servicios.dispositivo;

    // 1. Si la instalación no está configurada.
    if (!configuracionAdulto.estaConfigurado()) {
      return 'sin_configurar';
    }

    // 2. Si no hay estudiante habitual asociado.
    if (!dispositivo.tieneEstudianteHabitual()) {
      return 'configurado_sin_estudiante';
    }

    // 3. Si hay estudiante habitual pero el estudiante ya no existe (referencia huérfana).
    var estudiante = dispositivo.obtenerEstudianteHabitual();
    if (!estudiante) {
      return 'configurado_sin_estudiante';
    }

    // 4. Hay adulto configurador y estudiante habitual válido.
    return 'configurado_con_estudiante';
  }

  /**
   * Indica si el estudiante puede acceder directamente a su espacio.
   * @returns {boolean} True si la instalación está configurada y tiene estudiante habitual válido.
   */
  function puedeAccederEstudiante() {
    return obtenerEstadoAcceso() === 'configurado_con_estudiante';
  }

  /**
   * Obtiene el estudiante habitual de acceso (delegando al servicio de dispositivo).
   * @returns {Object|null} El estudiante habitual o null si no existe.
   */
  function obtenerEstudianteDeAcceso() {
    var dispositivo = window.NIDO.servicios.dispositivo;
    return dispositivo.obtenerEstudianteHabitual();
  }

  /**
   * Obtiene el Adulto Responsable configurador de esta instalación.
   * @returns {Object|null} El adulto configurador o null si no existe.
   */
  function obtenerAdultoDeAcceso() {
    var configuracionAdulto = window.NIDO.servicios.configuracionAdulto;
    return configuracionAdulto.obtenerAdultoConfigurador();
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.acceso = {
    obtenerEstadoAcceso: obtenerEstadoAcceso,
    puedeAccederEstudiante: puedeAccederEstudiante,
    obtenerEstudianteDeAcceso: obtenerEstudianteDeAcceso,
    obtenerAdultoDeAcceso: obtenerAdultoDeAcceso
  };
})();