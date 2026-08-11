/**
 * Servicio: Gestión de Aventuras
 *
 * Orquesta el catálogo de aventuras educativas de NIDO.
 * Conecta el modelo declarativo (aplicacion/modelos/aventura.js)
 * con el estado persistido del estudiante (aventura iniciada/completada).
 *
 * Este servicio utiliza EXCLUSIVAMENTE los servicios existentes:
 * - window.NIDO.modelos (catálogo de aventuras)
 * - window.NIDO.servicios.almacenamiento (persistencia)
 */

(function () {
  'use strict';

  /**
   * Obtiene el catálogo de aventuras disponibles.
   * @returns {Array} Lista de aventuras disponibles.
   */
  function obtenerCatalogo() {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerCatalogoAventuras();
  }

  /**
   * Obtiene una aventura por su id.
   * @param {string} id - Id de la aventura.
   * @returns {Object|null} La aventura o null si no existe.
   */
  function obtenerAventura(id) {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerAventuraPorId(id);
  }

  /**
   * Indica si una aventura está disponible para jugar.
   * @param {string} id - Id de la aventura.
   * @returns {boolean} True si la aventura existe y está disponible.
   */
  function estaDisponible(id) {
    var aventura = obtenerAventura(id);
    return Boolean(aventura && aventura.disponible);
  }

  /**
   * Obtiene el estado persistido de las aventuras del estudiante.
   * @returns {Object} Objeto con el estado de las aventuras.
   */
  function obtenerEstado() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var estado = almacenamiento.obtenerEstadoAventuras();
    return estado || {};
  }

  /**
   * Guarda el estado persistido de las aventuras del estudiante.
   * @param {Object} estado - Objeto con el estado de las aventuras.
   */
  function guardarEstado(estado) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    almacenamiento.guardarEstadoAventuras(estado);
  }

  /**
   * Marca una aventura como iniciada.
   * @param {string} id - Id de la aventura.
   */
  function iniciarAventura(id) {
    if (!estaDisponible(id)) {
      throw new Error('La aventura "' + id + '" no está disponible.');
    }

    var estado = obtenerEstado();
    if (!estado[id]) {
      estado[id] = {};
    }
    estado[id].iniciada = true;
    estado[id].fecha_inicio = estado[id].fecha_inicio || new Date().toISOString();
    guardarEstado(estado);
  }

  /**
   * Marca una aventura como completada.
   * @param {string} id - Id de la aventura.
   */
  function completarAventura(id) {
    if (!estaDisponible(id)) {
      throw new Error('La aventura "' + id + '" no está disponible.');
    }

    var estado = obtenerEstado();
    if (!estado[id]) {
      estado[id] = {};
    }
    estado[id].iniciada = true;
    estado[id].completada = true;
    estado[id].fecha_inicio = estado[id].fecha_inicio || new Date().toISOString();
    estado[id].fecha_completada = new Date().toISOString();
    guardarEstado(estado);
  }

  /**
   * Indica si una aventura fue iniciada por el estudiante.
   * @param {string} id - Id de la aventura.
   * @returns {boolean} True si la aventura fue iniciada.
   */
  function fueIniciada(id) {
    var estado = obtenerEstado();
    return Boolean(estado[id] && estado[id].iniciada);
  }

  /**
   * Indica si una aventura fue completada por el estudiante.
   * @param {string} id - Id de la aventura.
   * @returns {boolean} True si la aventura fue completada.
   */
  function fueCompletada(id) {
    var estado = obtenerEstado();
    return Boolean(estado[id] && estado[id].completada);
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.aventuras = {
    obtenerCatalogo: obtenerCatalogo,
    obtenerAventura: obtenerAventura,
    estaDisponible: estaDisponible,
    iniciarAventura: iniciarAventura,
    completarAventura: completarAventura,
    fueIniciada: fueIniciada,
    fueCompletada: fueCompletada
  };
})();