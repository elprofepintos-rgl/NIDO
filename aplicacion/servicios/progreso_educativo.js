/**
 * Servicio: Progreso Educativo
 *
 * Gestiona el estado persistente del recorrido educativo de NIDO.
 * Conecta el modelo declarativo (aplicacion/modelos/recorrido_educativo.js)
 * con el estado persistido del estudiante.
 *
 * Responsabilidades:
 * - Obtener el recorrido educativo.
 * - Determinar el nivel actual del estudiante.
 * - Marcar niveles completados.
 * - Desbloquear niveles secuencialmente.
 * - Registrar recompensas obtenidas.
 * - Detectar áreas completadas.
 *
 * Este servicio utiliza EXCLUSIVAMENTE los servicios existentes:
 * - window.NIDO.modelos (catálogo de recorridos)
 * - window.NIDO.servicios.almacenamiento (persistencia)
 */

(function () {
  'use strict';

  var RECORRIDO_PRINCIPAL = 'jugamos_a_medir';

  /**
   * Obtiene el recorrido educativo principal.
   * @returns {Object|null} El recorrido o null si no existe.
   */
  function obtenerRecorrido() {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerRecorridoPorId(RECORRIDO_PRINCIPAL);
  }

  /**
   * Obtiene el estado persistido del progreso educativo.
   * @returns {Object} Objeto con el estado del progreso.
   */
  function obtenerEstado() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var estado = almacenamiento.obtenerEstadoProgreso();
    return estado || {};
  }

  /**
   * Guarda el estado persistido del progreso educativo.
   * @param {Object} estado - Objeto con el estado del progreso.
   */
  function guardarEstado(estado) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    almacenamiento.guardarEstadoProgreso(estado);
  }

  /**
   * Obtiene todos los niveles del recorrido en orden secuencial.
   * @returns {Array} Lista de niveles ordenados.
   */
  function obtenerNiveles() {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerNivelesDelRecorrido(RECORRIDO_PRINCIPAL);
  }

  /**
   * Obtiene un nivel por su id.
   * @param {string} nivelId - Id del nivel.
   * @returns {Object|null} El nivel o null si no existe.
   */
  function obtenerNivel(nivelId) {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerNivelPorId(RECORRIDO_PRINCIPAL, nivelId);
  }

  /**
   * Indica si un nivel fue completado.
   * @param {string} nivelId - Id del nivel.
   * @returns {boolean} True si el nivel fue completado.
   */
  function nivelCompletado(nivelId) {
    var estado = obtenerEstado();
    return Boolean(estado.niveles && estado.niveles[nivelId] && estado.niveles[nivelId].completado);
  }

  /**
   * Indica si un nivel está desbloqueado.
   * El primer nivel siempre está desbloqueado.
   * Los siguientes se desbloquean al completar el anterior.
   * @param {string} nivelId - Id del nivel.
   * @returns {boolean} True si el nivel está desbloqueado.
   */
  function nivelDesbloqueado(nivelId) {
    var niveles = obtenerNiveles();
    if (niveles.length === 0) {
      return false;
    }

    // El primer nivel siempre está desbloqueado.
    if (niveles[0].id === nivelId) {
      return true;
    }

    // Buscar el nivel anterior en la secuencia.
    for (var i = 1; i < niveles.length; i++) {
      if (niveles[i].id === nivelId) {
        return nivelCompletado(niveles[i - 1].id);
      }
    }

    return false;
  }

  /**
   * Obtiene el nivel actual del estudiante.
   * Es el primer nivel no completado que está desbloqueado.
   * @returns {Object|null} El nivel actual o null si todos están completados.
   */
  function obtenerNivelActual() {
    var niveles = obtenerNiveles();

    for (var i = 0; i < niveles.length; i++) {
      if (!nivelCompletado(niveles[i].id)) {
        return niveles[i];
      }
    }

    return null;
  }

  /**
   * Obtiene el siguiente nivel pendiente después de uno completado.
   * @param {string} nivelId - Id del nivel completado.
   * @returns {Object|null} El siguiente nivel o null si no hay más.
   */
  function obtenerSiguienteNivel(nivelId) {
    var niveles = obtenerNiveles();

    for (var i = 0; i < niveles.length; i++) {
      if (niveles[i].id === nivelId) {
        return niveles[i + 1] || null;
      }
    }

    return null;
  }

  /**
   * Marca un nivel como completado y registra su recompensa.
   * @param {string} nivelId - Id del nivel.
   */
  function completarNivel(nivelId) {
    var nivel = obtenerNivel(nivelId);
    if (!nivel) {
      throw new Error('El nivel "' + nivelId + '" no existe en el recorrido.');
    }

    var estado = obtenerEstado();
    if (!estado.niveles) {
      estado.niveles = {};
    }
    if (!estado.recompensas) {
      estado.recompensas = {};
    }

    // Registrar el nivel como completado.
    estado.niveles[nivelId] = {
      completado: true,
      fecha_completado: new Date().toISOString()
    };

    // Registrar la recompensa del nivel.
    if (nivel.recompensa) {
      var recompensaId = nivel.recompensa.identificador || nivelId;
      if (!estado.recompensas[recompensaId]) {
        estado.recompensas[recompensaId] = {
          tipo: nivel.recompensa.tipo,
          cantidad: nivel.recompensa.cantidad,
          fecha_obtenida: new Date().toISOString()
        };
      }
    }

    // Registrar el recorrido como iniciado.
    estado.recorrido_iniciado = true;

    guardarEstado(estado);
  }

  /**
   * Indica si el recorrido fue iniciado.
   * @returns {boolean} True si el recorrido fue iniciado.
   */
  function recorridoIniciado() {
    var estado = obtenerEstado();
    return Boolean(estado.recorrido_iniciado);
  }

  /**
   * Indica si un área del recorrido fue completada.
   * @param {string} areaId - Id del área.
   * @returns {boolean} True si todos los niveles del área están completados.
   */
  function areaCompletada(areaId) {
    var modelos = window.NIDO.modelos;
    var area = modelos.obtenerAreaPorId(RECORRIDO_PRINCIPAL, areaId);

    if (!area || area.niveles.length === 0) {
      return false;
    }

    for (var i = 0; i < area.niveles.length; i++) {
      if (!nivelCompletado(area.niveles[i].id)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Obtiene las recompensas obtenidas por el estudiante.
   * @returns {Object} Objeto con las recompensas obtenidas.
   */
  function obtenerRecompensas() {
    var estado = obtenerEstado();
    return estado.recompensas || {};
  }

  /**
   * Obtiene el estado completo del progreso para diagnóstico.
   * @returns {Object} Estado completo del progreso.
   */
  function obtenerEstadoCompleto() {
    return obtenerEstado();
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.progresoEducativo = {
    obtenerRecorrido: obtenerRecorrido,
    obtenerNiveles: obtenerNiveles,
    obtenerNivel: obtenerNivel,
    obtenerNivelActual: obtenerNivelActual,
    obtenerSiguienteNivel: obtenerSiguienteNivel,
    nivelCompletado: nivelCompletado,
    nivelDesbloqueado: nivelDesbloqueado,
    completarNivel: completarNivel,
    recorridoIniciado: recorridoIniciado,
    areaCompletada: areaCompletada,
    obtenerRecompensas: obtenerRecompensas,
    obtenerEstadoCompleto: obtenerEstadoCompleto
  };
})();