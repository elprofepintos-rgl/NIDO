/**
 * Motor de Escenas de NIDO
 *
 * Scene Engine: único responsable de mostrar una aventura.
 * Interpreta secuencias de eventos declarativos y actualiza la interfaz.
 *
 * El motor NO conoce el contenido pedagógico.
 * Las aventuras (aplicacion/datos/escenas.js) solo describen qué ocurre.
 *
 * Los eventos soportados:
 * - dialogar: Muestra el texto de Pipo en el globo y avanza solo.
 * - mostrar_objeto / ocultar_objeto: Controla el objeto visible.
 * - preguntar: Muestra una pregunta con opciones. UNICO evento que espera interacción.
 * - celebrar: Muestra celebración y avanza solo.
 * - recompensar: Muestra recompensa y avanza solo.
 * - terminar_aventura: Notifica al orquestador que terminó.
 *
 * El motor controla automáticamente el avance de todos los eventos narrativos.
 * Los diálogos se escriben progresivamente (letra por letra) y avanzan
 * después de una pequeña pausa natural. Solo los eventos de pregunta
 * detienen el flujo para esperar la interacción del estudiante.
 *
 * Preparado para futura integración con voz, sincronización labial
 * y narración de Pipo: la duración de la escritura puede ajustarse
 * a la duración de la narración.
 */

(function () {
  'use strict';

  /**
   * @typedef {Object} Opcion
   * @property {string} id - Identificador único de la opción.
   * @property {string} texto - Texto visible de la opción.
   * @property {string} [icono] - Emoji o icono visible.
   */

  /**
   * @typedef {Object} Escena
   * @property {string} titulo - Título de la aventura.
   * @property {Array<Object>} secuencia - Eventos de la aventura.
   */

  // Configuración del motor.
  var VELOCIDAD_ESCRITURA = 28; // milisegundos por carácter
  var PAUSA_NATURAL = 900; // pausa después de terminar la escritura
  var PAUSA_OBJETO = 1200; // pausa después de mostrar/ocultar un objeto

  var zonas = null;
  var aventuraActual = null;
  var indiceEvento = 0;
  var temporizadorEscritura = null;
  var llamadaAlFinalizar = null;

  /**
   * Busca y guarda las zonas del DOM de la escena.
   */
  function obtenerZonas() {
    if (zonas) {
      return zonas;
    }

    zonas = {
      contenedor: document.getElementById('pantalla-escena'),
      pipo: document.getElementById('escena-pipo'),
      imagenPipo: document.getElementById('escena-imagen-pipo'),
      objeto: document.getElementById('escena-objeto'),
      globo: document.getElementById('escena-globo'),
      pregunta: document.getElementById('escena-pregunta'),
      opciones: document.getElementById('escena-opciones'),
      recompensa: document.getElementById('escena-recompensa'),
      botonAccion: document.getElementById('escena-boton-accion')
    };

    return zonas;
  }

  /**
   * Muestra una zona y oculta las demás de la lista.
   * @param {Element} elemento - Zona a mostrar.
   * @param {Array<Element>} todas - Todas las zonas.
   */
  function mostrarZona(elemento, todas) {
    todas.forEach(function (zona) {
      if (zona && zona !== elemento) {
        zona.classList.add('oculto');
        zona.setAttribute('aria-hidden', 'true');
      }
    });

    if (elemento) {
      elemento.classList.remove('oculto');
      elemento.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * Cancela cualquier escritura progresiva en curso.
   */
  function cancelarEscritura() {
    if (temporizadorEscritura) {
      clearInterval(temporizadorEscritura);
      temporizadorEscritura = null;
    }
  }

  /**
   * Escribe texto progresivamente en el globo de diálogo.
   * @param {string} texto - Texto completo a mostrar.
   * @param {Function} alCompletar - Callback al terminar de escribir.
   */
  function escribirTextoProgresivo(texto, alCompletar) {
    var z = obtenerZonas();
    cancelarEscritura();

    z.globo.textContent = '';
    var indice = 0;
    var longitud = texto.length;

    // Mostrar el globo mientras se escribe.
    mostrarZona(z.globo, [z.globo, z.pregunta, z.opciones, z.recompensa, z.botonAccion]);
    z.botonAccion.classList.add('oculto');

    // Si el texto es muy corto, mostrarlo directamente con escritura rápida.
    var velocidad = longitud <= 3 ? 1 : VELOCIDAD_ESCRITURA;

    temporizadorEscritura = setInterval(function () {
      indice++;
      z.globo.textContent = texto.substring(0, indice);

      if (indice >= longitud) {
        cancelarEscritura();
        if (alCompletar) {
          alCompletar();
        }
      }
    }, velocidad);
  }

  /**
   * Muestra el globo de diálogo con escritura progresiva y avance automático.
   * @param {string} texto - Texto a mostrar.
   * @param {Function} [despuesDeEscritura] - Callback opcional al terminar escritura.
   */
  function mostrarDialogo(texto, despuesDeEscritura) {
    escribirTextoProgresivo(texto, function () {
      // Pausa natural breve y luego continuar automáticamente.
      setTimeout(function () {
        if (despuesDeEscritura) {
          despuesDeEscritura();
        } else {
          avanzar();
        }
      }, PAUSA_NATURAL);
    });
  }

  /**
   * Muestra u oculta el objeto principal de la escena.
   * @param {string|null} objeto - Emoji o texto del objeto, o null para ocultarlo.
   */
  function mostrarObjeto(objeto) {
    var z = obtenerZonas();
    if (objeto) {
      z.objeto.textContent = objeto;
      z.objeto.classList.remove('oculto');
      z.objeto.setAttribute('aria-hidden', 'false');
    } else {
      z.objeto.classList.add('oculto');
      z.objeto.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Muestra la pregunta con sus opciones.
   * Este es el ÚNICO evento que detiene el flujo esperando interacción.
   * @param {Object} evento - Evento de pregunta.
   */
  function mostrarPregunta(evento) {
    var z = obtenerZonas();
    cancelarEscritura();
    z.pregunta.textContent = evento.texto;

    // Limpiar opciones anteriores.
    z.opciones.innerHTML = '';

    if (evento.opciones) {
      evento.opciones.forEach(function (opcion) {
        var boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'opcion-instrumento';
        boton.dataset.opcion = opcion.id;
        boton.setAttribute('role', 'option');
        boton.setAttribute('aria-label', opcion.texto);

        boton.innerHTML =
          '<span class="icono-instrumento" aria-hidden="true">' + (opcion.icono || '') + '</span>' +
          '<span class="nombre-instrumento">' + opcion.texto + '</span>';

        boton.addEventListener('click', function () {
          manejarRespuesta(boton, opcion, evento);
        });

        z.opciones.appendChild(boton);
      });
    }

    mostrarZona(z.pregunta, [z.globo, z.pregunta, z.opciones, z.recompensa, z.botonAccion]);
    z.botonAccion.classList.add('oculto');
  }

  /**
   * Maneja la respuesta del estudiante.
   * @param {HTMLButtonElement} boton - Botón seleccionado.
   * @param {Opcion} opcion - Opción seleccionada.
   * @param {Object} evento - Evento de pregunta.
   */
  function manejarRespuesta(boton, opcion, evento) {
    var z = obtenerZonas();

    // Evitar multiple clic mientras se procesa.
    var opciones = Array.prototype.slice.call(z.opciones.children);
    opciones.forEach(function (op) {
      op.disabled = true;
    });

    var correcto = opcion.id === evento.correcta;

    if (correcto) {
      boton.classList.add('opcion-correcta');
      mostrarMensaje('¡Muy bien! 🎉');

      var secuenciaCorrecta = evento.responder_correcto || [];

      if (secuenciaCorrecta.length === 0) {
        // Si no hay eventos de respuesta, avanzar.
        setTimeout(function () {
          avanzar();
        }, 1200);
        return;
      }

      // Ejecutar la secuencia de respuesta correcta (avance automático).
      setTimeout(function () {
        ejecutarSubsecuencia(secuenciaCorrecta, 0, function () {
          // Continuar con la secuencia principal.
          avanzar();
        });
      }, 800);
    } else {
      boton.classList.add('opcion-intento');
      mostrarMensaje('Casi... Probemos otra vez.');

      // Re-habilitar opciones para reintentar.
      setTimeout(function () {
        opciones.forEach(function (op) {
          op.disabled = false;
        });
        boton.classList.remove('opcion-intento');
        // Ocultar el mensaje temporal.
        z.globo.classList.add('oculto');
        z.globo.textContent = '';
      }, 1200);
    }
  }

  /**
   * Muestra un mensaje temporal de devolución.
   * @param {string} texto - Mensaje a mostrar.
   */
  function mostrarMensaje(texto) {
    var z = obtenerZonas();
    z.globo.textContent = texto;
    z.globo.classList.remove('oculto');
    z.globo.setAttribute('aria-hidden', 'false');
    z.botonAccion.classList.add('oculto');
  }

  /**
   * Ejecuta una subsecuencia de eventos (responder_correcto / responder_incorrecto).
   * Todos los eventos avanzan automáticamente (escritura + pausa).
   * @param {Array<Object>} subsecuencia - Eventos a ejecutar.
   * @param {number} indice - Índice actual.
   * @param {Function} alTerminar - Callback al terminar.
   */
  function ejecutarSubsecuencia(subsecuencia, indice, alTerminar) {
    if (indice >= subsecuencia.length) {
      if (alTerminar) {
        alTerminar();
      }
      return;
    }

    var evento = subsecuencia[indice];

    switch (evento.tipo) {
      case 'dialogar':
        mostrarDialogo(evento.texto, function () {
          ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        });
        break;

      case 'mostrar_objeto':
        mostrarObjeto(evento.objeto);
        setTimeout(function () {
          ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        }, PAUSA_OBJETO);
        break;

      case 'ocultar_objeto':
        mostrarObjeto(null);
        setTimeout(function () {
          ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        }, PAUSA_OBJETO);
        break;

      case 'celebrar':
        mostrarDialogo(evento.texto, function () {
          ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        });
        break;

      case 'recompensar':
        mostrarDialogo(evento.texto, function () {
          ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        });
        break;

      default:
        ejecutarSubsecuencia(subsecuencia, indice + 1, alTerminar);
        break;
    }
  }

  /**
   * Procesa el evento actual de la secuencia.
   */
  function procesarEvento() {
    var z = obtenerZonas();
    var secuencia = aventuraActual.secuencia;
    var evento = secuencia[indiceEvento];

    if (!evento) {
      return;
    }

    // El botón de acción nunca se muestra para eventos narrativos.
    z.botonAccion.classList.add('oculto');

    switch (evento.tipo) {
      case 'dialogar':
        mostrarDialogo(evento.texto);
        break;

      case 'mostrar_objeto':
        mostrarObjeto(evento.objeto);
        setTimeout(function () {
          avanzar();
        }, PAUSA_OBJETO);
        break;

      case 'ocultar_objeto':
        mostrarObjeto(null);
        setTimeout(function () {
          avanzar();
        }, PAUSA_OBJETO);
        break;

      case 'preguntar':
        mostrarPregunta(evento);
        break;

      case 'celebrar':
        mostrarDialogo(evento.texto);
        break;

      case 'recompensar':
        mostrarDialogo(evento.texto);
        break;

      case 'terminar_aventura':
        finalizarAventura(evento.siguiente);
        break;

      default:
        console.warn('NIDO: evento de escena desconocido: ' + evento.tipo);
        avanzar();
        break;
    }
  }

  /**
   * Avanza al siguiente evento de la secuencia.
   */
  function avanzar() {
    cancelarEscritura();
    indiceEvento++;
    if (indiceEvento < aventuraActual.secuencia.length) {
      procesarEvento();
    } else {
      finalizarAventura(null);
    }
  }

  /**
   * Finaliza la aventura actual.
   * @param {string|null} siguienteAventura - Id de la siguiente aventura o null.
   */
  function finalizarAventura(siguienteAventura) {
    cancelarEscritura();
    var z = obtenerZonas();
    z.botonAccion.classList.add('oculto');

    if (llamadaAlFinalizar) {
      var alFinalizar = llamadaAlFinalizar;
      llamadaAlFinalizar = null;
      alFinalizar(siguienteAventura);
    }
  }

  /**
   * Inicia una aventura dentro del contenedor de la escena.
   * @param {Element} contenedor - Elemento contenedor.
   * @param {Object} aventura - Aventura declarativa.
   * @param {string} rutaEscena - Ruta del HTML de la escena.
   * @param {Function} alFinalizar - Callback al finalizar la aventura.
   */
  function iniciarAventura(contenedor, aventura, rutaEscena, alFinalizar) {
    aventuraActual = aventura;
    indiceEvento = 0;
    zonas = null;
    llamadaAlFinalizar = alFinalizar;
    cancelarEscritura();

    // Cargar la pantalla de escena si es necesario.
    if (contenedor.innerHTML.indexOf('pantalla-escena') === -1) {
      fetch(rutaEscena)
        .then(function (respuesta) {
          if (!respuesta.ok) {
            throw new Error('No se pudo cargar la escena.');
          }
          return respuesta.text();
        })
        .then(function (html) {
          contenedor.innerHTML = html;
          var z = obtenerZonas();
          // Configurar la imagen de Pipo.
          var mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
          if (z.imagenPipo && mascota && mascota.imagen) {
            z.imagenPipo.src = mascota.imagen;
            z.imagenPipo.alt = mascota.nombre;
          }
          procesarEvento();
        })
        .catch(function (error) {
          console.error('NIDO: error al cargar la escena.', error);
          if (alFinalizar) {
            alFinalizar(null);
          }
        });
    } else {
      // La escena ya está cargada: reiniciar zonas.
      var z = obtenerZonas();
      var mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
      if (z.imagenPipo && mascota && mascota.imagen) {
        z.imagenPipo.src = mascota.imagen;
        z.imagenPipo.alt = mascota.nombre;
      }
      // Limpiar y comenzar.
      z.globo.textContent = '';
      z.pregunta.textContent = '';
      z.opciones.innerHTML = '';
      z.recompensa.textContent = '';
      z.objeto.textContent = '';
      z.objeto.classList.add('oculto');
      procesarEvento();
    }
  }

  // Exposición global para la aplicación PWA.
  window.NIDO = window.NIDO || {};
  window.NIDO.servicios = window.NIDO.servicios || {};
  window.NIDO.servicios.motorEscenas = {
    iniciarAventura: iniciarAventura
  };
})();