/**
 * Servicio: Configuración del Adulto Responsable
 *
 * Establece la base de la configuración inicial del Adulto Responsable
 * en ESTA instalación de NIDO.
 *
 * La identidad del Adulto Responsable pertenece al modelo (aplicacion/modelos/adulto_responsable.js)
 * y se representa mediante su `id` permanente. Este servicio NO crea una identidad
 * paralela ni duplica el perfil.
 *
 * La configuración local (clave nido:configuracion) conserva únicamente la referencia
 * local al adulto que configuró esta instalación (adulto_id) y el estado de configuración.
 *
 * Este servicio utiliza EXCLUSIVAMENTE el servicio de almacenamiento
 * (window.NIDO.servicios.almacenamiento). No accede a localStorage directamente.
 *
 * Las colecciones de identidad (nido:adultos) son almacenamiento local PROVISIONAL,
 * no constituyen una fuente de verdad multiplataforma.
 */

(function () {
  'use strict';

  /**
   * Obtiene el Adulto Responsable que configuró esta instalación.
   * Lee nido:configuracion, obtiene adulto_id y lo busca en la colección nido:adultos.
   * @returns {Object|null} El Adulto Responsable o null si no existe.
   */
  function obtenerAdultoConfigurador() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var configuracion = almacenamiento.obtenerConfiguracion();

    if (!configuracion || !configuracion.adulto_id) {
      return null;
    }

    var adultos = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.adultos);
    if (!adultos) {
      return null;
    }

    for (var i = 0; i < adultos.length; i++) {
      if (adultos[i].id === configuracion.adulto_id) {
        return adultos[i];
      }
    }

    return null;
  }

  /**
   * Indica si esta instalación ya tiene una configuración inicial de Adulto Responsable.
   * @returns {boolean} True si la instalación está configurada.
   */
  function estaConfigurado() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var configuracion = almacenamiento.obtenerConfiguracion();
    return Boolean(configuracion && configuracion.configurado === true);
  }

  /**
   * Configura el Adulto Responsable de esta instalación.
   * Crea el adulto mediante el modelo, lo guarda en la colección local nido:adultos
   * y actualiza la configuración local (nido:configuracion) con la referencia al id del adulto.
   * @param {Object} datos - Datos del adulto.
   * @param {string} datos.nombre - Nombre o seudónimo del adulto (obligatorio).
   * @returns {Object} El Adulto Responsable creado.
   */
  function configurarAdultoResponsable(datos) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var modelos = window.NIDO.modelos;

    if (!datos || !datos.nombre) {
      throw new Error('El nombre del adulto responsable es obligatorio.');
    }

    // 1. Crear el Adulto Responsable mediante el modelo (genera su id permanente).
    var adulto = modelos.crearAdultoResponsable({ nombre: datos.nombre });

    // 2. Guardar el adulto en la colección local provisional nido:adultos.
    var adultos = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.adultos) || [];
    adultos.push(adulto);
    almacenamiento.guardarColeccion(almacenamiento.CLAVES.adultos, adultos);

    // 3. Actualizar la configuración local de esta instalación.
    //    La referencia al adulto se guarda SOLO mediante su id (adulto_id).
    var configuracion = almacenamiento.obtenerConfiguracion();
    var configuracionActualizada;

    if (configuracion && modelos.marcarConfigurado) {
      configuracionActualizada = modelos.marcarConfigurado(configuracion, {
        rol_principal: 'adulto',
        adulto_id: adulto.id
      });
    } else {
      // Si no existe configuración o el modelo no está disponible, se crea una básica.
      configuracionActualizada = modelos.crearConfiguracionLocal
        ? modelos.marcarConfigurado(modelos.crearConfiguracionLocal(), {
            rol_principal: 'adulto',
            adulto_id: adulto.id
          })
        : {
            configurado: true,
            rol_principal: 'adulto',
            adulto_id: adulto.id,
            estudiante_habitual_id: null,
            fecha_actualizacion: new Date().toISOString()
          };
    }

    almacenamiento.guardarConfiguracion(configuracionActualizada);

    return adulto;
  }

  /**
   * Obtiene la configuración local actual de esta instalación.
   * @returns {Object|null} Configuración local de esta instalación.
   */
  function obtenerConfiguracionInstalacion() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    return almacenamiento.obtenerConfiguracion();
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.configuracionAdulto = {
    obtenerAdultoConfigurador: obtenerAdultoConfigurador,
    estaConfigurado: estaConfigurado,
    configurarAdultoResponsable: configurarAdultoResponsable,
    obtenerConfiguracionInstalacion: obtenerConfiguracionInstalacion
  };
})();