/**
 * Servicio: Gestión de Estudiantes
 *
 * Establece la base para registrar y conservar localmente a los estudiantes
 * asociados al Adulto Responsable que configuró esta instalación de NIDO.
 *
 * La identidad del Estudiante pertenece al modelo (aplicacion/modelos/estudiante.js)
 * y se representa mediante su `id` permanente. Este servicio NO crea un segundo
 * identificador: el `id` proviene exclusivamente del modelo.
 *
 * La colección nido:estudiantes es un almacenamiento local PROVISIONAL,
 * no una fuente de verdad multiplataforma.
 *
 * Relaciones mantenidas (según 04_Modelo_Datos_NIDO.md):
 *   AdultoResponsable → estudiantes (ids)
 *   Estudiante → adultos_responsables (ids)
 *
 * Este servicio utiliza EXCLUSIVAMENTE el servicio de almacenamiento
 * (window.NIDO.servicios.almacenamiento). No accede a localStorage directamente.
 */

(function () {
  'use strict';

  /**
   * Crea un estudiante y lo asocia al Adulto Responsable configurador.
   * Actualiza de forma coherente ambas colecciones locales:
   * nido:estudiantes (agrega el estudiante) y nido:adultos (agrega el id del estudiante al adulto).
   * @param {Object} datos - Datos del estudiante.
   * @param {string} datos.nombre - Nombre o alias del estudiante (obligatorio).
   * @returns {Object} El estudiante creado con su id permanente.
   */
  function crearEstudiante(datos) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var configuracionAdulto = window.NIDO.servicios.configuracionAdulto;
    var modelos = window.NIDO.modelos;

    // 1. Validar que exista un Adulto Responsable configurador.
    var adulto = configuracionAdulto.obtenerAdultoConfigurador();
    if (!adulto) {
      throw new Error('No se puede crear un estudiante porque no existe un Adulto Responsable configurador.');
    }

    if (!datos || !datos.nombre) {
      throw new Error('El nombre del estudiante es obligatorio.');
    }

    // 2. Crear el estudiante mediante el modelo (genera su id permanente).
    var estudiante = modelos.crearEstudiante({
      nombre: datos.nombre,
      avatar: datos.avatar,
      nivelInicial: datos.nivelInicial,
      accesibilidad: datos.accesibilidad
    });

    // 3. Establecer la relación bidireccional Adulto ↔ Estudiante.
    estudiante.adultos_responsables.push(adulto.id);
    adulto.estudiantes.push(estudiante.id);

    // 4. Persistir el estudiante en nido:estudiantes (colección local provisional).
    var estudiantes = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.estudiantes) || [];

    // 4a. Evitar duplicación: si el id ya existe, se aborta.
    for (var i = 0; i < estudiantes.length; i++) {
      if (estudiantes[i].id === estudiante.id) {
        throw new Error('El estudiante ya existe en la colección local.');
      }
    }

    estudiantes.push(estudiante);
    almacenamiento.guardarColeccion(almacenamiento.CLAVES.estudiantes, estudiantes);

    // 5. Actualizar el adulto en nido:adultos (colección local provisional).
    var adultos = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.adultos) || [];
    var adultosActualizados = false;

    for (var j = 0; j < adultos.length; j++) {
      if (adultos[j].id === adulto.id) {
        adultos[j] = adulto;
        adultosActualizados = true;
        break;
      }
    }

    if (!adultosActualizados) {
      // No debería ocurrir (el adulto fue obtenido de esta misma colección),
      // pero por robustez se informa el error y se detiene la operación.
      throw new Error('No se pudo actualizar el Adulto Responsable en la colección local.');
    }

    almacenamiento.guardarColeccion(almacenamiento.CLAVES.adultos, adultos);

    return estudiante;
  }

  /**
   * Obtiene la lista de estudiantes asociados al Adulto Responsable configurador.
   * @returns {Array} Lista de estudiantes del adulto configurador.
   */
  function obtenerEstudiantesDelAdulto() {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var configuracionAdulto = window.NIDO.servicios.configuracionAdulto;

    var adulto = configuracionAdulto.obtenerAdultoConfigurador();
    if (!adulto) {
      return [];
    }

    var estudiantes = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.estudiantes) || [];
    var resultado = [];
    var idsDelAdulto = adulto.estudiantes || [];

    for (var i = 0; i < estudiantes.length; i++) {
      if (idsDelAdulto.indexOf(estudiantes[i].id) !== -1) {
        resultado.push(estudiantes[i]);
      }
    }

    return resultado;
  }

  /**
   * Busca un estudiante por su id en la colección local nido:estudiantes.
   * @param {string} id - Id del estudiante.
   * @returns {Object|null} El estudiante o null si no existe.
   */
  function obtenerEstudiantePorId(id) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;

    if (!id) {
      return null;
    }

    var estudiantes = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.estudiantes) || [];

    for (var i = 0; i < estudiantes.length; i++) {
      if (estudiantes[i].id === id) {
        return estudiantes[i];
      }
    }

    return null;
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.estudiantes = {
    crearEstudiante: crearEstudiante,
    obtenerEstudiantesDelAdulto: obtenerEstudiantesDelAdulto,
    obtenerEstudiantePorId: obtenerEstudiantePorId
  };
})();