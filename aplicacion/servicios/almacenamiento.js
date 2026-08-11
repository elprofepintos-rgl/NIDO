/**
 * Servicio: Almacenamiento local de NIDO
 *
 * Capa única de acceso a localStorage para los datos de NIDO.
 * Ningún otro código debería utilizar localStorage directamente
 * para manejar los datos de la aplicación.
 *
 * Arquitectura:
 *   Modelos
 *      ↓
 *   Servicio de almacenamiento
 *      ↓
 *   localStorage (actualmente)
 *      ↓
 *   IndexedDB o almacenamiento remoto (futuro)
 *
 * Este servicio NO contiene lógica de negocio de usuarios,
 * autenticación, sincronización ni servidor.
 *
 * IMPORTANTE:
 * Las claves de identidad (nido:adultos, nido:estudiantes, nido:docentes)
 * son colecciones locales PROVISIONALES. No constituyen una fuente de
 * verdad multiplataforma. La identidad permanente pertenece a cada modelo
 * mediante su id único (UUID).
 */

(function () {
  'use strict';

  // ------------------------------------------------------------
  // Claves oficiales del contrato
  // ------------------------------------------------------------
  var CLAVES = {
    configuracion: 'nido:configuracion',
    dispositivo: 'nido:dispositivo',
    adultos: 'nido:adultos',
    estudiantes: 'nido:estudiantes',
    docentes: 'nido:docentes',
    presentacion: 'nido:presentacion',
    aventuras: 'nido:aventuras',
    progreso: 'nido:progreso'
  };

  /**
   * Verifica si localStorage está disponible en el entorno actual.
   * @returns {boolean} True si localStorage está disponible.
   */
  function localStorageDisponible() {
    try {
      var prueba = '__nido_prueba__';
      window.localStorage.setItem(prueba, '1');
      window.localStorage.removeItem(prueba);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Lee una clave de localStorage y deserializa su JSON.
   * @param {string} clave - Clave a leer.
   * @returns {*} Objeto deserializado o null si no existe.
   */
  function leerClave(clave) {
    if (!localStorageDisponible()) {
      throw new Error('localStorage no está disponible en este entorno.');
    }

    var texto;
    try {
      texto = window.localStorage.getItem(clave);
    } catch (error) {
      throw new Error('No se pudo leer la clave "' + clave + '" de localStorage.');
    }

    if (texto === null) {
      return null; // Dato inexistente
    }

    try {
      return JSON.parse(texto);
    } catch (error) {
      // JSON inválido: se elimina la clave corrupta y se devuelve null.
      try {
        window.localStorage.removeItem(clave);
      } catch (ignore) {
        // Si no se puede eliminar, se continúa devolviendo null.
      }
      console.warn('NIDO: se encontró un dato inválido en la clave "' + clave + '". Se eliminó y se tratará como inexistente.');
      return null;
    }
  }

  /**
   * Serializa y escribe un valor en localStorage.
   * @param {string} clave - Clave donde guardar.
   * @param {*} valor - Valor a guardar (se serializa a JSON).
   */
  function escribirClave(clave, valor) {
    if (!localStorageDisponible()) {
      throw new Error('localStorage no está disponible en este entorno.');
    }

    var texto;
    try {
      texto = JSON.stringify(valor);
    } catch (error) {
      throw new Error('El valor no se pudo serializar para la clave "' + clave + '".');
    }

    try {
      window.localStorage.setItem(clave, texto);
    } catch (error) {
      throw new Error('No se pudo guardar la clave "' + clave + '" en localStorage.');
    }
  }

  /**
   * Elimina una clave de localStorage.
   * @param {string} clave - Clave a eliminar.
   */
  function eliminarClave(clave) {
    if (!localStorageDisponible()) {
      throw new Error('localStorage no está disponible en este entorno.');
    }

    try {
      window.localStorage.removeItem(clave);
    } catch (error) {
      throw new Error('No se pudo eliminar la clave "' + clave + '" de localStorage.');
    }
  }

  // ------------------------------------------------------------
  // Configuración local
  // ------------------------------------------------------------

  /**
   * Guarda la configuración local de esta instalación.
   * @param {Object} configuracion - Objeto de configuración local.
   */
  function guardarConfiguracion(configuracion) {
    escribirClave(CLAVES.configuracion, configuracion);
  }

  /**
   * Obtiene la configuración local de esta instalación.
   * @returns {Object|null} Configuración local o null si no existe.
   */
  function obtenerConfiguracion() {
    return leerClave(CLAVES.configuracion);
  }

  /**
   * Elimina la configuración local de esta instalación.
   */
  function eliminarConfiguracion() {
    eliminarClave(CLAVES.configuracion);
  }

  // ------------------------------------------------------------
  // Asociación del dispositivo
  // ------------------------------------------------------------

  /**
   * Guarda la asociación local del dispositivo.
   * @param {Object} dispositivo - Objeto Dispositivo (asociación local).
   */
  function guardarDispositivo(dispositivo) {
    escribirClave(CLAVES.dispositivo, dispositivo);
  }

  /**
   * Obtiene la asociación local del dispositivo.
   * @returns {Object|null} Dispositivo o null si no existe.
   */
  function obtenerDispositivo() {
    return leerClave(CLAVES.dispositivo);
  }

  /**
   * Elimina la asociación local del dispositivo.
   */
  function eliminarDispositivo() {
    eliminarClave(CLAVES.dispositivo);
  }

  // ------------------------------------------------------------
  // Presentación inicial de NIDO
  // ------------------------------------------------------------

  /**
   * Guarda el estado de la presentación inicial de NIDO.
   * @param {Object} presentacion - Objeto con el estado de la presentación.
   */
  function guardarPresentacion(presentacion) {
    escribirClave(CLAVES.presentacion, presentacion);
  }

  /**
   * Obtiene el estado de la presentación inicial de NIDO.
   * @returns {Object|null} Estado de la presentación o null si no existe.
   */
  function obtenerPresentacion() {
    return leerClave(CLAVES.presentacion);
  }

  /**
   * Elimina el estado de la presentación inicial de NIDO.
   */
  function eliminarPresentacion() {
    eliminarClave(CLAVES.presentacion);
  }

  // ------------------------------------------------------------
  // Estado de aventuras
  // ------------------------------------------------------------

  /**
   * Guarda el estado de las aventuras del estudiante.
   * @param {Object} estado - Objeto con el estado de las aventuras.
   */
  function guardarEstadoAventuras(estado) {
    escribirClave(CLAVES.aventuras, estado);
  }

  /**
   * Obtiene el estado de las aventuras del estudiante.
   * @returns {Object|null} Estado de las aventuras o null si no existe.
   */
  function obtenerEstadoAventuras() {
    return leerClave(CLAVES.aventuras);
  }

  /**
   * Elimina el estado de las aventuras del estudiante.
   */
  function eliminarEstadoAventuras() {
    eliminarClave(CLAVES.aventuras);
  }

  // ------------------------------------------------------------
  // Progreso educativo
  // ------------------------------------------------------------

  /**
   * Guarda el estado del progreso educativo del estudiante.
   * @param {Object} estado - Objeto con el estado del progreso.
   */
  function guardarEstadoProgreso(estado) {
    escribirClave(CLAVES.progreso, estado);
  }

  /**
   * Obtiene el estado del progreso educativo del estudiante.
   * @returns {Object|null} Estado del progreso o null si no existe.
   */
  function obtenerEstadoProgreso() {
    return leerClave(CLAVES.progreso);
  }

  /**
   * Elimina el estado del progreso educativo del estudiante.
   */
  function eliminarEstadoProgreso() {
    eliminarClave(CLAVES.progreso);
  }

  // ------------------------------------------------------------
  // Colecciones locales (provisionales)
  // ------------------------------------------------------------
  // Estas colecciones NO son la fuente de verdad multiplataforma.

  /**
   * Valida que la clave recibida sea una clave oficial de colección.
   * Las colecciones solo pueden ser: nido:adultos, nido:estudiantes, nido:docentes.
   * @param {string} claveColeccion - Clave de la colección.
   * @returns {string} La clave si es válida.
   */
  function validarClaveColeccion(claveColeccion) {
    var clavesPermitidas = [
      CLAVES.adultos,
      CLAVES.estudiantes,
      CLAVES.docentes
    ];

    if (clavesPermitidas.indexOf(claveColeccion) === -1) {
      throw new Error('La clave de colección "' + claveColeccion + '" no está permitida. Solo se admiten: nido:adultos, nido:estudiantes, nido:docentes.');
    }

    return claveColeccion;
  }

  /**
   * Guarda una colección local bajo una clave oficial.
   * @param {string} claveColeccion - Clave oficial de la colección.
   * @param {Array} lista - Lista de elementos de la colección.
   */
  function guardarColeccion(claveColeccion, lista) {
    if (!lista || !Array.isArray(lista)) {
      throw new Error('La colección "' + claveColeccion + '" debe ser un array.');
    }
    escribirClave(validarClaveColeccion(claveColeccion), lista);
  }

  /**
   * Obtiene una colección local bajo una clave oficial.
   * @param {string} claveColeccion - Clave oficial de la colección.
   * @returns {Array|null} Lista de la colección o null si no existe.
   */
  function obtenerColeccion(claveColeccion) {
    var lista = leerClave(validarClaveColeccion(claveColeccion));
    if (lista === null) {
      return null;
    }
    if (!Array.isArray(lista)) {
      console.warn('NIDO: la colección "' + claveColeccion + '" no es un array. Se devuelve null.');
      return null;
    }
    return lista;
  }

  /**
   * Elimina una colección local bajo una clave oficial.
   * @param {string} claveColeccion - Clave oficial de la colección.
   */
  function eliminarColeccion(claveColeccion) {
    eliminarClave(validarClaveColeccion(claveColeccion));
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------

  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.almacenamiento = {
    CLAVES: CLAVES,
    guardarConfiguracion: guardarConfiguracion,
    obtenerConfiguracion: obtenerConfiguracion,
    eliminarConfiguracion: eliminarConfiguracion,
    guardarDispositivo: guardarDispositivo,
    obtenerDispositivo: obtenerDispositivo,
    eliminarDispositivo: eliminarDispositivo,
    guardarPresentacion: guardarPresentacion,
    obtenerPresentacion: obtenerPresentacion,
    eliminarPresentacion: eliminarPresentacion,
    guardarEstadoAventuras: guardarEstadoAventuras,
    obtenerEstadoAventuras: obtenerEstadoAventuras,
    eliminarEstadoAventuras: eliminarEstadoAventuras,
    guardarEstadoProgreso: guardarEstadoProgreso,
    obtenerEstadoProgreso: obtenerEstadoProgreso,
    eliminarEstadoProgreso: eliminarEstadoProgreso,
    guardarColeccion: guardarColeccion,
    obtenerColeccion: obtenerColeccion,
    eliminarColeccion: eliminarColeccion
  };
})();