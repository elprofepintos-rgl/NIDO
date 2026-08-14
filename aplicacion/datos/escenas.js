/**
 * Repositorio de Escenas de Aventura
 *
 * Contiene las aventuras de NIDO como secuencias de eventos declarativos.
 * Cada aventura es una escena compuesta por una secuencia de eventos.
 *
 * Los eventos NO controlan la interfaz:
 * - dialogar: Pipo habla (texto).
 * - mostrar_objeto: Muestra el objeto de la escena.
 * - ocultar_objeto: Oculta el objeto.
 * - preguntar: Muestra una pregunta con opciones.
 * - responder_correcto: Eventos al responder correctamente.
 * - responder_incorrecto: Eventos al responder incorrectamente.
 * - celebrar: Celebración de logro.
 * - recompensar: Entrega de recompensa.
 * - terminar_aventura: Finaliza la aventura.
 *
 * El motor interpreta esta secuencia y actualiza la interfaz.
 */

(function () {
  'use strict';

  var AVENTURAS = {
    masa_manzana: {
      titulo: 'Descubrimos la masa de la manzana',
      secuencia: [
        { tipo: 'dialogar', texto: '¡Mirá esta manzana!' },
        { tipo: 'mostrar_objeto', objeto: '🍎' },
        { tipo: 'dialogar', texto: '¿Descubrimos su masa?' },
        {
          tipo: 'preguntar',
          texto: '¿Con qué podemos medir la masa de una manzana?',
          opciones: [
            { id: 'silla', texto: 'Silla', icono: '🪑' },
            { id: 'balanza', texto: 'Balanza', icono: '⚖️' },
            { id: 'reloj', texto: 'Reloj', icono: '⌚' }
          ],
          correcta: 'balanza',
          responder_correcto: [
            { tipo: 'dialogar', texto: '¡Muy bien! 🎉' },
            { tipo: 'dialogar', texto: 'La masa de las cosas se mide con una balanza.' }
          ],
          responder_incorrecto: [
            { tipo: 'dialogar', texto: 'Casi... Probemos otra vez.' }
          ]
        },
        { tipo: 'celebrar', texto: '¡Lo descubrimos juntos!' },
        { tipo: 'recompensar', texto: '⭐ ¡Descubrimiento conseguido!' },
        { tipo: 'terminar_aventura', siguiente: 'masa_banana' }
      ]
    },

    masa_banana: {
      titulo: 'Descubrimos la masa de la banana',
      secuencia: [
        { tipo: 'dialogar', texto: '¡Mirá esta banana!' },
        { tipo: 'mostrar_objeto', objeto: '🍌' },
        { tipo: 'dialogar', texto: '¿Descubrimos su masa?' },
        {
          tipo: 'preguntar',
          texto: '¿Con qué podemos conocer la masa de la banana?',
          opciones: [
            { id: 'balanza', texto: 'Balanza', icono: '⚖️' },
            { id: 'regla', texto: 'Regla', icono: '📏' },
            { id: 'termometro', texto: 'Termómetro', icono: '🌡️' }
          ],
          correcta: 'balanza',
          responder_correcto: [
            { tipo: 'dialogar', texto: '¡Muy bien! 🎉' },
            { tipo: 'dialogar', texto: 'La masa de la banana se conoce usando una balanza.' }
          ],
          responder_incorrecto: [
            { tipo: 'dialogar', texto: 'Casi... Probemos otra vez.' }
          ]
        },
        { tipo: 'celebrar', texto: '¡Lo descubrimos juntos!' },
        { tipo: 'recompensar', texto: '⭐ ¡Descubrimiento conseguido!' },
        { tipo: 'terminar_aventura', siguiente: 'masa_naranja' }
      ]
    },

    masa_naranja: {
      titulo: 'Descubrimos la masa de la naranja',
      secuencia: [
        { tipo: 'dialogar', texto: '¡Mirá esta naranja!' },
        { tipo: 'mostrar_objeto', objeto: '🍊' },
        { tipo: 'dialogar', texto: '¿Descubrimos su masa?' },
        {
          tipo: 'preguntar',
          texto: '¿Cuál podemos usar para conocer la masa de la naranja?',
          opciones: [
            { id: 'balanza', texto: 'Balanza', icono: '⚖️' },
            { id: 'lupa', texto: 'Lupa', icono: '🔍' },
            { id: 'vaso', texto: 'Vaso', icono: '🥛' }
          ],
          correcta: 'balanza',
          responder_correcto: [
            { tipo: 'dialogar', texto: '¡Muy bien! 🎉' },
            { tipo: 'dialogar', texto: 'La masa de la naranja se conoce usando una balanza.' }
          ],
          responder_incorrecto: [
            { tipo: 'dialogar', texto: 'Casi... Probemos otra vez.' }
          ]
        },
        { tipo: 'celebrar', texto: '¡Lo descubrimos juntos!' },
        { tipo: 'recompensar', texto: '⭐ ¡Descubrimiento conseguido!' },
        { tipo: 'terminar_aventura', siguiente: 'masa_mochila' }
      ]
    },

    masa_mochila: {
      titulo: 'Descubrimos la masa de la mochila',
      secuencia: [
        { tipo: 'dialogar', texto: '¡Mirá esta mochila!' },
        { tipo: 'mostrar_objeto', objeto: '🎒' },
        { tipo: 'dialogar', texto: '¿Descubrimos su masa?' },
        {
          tipo: 'preguntar',
          texto: '¿Qué hacemos para conocer la masa de la mochila?',
          opciones: [
            { id: 'balanza', texto: 'Ponerla en la balanza', icono: '⚖️' },
            { id: 'mirar', texto: 'Mirarla', icono: '👀' },
            { id: 'escuchar', texto: 'Escucharla', icono: '👂' }
          ],
          correcta: 'balanza',
          responder_correcto: [
            { tipo: 'dialogar', texto: '¡Muy bien! 🎉' },
            { tipo: 'dialogar', texto: 'La masa de la mochila se conoce poniéndola en la balanza.' }
          ],
          responder_incorrecto: [
            { tipo: 'dialogar', texto: 'Casi... Probemos otra vez.' }
          ]
        },
        { tipo: 'celebrar', texto: '¡Lo descubrimos juntos!' },
        { tipo: 'recompensar', texto: '⭐ ¡Descubrimiento conseguido!' },
        { tipo: 'terminar_aventura', siguiente: 'masa_pelota' }
      ]
    },

    masa_pelota: {
      titulo: 'Descubrimos la masa de la pelota',
      secuencia: [
        { tipo: 'dialogar', texto: '¡Mirá esta pelota!' },
        { tipo: 'mostrar_objeto', objeto: '⚽' },
        { tipo: 'dialogar', texto: '¿Descubrimos su masa?' },
        {
          tipo: 'preguntar',
          texto: '¿Qué instrumento usamos para conocer la masa de la pelota?',
          opciones: [
            { id: 'balanza', texto: 'Balanza', icono: '⚖️' },
            { id: 'cinta', texto: 'Cinta métrica', icono: '📏' },
            { id: 'reloj', texto: 'Reloj', icono: '⏱️' }
          ],
          correcta: 'balanza',
          responder_correcto: [
            { tipo: 'dialogar', texto: '¡Muy bien! 🎉' },
            { tipo: 'dialogar', texto: 'La masa de la pelota se conoce usando una balanza.' }
          ],
          responder_incorrecto: [
            { tipo: 'dialogar', texto: 'Casi... Probemos otra vez.' }
          ]
        },
        { tipo: 'celebrar', texto: '¡Descubrimos muchas cosas sobre la masa!' },
        { tipo: 'recompensar', texto: '⭐ ¡Descubrimiento conseguido!' },
        { tipo: 'terminar_aventura', siguiente: null }
      ]
    }
  };

  /**
   * Obtiene una aventura por su id.
   * @param {string} id - Id de la aventura.
   * @returns {Object|null} La aventura o null si no existe.
   */
  function obtenerAventura(id) {
    return AVENTURAS[id] || null;
  }

  /**
   * Obtiene el id de la siguiente aventura.
   * @param {string} id - Id de la aventura actual.
   * @returns {string|null} Id de la siguiente aventura o null si es la última.
   */
  function obtenerSiguienteAventura(id) {
    var aventura = obtenerAventura(id);
    if (!aventura) {
      return null;
    }
    var ultima = aventura.secuencia[aventura.secuencia.length - 1];
    return ultima && ultima.siguiente ? ultima.siguiente : null;
  }

  // Exposición global para la aplicación PWA.
  window.NIDO = window.NIDO || {};
  window.NIDO.datos = window.NIDO.datos || {};
  window.NIDO.datos.escenas = {
    obtenerAventura: obtenerAventura,
    obtenerSiguienteAventura: obtenerSiguienteAventura
  };
})();