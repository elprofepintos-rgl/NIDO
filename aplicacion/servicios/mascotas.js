/**
 * Servicio: Gestión de Mascotas
 *
 * Permite al estudiante elegir su mascota compañera y persistir
 * la asignación en su perfil (mascota_id).
 *
 * La identidad de la mascota pertenece al catálogo (aplicacion/modelos/mascota.js).
 * El estudiante conserva únicamente la referencia por id (mascota_id).
 *
 * Este servicio utiliza EXCLUSIVAMENTE los servicios existentes:
 * - window.NIDO.servicios.almacenamiento (persistencia)
 * - window.NIDO.servicios.estudiantes (acceso al estudiante)
 * - window.NIDO.modelos (catálogo de mascotas)
 */

(function () {
  'use strict';

  /**
   * Obtiene el catálogo de mascotas disponibles.
   * @returns {Array} Lista de mascotas disponibles.
   */
  function obtenerCatalogo() {
    var modelos = window.NIDO.modelos;
    return modelos.obtenerCatalogoMascotas();
  }

  /**
   * Asigna una mascota al estudiante habitual de este dispositivo.
   * Valida que la mascota exista en el catálogo y que el estudiante exista.
   * @param {string} mascotaId - Id de la mascota elegida.
   * @returns {Object} El estudiante actualizado con su mascota asignada.
   */
  function asignarMascotaAlEstudiante(mascotaId) {
    var almacenamiento = window.NIDO.servicios.almacenamiento;
    var estudiantes = window.NIDO.servicios.estudiantes;
    var dispositivo = window.NIDO.servicios.dispositivo;
    var modelos = window.NIDO.modelos;

    // 1. Validar que la mascota exista en el catálogo.
    var mascota = modelos.obtenerMascotaPorId(mascotaId);
    if (!mascota) {
      throw new Error('La mascota elegida no existe en el catálogo.');
    }

    // 2. Obtener el estudiante habitual de este dispositivo.
    var estudiante = dispositivo.obtenerEstudianteHabitual();
    if (!estudiante) {
      throw new Error('No se puede asignar una mascota porque no existe un estudiante habitual.');
    }

    // 3. Actualizar el campo mascota_id del estudiante.
    estudiante.mascota_id = mascotaId;
    estudiante.fecha_actualizacion = new Date().toISOString();

    // 4. Persistir el estudiante actualizado en la colección local.
    var listaEstudiantes = almacenamiento.obtenerColeccion(almacenamiento.CLAVES.estudiantes) || [];
    var actualizado = false;

    for (var i = 0; i < listaEstudiantes.length; i++) {
      if (listaEstudiantes[i].id === estudiante.id) {
        listaEstudiantes[i] = estudiante;
        actualizado = true;
        break;
      }
    }

    if (!actualizado) {
      throw new Error('No se pudo actualizar el estudiante en la colección local.');
    }

    almacenamiento.guardarColeccion(almacenamiento.CLAVES.estudiantes, listaEstudiantes);

    return estudiante;
  }

  /**
   * Obtiene la mascota asignada al estudiante habitual de este dispositivo.
   * @returns {Object|null} La mascota asignada o null si no tiene.
   */
  function obtenerMascotaDelEstudiante() {
    var dispositivo = window.NIDO.servicios.dispositivo;
    var modelos = window.NIDO.modelos;

    var estudiante = dispositivo.obtenerEstudianteHabitual();
    if (!estudiante || !estudiante.mascota_id) {
      return null;
    }

    return modelos.obtenerMascotaPorId(estudiante.mascota_id);
  }

  /**
   * Indica si el estudiante habitual ya tiene una mascota asignada.
   * @returns {boolean} True si el estudiante tiene mascota.
   */
  function tieneMascota() {
    var dispositivo = window.NIDO.servicios.dispositivo;
    var estudiante = dispositivo.obtenerEstudianteHabitual();
    return Boolean(estudiante && estudiante.mascota_id);
  }

  // ------------------------------------------------------------
  // Exposición global para la aplicación PWA
  // ------------------------------------------------------------
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.mascotas = {
    obtenerCatalogo: obtenerCatalogo,
    asignarMascotaAlEstudiante: asignarMascotaAlEstudiante,
    obtenerMascotaDelEstudiante: obtenerMascotaDelEstudiante,
    tieneMascota: tieneMascota
  };
})();