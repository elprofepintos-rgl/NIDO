/**
 * Aplicación: Orquestador principal de NIDO
 *
 * Etapa 3 — Pasos 8 a 12: configuración inicial, elección de mascota, Mi NIDO y primer encuentro.
 *
 * Este orquestador:
 * - Carga las pantallas (inicio.html / configuracion_inicial.html / eleccion_mascota.html / mi_nido.html / primer_encuentro.html) mediante fetch.
 * - Consulta el estado de acceso mediante window.NIDO.servicios.acceso.
 * - Al seleccionar "Adulto responsable" carga la pantalla de configuración inicial.
 * - Completa el flujo local: adulto responsable → estudiante → estudiante habitual.
 * - Permite al estudiante elegir su mascota compañera.
 * - Muestra el espacio personal Mi NIDO con el estudiante y su mascota.
 * - Presenta el primer encuentro con Pipo y la primera actividad educativa (la manzana).
 * - No implementa autenticación, Cuenta NIDO, juego ni modo docente.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const contenedorApp = document.getElementById('app');

  if (!contenedorApp) {
    console.error('NIDO: no se encontró el contenedor principal de la aplicación.');
    return;
  }

  const RUTA_PRESENTACION = 'aplicacion/pantallas/presentacion_nido.html';
  const RUTA_INICIO = 'aplicacion/pantallas/inicio.html';
  const RUTA_CONFIGURACION_INICIAL = 'aplicacion/pantallas/configuracion_inicial.html';
  const RUTA_ELECCION_MASCOTA = 'aplicacion/pantallas/eleccion_mascota.html';
  const RUTA_MI_NIDO = 'aplicacion/pantallas/mi_nido.html';
  const RUTA_AVENTURAS = 'aplicacion/pantallas/aventuras.html';
  const RUTA_PRIMER_ENCUENTRO = 'aplicacion/pantallas/primer_encuentro.html';
  const RUTA_ACTIVIDAD_BANANA = 'aplicacion/pantallas/actividad_banana.html';
  const RUTA_ACTIVIDAD_NARANJA = 'aplicacion/pantallas/actividad_naranja.html';
  const RUTA_ACTIVIDAD_MOCHILA = 'aplicacion/pantallas/actividad_mochila.html';
  const RUTA_ACTIVIDAD_PELOTA = 'aplicacion/pantallas/actividad_pelota.html';

  /**
   * Muestra un mensaje básico cuando una pantalla no se puede cargar.
   * @param {string} texto - Mensaje comprensible para la persona usuaria.
   */
  const mostrarPantallaDeFalla = (texto) => {
    contenedorApp.innerHTML =
      '<section class="pantalla bienvenida"><div class="tarjeta-bienvenida"><h1>NIDO</h1><p>' +
      texto +
      '</p></div></section>';
  };

  /**
   * Carga una pantalla HTML dentro del contenedor principal.
   * @param {string} ruta - Ruta de la pantalla.
   */
  const cargarPantalla = async (ruta) => {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar la pantalla ${ruta}: ${respuesta.status}`);
    }
    contenedorApp.innerHTML = await respuesta.text();
  };

  /**
   * Muestra una sección y oculta las demás de la lista indicada.
   * @param {Element|null} pantalla - Sección a mostrar.
   * @param {Array<Element|null>} pantallas - Todas las secciones de la pantalla actual.
   */
  const mostrarSeccion = (pantalla, pantallas) => {
    pantallas.forEach((elemento) => {
      if (elemento) {
        elemento.classList.add('oculto');
        elemento.setAttribute('aria-hidden', 'true');
      }
    });

    if (pantalla) {
      pantalla.classList.remove('oculto');
      pantalla.setAttribute('aria-hidden', 'false');
    }
  };

  // ------------------------------------------------------------
  // Pantalla de configuración inicial (Paso 8)
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla de configuración inicial y su flujo local completo.
   */
  const prepararConfiguracionInicial = () => {
    const pantallaFormulario = document.getElementById('pantalla-configuracion-inicial');
    const pantallaExitosa = document.getElementById('pantalla-configuracion-exitosa');
    const formulario = document.getElementById('formulario-configuracion-inicial');
    const campoNombreAdulto = document.getElementById('campo-nombre-adulto');
    const campoNombreEstudiante = document.getElementById('campo-nombre-estudiante');
    const mensajeError = document.getElementById('mensaje-error-configuracion');
    const botonConfirmar = document.getElementById('boton-confirmar-configuracion');
    const botonVolver = document.getElementById('boton-volver-configuracion');
    const botonContinuar = document.getElementById('boton-continuar-configuracion');
    const textoExitoso = document.getElementById('texto-configuracion-exitosa');

    const pantallas = [pantallaFormulario, pantallaExitosa];

    const limpiarError = () => {
      if (mensajeError) {
        mensajeError.textContent = '';
        mensajeError.classList.add('oculto');
      }
    };

    /**
     * Informa un error de manera comprensible y registra el detalle técnico.
     * @param {string} texto - Mensaje para la persona usuaria.
     * @param {Error} [error] - Error técnico original.
     */
    const informarError = (texto, error) => {
      if (error) {
        console.error('NIDO: error en la configuración inicial.', error);
      }
      if (mensajeError) {
        mensajeError.textContent = texto;
        mensajeError.classList.remove('oculto');
      }
      if (botonConfirmar) {
        botonConfirmar.disabled = false;
      }
    };

    if (botonVolver) {
      botonVolver.addEventListener('click', () => {
        iniciarPantallaInicio();
      });
    }

    if (botonContinuar) {
      botonContinuar.addEventListener('click', () => {
        iniciarEleccionMascota();
      });
    }

    if (!formulario || !campoNombreAdulto || !campoNombreEstudiante) {
      console.error('NIDO: la pantalla de configuración inicial no está completa.');
      return;
    }

    campoNombreAdulto.focus();

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      limpiarError();

      const nombreAdulto = campoNombreAdulto.value.trim();
      const nombreEstudiante = campoNombreEstudiante.value.trim();

      if (!nombreAdulto) {
        informarError('Escribí el nombre del adulto responsable para continuar.');
        campoNombreAdulto.focus();
        return;
      }

      if (!nombreEstudiante) {
        informarError('Escribí el nombre del estudiante para continuar.');
        campoNombreEstudiante.focus();
        return;
      }

      if (botonConfirmar) {
        botonConfirmar.disabled = true;
      }

      const servicios = window.NIDO && window.NIDO.servicios;

      if (
        !servicios ||
        !servicios.configuracionAdulto ||
        !servicios.estudiantes ||
        !servicios.dispositivo ||
        !servicios.acceso
      ) {
        informarError(
          'No se pudo completar la configuración porque NIDO no está listo. Volvé a abrir la aplicación.',
          new Error('Los servicios de NIDO no están disponibles.')
        );
        return;
      }

      let adulto = null;
      let estudiante = null;

      // 1. Configurar el Adulto Responsable de esta instalación.
      try {
        servicios.configuracionAdulto.configurarAdultoResponsable({ nombre: nombreAdulto });
        adulto = servicios.configuracionAdulto.obtenerAdultoConfigurador();
      } catch (error) {
        informarError('No se pudo guardar el nombre del adulto responsable. Intentá de nuevo.', error);
        return;
      }

      if (!adulto) {
        informarError(
          'No se pudo guardar el nombre del adulto responsable. Intentá de nuevo.',
          new Error('No se obtuvo el adulto configurador luego de configurarlo.')
        );
        return;
      }

      // 2. Crear el primer estudiante asociado al adulto configurador.
      try {
        estudiante = servicios.estudiantes.crearEstudiante({ nombre: nombreEstudiante });
      } catch (error) {
        informarError('No se pudo crear el estudiante. Intentá de nuevo.', error);
        return;
      }

      if (!estudiante || !estudiante.id) {
        informarError(
          'No se pudo crear el estudiante. Intentá de nuevo.',
          new Error('El estudiante creado no tiene un id válido.')
        );
        return;
      }

      // 3. Asociar el estudiante como habitual de este dispositivo.
      try {
        servicios.dispositivo.asociarEstudianteHabitual(estudiante.id);
      } catch (error) {
        informarError('No se pudo asociar el estudiante a este dispositivo. Intentá de nuevo.', error);
        return;
      }

      // 4. Verificar el estado de acceso resultante.
      let estadoAcceso = null;
      try {
        estadoAcceso = servicios.acceso.obtenerEstadoAcceso();
      } catch (error) {
        informarError('No se pudo verificar la configuración de este dispositivo.', error);
        return;
      }

      if (estadoAcceso !== 'configurado_con_estudiante') {
        informarError(
          'La configuración no quedó completa en este dispositivo.',
          new Error(`Estado de acceso inesperado: ${estadoAcceso}`)
        );
        return;
      }

      // 5. Confirmación clara del proceso completado.
      if (textoExitoso) {
        textoExitoso.textContent = `${adulto.nombre}, la configuración inicial se completó. ${estudiante.nombre} ya está registrado en este dispositivo.`;
      }
      mostrarSeccion(pantallaExitosa, pantallas);
    });
  };

  /**
   * Carga la pantalla de configuración inicial.
   */
  const iniciarConfiguracionInicial = async () => {
    try {
      await cargarPantalla(RUTA_CONFIGURACION_INICIAL);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la pantalla de configuración inicial.');
      return;
    }
    prepararConfiguracionInicial();
  };

  // ------------------------------------------------------------
  // Pantalla de elección de mascota (Paso 9)
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla de elección de mascota.
   * Muestra el catálogo de mascotas y gestiona la selección y confirmación.
   */
  const prepararEleccionMascota = () => {
    const pantallaEleccion = document.getElementById('pantalla-eleccion-mascota');
    const pantallaConfirmacion = document.getElementById('pantalla-confirmacion-mascota');
    const listaMascotas = document.getElementById('lista-mascotas');
    const mensajeError = document.getElementById('mensaje-error-mascota');
    const botonVolver = document.getElementById('boton-volver-mascota');
    const botonConfirmar = document.getElementById('boton-confirmar-mascota');
    const botonCambiar = document.getElementById('boton-cambiar-mascota');
    const zonaMascotaConfirmacion = document.getElementById('zona-mascota-confirmacion');
    const textoConfirmacion = document.getElementById('texto-confirmacion-mascota');

    const pantallas = [pantallaEleccion, pantallaConfirmacion];

    let mascotaSeleccionada = null;

    const limpiarError = () => {
      if (mensajeError) {
        mensajeError.textContent = '';
        mensajeError.classList.add('oculto');
      }
    };

    const informarError = (texto, error) => {
      if (error) {
        console.error('NIDO: error en la elección de mascota.', error);
      }
      if (mensajeError) {
        mensajeError.textContent = texto;
        mensajeError.classList.remove('oculto');
      }
    };

    const mostrarConfirmacion = (mascota) => {
      if (zonaMascotaConfirmacion) {
        zonaMascotaConfirmacion.innerHTML =
          '<div class="mascota-reservada">' +
          '<img src="' + mascota.imagen + '" alt="' + mascota.nombre + '" ' +
          'style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />' +
          '</div>';
      }
      if (textoConfirmacion) {
        textoConfirmacion.textContent =
          mascota.nombre + ' es ' + mascota.especie + '. ' + mascota.personalidad + '.';
      }
      mostrarSeccion(pantallaConfirmacion, pantallas);
    };

    // Renderizar el catálogo de mascotas.
    if (listaMascotas) {
      const catalogo = window.NIDO.servicios.mascotas.obtenerCatalogo();

      if (!catalogo || catalogo.length === 0) {
        informarError('No hay mascotas disponibles en este momento.');
      } else {
        catalogo.forEach((mascota) => {
          const tarjeta = document.createElement('button');
          tarjeta.type = 'button';
          tarjeta.className = 'opcion-mascota';
          tarjeta.setAttribute('role', 'option');
          tarjeta.setAttribute('aria-label', mascota.nombre + ': ' + mascota.personalidad);

          tarjeta.innerHTML =
            '<div class="mascota-miniatura">' +
            '<img src="' + mascota.imagen + '" alt="' + mascota.nombre + '" ' +
            'style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />' +
            '</div>' +
            '<div class="mascota-info">' +
            '<span class="titulo-opcion">' + mascota.nombre + '</span>' +
            '<span class="descripcion-opcion">' + mascota.especie + '</span>' +
            '<span class="descripcion-opcion">' + mascota.personalidad + '</span>' +
            '</div>';

          tarjeta.addEventListener('click', () => {
            limpiarError();
            mascotaSeleccionada = mascota;
            mostrarConfirmacion(mascota);
          });

          listaMascotas.appendChild(tarjeta);
        });
      }
    }

    if (botonVolver) {
      botonVolver.addEventListener('click', () => {
        iniciarPantallaInicio();
      });
    }

    if (botonCambiar) {
      botonCambiar.addEventListener('click', () => {
        limpiarError();
        mascotaSeleccionada = null;
        mostrarSeccion(pantallaEleccion, pantallas);
      });
    }

    if (botonConfirmar) {
      botonConfirmar.addEventListener('click', () => {
        limpiarError();

        if (!mascotaSeleccionada) {
          informarError('Elegí una mascota para continuar.');
          return;
        }

        try {
          window.NIDO.servicios.mascotas.asignarMascotaAlEstudiante(mascotaSeleccionada.id);
        } catch (error) {
          informarError('No se pudo guardar tu mascota. Intentá de nuevo.', error);
          return;
        }

        // Confirmación final: la mascota quedó asignada y se avanza a Mi NIDO.
        if (textoConfirmacion) {
          textoConfirmacion.textContent =
            '¡' + mascotaSeleccionada.nombre + ' ya es tu compañero! ' +
            'Estará con vos en cada aventura.';
        }
        if (botonConfirmar) {
          botonConfirmar.textContent = '¡Listo!';
          botonConfirmar.disabled = true;
        }
        if (botonCambiar) {
          botonCambiar.classList.add('oculto');
        }

        // Navegar a Mi NIDO después de la confirmación.
        setTimeout(() => {
          iniciarMiNido();
        }, 1200);
      });
    }
  };

  /**
   * Carga la pantalla de elección de mascota.
   */
  const iniciarEleccionMascota = async () => {
    try {
      await cargarPantalla(RUTA_ELECCION_MASCOTA);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la pantalla de elección de mascota.');
      return;
    }
    prepararEleccionMascota();
  };

  // ------------------------------------------------------------
  // Pantalla Mi NIDO (Paso 10)
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla Mi NIDO con los datos del estudiante habitual
   * y su mascota asignada.
   */
  const prepararMiNido = () => {
    const saludo = document.getElementById('saludo-mi-nido');
    const imagenPipo = document.getElementById('imagen-pipo');
    const mensajePipo = document.getElementById('mensaje-pipo');
    const botonAventuras = document.getElementById('boton-aventuras');
    const botonVolver = document.getElementById('boton-volver-mi-nido');

    // 1. Obtener el estudiante habitual mediante el servicio de acceso.
    const estudiante = window.NIDO.servicios.acceso.obtenerEstudianteDeAcceso();
    if (!estudiante) {
      console.error('NIDO: no se encontró el estudiante habitual para Mi NIDO.');
      mostrarPantallaDeFalla('No se pudo cargar tu espacio. Volvé a abrir la aplicación.');
      return;
    }

    // 2. Saludo personalizado.
    if (saludo) {
      saludo.textContent = '¡Hola, ' + estudiante.nombre + '!';
    }

    // 3. Obtener la mascota asignada mediante el servicio de mascotas.
    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    if (imagenPipo) {
      if (mascota && mascota.imagen) {
        imagenPipo.src = mascota.imagen;
        imagenPipo.alt = mascota.nombre;
      } else {
        imagenPipo.alt = 'Mascota de NIDO';
      }
    }

    // 4. Mensaje de acompañamiento de la mascota.
    if (mensajePipo) {
      mensajePipo.textContent = mascota
        ? '¡Qué bueno verte! ' + mascota.nombre + ' te acompaña.'
        : '¡Qué bueno verte!';
    }

    if (botonAventuras) {
      botonAventuras.addEventListener('click', () => {
        iniciarAventuras();
      });
    }

    if (botonVolver) {
      botonVolver.addEventListener('click', () => {
        iniciarPantallaInicio();
      });
    }
  };

  /**
   * Carga la pantalla Mi NIDO.
   */
  const iniciarMiNido = async () => {
    try {
      await cargarPantalla(RUTA_MI_NIDO);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar tu espacio Mi NIDO.');
      return;
    }
    prepararMiNido();
  };

  // ------------------------------------------------------------
  // Pantalla: Aventuras
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla de Aventuras.
   * Muestra el recorrido educativo con sus áreas y niveles disponibles.
   */
  const prepararAventuras = () => {
    const pantallaAventuras = document.getElementById('pantalla-aventuras');
    const listaAventuras = document.getElementById('lista-aventuras');
    const imagenPipoAventuras = document.getElementById('imagen-pipo-aventuras');
    const mensajePipoAventuras = document.getElementById('mensaje-pipo-aventuras');
    const botonVolver = document.getElementById('boton-volver-mi-nido-aventuras');

    if (!pantallaAventuras || !listaAventuras) {
      console.error('NIDO: la pantalla de aventuras no está completa.');
      mostrarPantallaDeFalla('No se pudo cargar las aventuras.');
      return;
    }

    // 1. Obtener la mascota asignada para acompañar visualmente.
    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    if (imagenPipoAventuras && imagenMascota) {
      imagenPipoAventuras.src = imagenMascota;
      imagenPipoAventuras.alt = nombreMascota;
    }

    if (mensajePipoAventuras) {
      mensajePipoAventuras.textContent = nombreMascota + ' te espera para descubrir algo nuevo.';
    }

    // 2. Obtener el recorrido educativo.
    const recorrido = window.NIDO.servicios.progresoEducativo.obtenerRecorrido();

    if (!recorrido) {
      const mensaje = document.createElement('p');
      mensaje.className = 'mensaje-pipo';
      mensaje.textContent = 'Todavía no hay aventuras disponibles.';
      listaAventuras.appendChild(mensaje);
    } else {
      // 3. Renderizar cada área del recorrido con sus niveles.
      recorrido.areas.forEach((area) => {
        // Solo mostrar áreas que tienen niveles definidos.
        if (!area.niveles || area.niveles.length === 0) {
          return;
        }

        const areaCompletada = window.NIDO.servicios.progresoEducativo.areaCompletada(area.id);

        const contenedorArea = document.createElement('div');
        contenedorArea.className = 'area-recorrido';

        const encabezadoArea = document.createElement('div');
        encabezadoArea.className = 'encabezado-area';
        encabezadoArea.innerHTML =
          '<span class="icono-aventura" aria-hidden="true">' + area.icono + '</span>' +
          '<span class="info-aventura">' +
          '<span class="titulo-aventura">' + area.nombre + '</span>' +
          '<span class="descripcion-aventura">' + area.descripcion + '</span>' +
          (areaCompletada
            ? '<span class="indicador-aventura">Completada</span>'
            : '') +
          '</span>';
        contenedorArea.appendChild(encabezadoArea);

        // Renderizar los niveles del área.
        area.niveles.forEach((nivel) => {
          const completado = window.NIDO.servicios.progresoEducativo.nivelCompletado(nivel.id);
          const desbloqueado = window.NIDO.servicios.progresoEducativo.nivelDesbloqueado(nivel.id);

          const tarjetaNivel = document.createElement('button');
          tarjetaNivel.type = 'button';
          tarjetaNivel.className = 'tarjeta-nivel' + (completado ? ' completado' : '');
          tarjetaNivel.setAttribute('aria-label', nivel.titulo + ': ' + nivel.descripcion);

          const estadoNivel = completado
            ? '✓ Completado'
            : desbloqueado
              ? 'Comenzar'
              : '🔒 Bloqueado';

          tarjetaNivel.innerHTML =
            '<span class="icono-nivel" aria-hidden="true">' + (completado ? '⭐' : '🎯') + '</span>' +
            '<span class="info-aventura">' +
            '<span class="titulo-aventura">' + nivel.titulo + '</span>' +
            '<span class="descripcion-aventura">' + nivel.descripcion + '</span>' +
            '<span class="indicador-aventura">' + estadoNivel + '</span>' +
            '</span>';

          if (desbloqueado) {
            tarjetaNivel.addEventListener('click', () => {
              // Abrir la actividad correspondiente al nivel declarado.
              if (nivel.actividad === 'primer_encuentro_masa' || nivel.actividad === 'actividad_banana') {
                if (nivel.id === 'masa_manzana') {
                  try {
                    window.NIDO.servicios.aventuras.iniciarAventura('masa');
                  } catch (error) {
                    console.error('NIDO: no se pudo iniciar la aventura.', error);
                    return;
                  }
                  iniciarPrimerEncuentro();
                } else if (nivel.id === 'masa_banana') {
                  iniciarActividadBanana();
                }
              } else if (nivel.actividad === 'actividad_naranja') {
                iniciarActividadNaranja();
              } else if (nivel.actividad === 'actividad_mochila') {
                iniciarActividadMochila();
              } else if (nivel.actividad === 'actividad_pelota') {
                iniciarActividadPelota();
              }
            });
          } else {
            tarjetaNivel.disabled = true;
          }

          contenedorArea.appendChild(tarjetaNivel);
        });

        listaAventuras.appendChild(contenedorArea);
      });
    }

    if (botonVolver) {
      botonVolver.addEventListener('click', () => {
        iniciarMiNido();
      });
    }
  };

  /**
   * Carga la pantalla de Aventuras.
   */
  const iniciarAventuras = async () => {
    try {
      await cargarPantalla(RUTA_AVENTURAS);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar las aventuras.');
      return;
    }
    prepararAventuras();
  };

  // ------------------------------------------------------------
  // Pantalla: Primer Encuentro con Pipo (Paso 12)
  // ------------------------------------------------------------

  /**
   * Prepara la experiencia del primer encuentro con la mascota.
   *
   * Secuencia didáctica completa sobre MASA:
   * 1. Pipo se presenta.
   * 2. Pipo muestra la manzana.
   * 3. Pipo pregunta si queremos saber su masa.
   * 4. Actividad: elegir el instrumento para medir la masa (balanza).
   * 5. Explicación breve: la masa se mide con una balanza.
   * 6. Observación de la balanza con la manzana (150 g).
   * 7. Pequeña consolidación: ¿qué estamos midiendo?
   * 8. Celebración final.
   *
   * Concepto científico: la masa nos indica cuánta materia tiene un objeto.
   * La masa de las cosas se mide con una balanza.
   */
  const prepararPrimerEncuentro = () => {
    const pasos = [
      document.getElementById('paso-presentacion'),
      document.getElementById('paso-manzana'),
      document.getElementById('paso-queremos-masa'),
      document.getElementById('paso-actividad'),
      document.getElementById('paso-explicacion-masa'),
      document.getElementById('paso-observacion-balanza'),
      document.getElementById('paso-consolidacion'),
      document.getElementById('paso-final')
    ];

    const saludoEncuentro = document.getElementById('saludo-primer-encuentro');
    const imagenPipoEncuentro = document.getElementById('imagen-pipo-encuentro');
    const mensajePresentacion = document.getElementById('mensaje-presentacion');
    const botonContinuarPresentacion = document.getElementById('boton-continuar-presentacion');

    const mensajeManzana = document.getElementById('mensaje-manzana');
    const botonContinuarManzana = document.getElementById('boton-continuar-manzana');

    const mensajeQueremosMasa = document.getElementById('mensaje-queremos-masa');
    const botonContinuarMasa = document.getElementById('boton-continuar-masa');

    const preguntaActividad = document.getElementById('pregunta-actividad');
    const opcionesInstrumento = document.getElementById('opciones-instrumento');
    const mensajeRespuesta = document.getElementById('mensaje-respuesta');

    const imagenPipoExplicacion = document.getElementById('imagen-pipo-explicacion');
    const mensajeExplicacionMasa = document.getElementById('mensaje-explicacion-masa');
    const botonContinuarExplicacion = document.getElementById('boton-continuar-explicacion');

    const mensajeObservacionBalanza = document.getElementById('mensaje-observacion-balanza');
    const botonContinuarObservacion = document.getElementById('boton-continuar-observacion');

    const preguntaConsolidacion = document.getElementById('pregunta-consolidacion');
    const opcionesConsolidacion = document.getElementById('opciones-consolidacion');
    const mensajeConsolidacion = document.getElementById('mensaje-consolidacion');

    const imagenPipoFinal = document.getElementById('imagen-pipo-final');
    const mensajeFinal = document.getElementById('mensaje-final');
    const botonVolverMiNido = document.getElementById('boton-volver-mi-nido-encuentro');

    // 1. Obtener el estudiante habitual.
    const estudiante = window.NIDO.servicios.acceso.obtenerEstudianteDeAcceso();
    if (!estudiante) {
      console.error('NIDO: no se encontró el estudiante habitual para el primer encuentro.');
      mostrarPantallaDeFalla('No se pudo cargar la experiencia. Volvé a abrir la aplicación.');
      return;
    }

    // 2. Obtener la mascota asignada.
    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    // 3. Mostrar saludo con el nombre real del estudiante.
    if (saludoEncuentro) {
      saludoEncuentro.textContent = '¡Hola, ' + estudiante.nombre + '!';
    }

    // 4. Asignar la imagen de la mascota en todos los pasos donde aparece.
    if (imagenPipoEncuentro && imagenMascota) {
      imagenPipoEncuentro.src = imagenMascota;
      imagenPipoEncuentro.alt = nombreMascota;
    }
    if (imagenPipoExplicacion && imagenMascota) {
      imagenPipoExplicacion.src = imagenMascota;
      imagenPipoExplicacion.alt = nombreMascota;
    }
    if (imagenPipoFinal && imagenMascota) {
      imagenPipoFinal.src = imagenMascota;
      imagenPipoFinal.alt = nombreMascota;
    }

    // 5. Mensajes de la secuencia.
    const mostrarPaso = (indice) => mostrarSeccion(pasos[indice], pasos);

    // Momento 1: Pipo se presenta.
    if (mensajePresentacion) {
      mensajePresentacion.textContent = 'Soy ' + nombreMascota + '. ¿Me ayudás a descubrir algo?';
    }

    if (botonContinuarPresentacion) {
      botonContinuarPresentacion.addEventListener('click', () => {
        mostrarPaso(1);
      });
    }

    // Momento 2: Pipo muestra la manzana.
    if (mensajeManzana) {
      mensajeManzana.textContent = '¡Mirá esta manzana!';
    }

    if (botonContinuarManzana) {
      botonContinuarManzana.addEventListener('click', () => {
        mostrarPaso(2);
      });
    }

    // Momento 3: ¿Queremos saber su masa?
    if (mensajeQueremosMasa) {
      mensajeQueremosMasa.textContent = '¿Queremos saber su masa?';
    }

    if (botonContinuarMasa) {
      botonContinuarMasa.addEventListener('click', () => {
        mostrarPaso(3);
      });
    }

    // Momento 4: Actividad — elegir el instrumento.
    if (preguntaActividad) {
      preguntaActividad.textContent = '¿Con qué podemos medir la masa de una manzana?';
    }

    if (opcionesInstrumento) {
      opcionesInstrumento.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-instrumento');
        if (!boton) {
          return;
        }

        const instrumento = boton.dataset.instrumento;

        if (instrumento === 'balanza') {
          // Respuesta correcta: devolución positiva inmediata.
          if (mensajeRespuesta) {
            mensajeRespuesta.textContent = '¡Muy bien! 🎉';
            mensajeRespuesta.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(4);
          }, 1200);
        } else {
          // Respuesta incorrecta: acompañar sin penalizar y permitir reintentar.
          if (mensajeRespuesta) {
            mensajeRespuesta.textContent = 'Casi... Probemos otra vez.';
            mensajeRespuesta.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    // Momento 5: Explicación breve de la masa.
    if (mensajeExplicacionMasa) {
      mensajeExplicacionMasa.textContent =
        'La masa de las cosas se mide con una balanza. ' +
        'La masa nos indica cuánta materia tiene un objeto.';
    }

    if (botonContinuarExplicacion) {
      botonContinuarExplicacion.addEventListener('click', () => {
        mostrarPaso(5);
      });
    }

    // Momento 6: Observación de la balanza con la manzana.
    if (mensajeObservacionBalanza) {
      mensajeObservacionBalanza.textContent =
        '¡Mirá! La balanza nos ayuda a conocer la masa de la manzana.';
    }

    if (botonContinuarObservacion) {
      botonContinuarObservacion.addEventListener('click', () => {
        mostrarPaso(6);
      });
    }

    // Momento 7: Pequeña consolidación.
    if (preguntaConsolidacion) {
      preguntaConsolidacion.textContent = '¿Qué estamos midiendo?';
    }

    if (opcionesConsolidacion) {
      opcionesConsolidacion.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-consolidacion');
        if (!boton) {
          return;
        }

        const respuesta = boton.dataset.respuesta;

        if (respuesta === 'masa') {
          // Respuesta correcta.
          if (mensajeConsolidacion) {
            mensajeConsolidacion.textContent =
              '¡Exacto! 🎉 Estamos midiendo la masa. ' +
              nombreMascota + ' y vos están aprendiendo juntos.';
            mensajeConsolidacion.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(7);
          }, 1500);
        } else {
          // Respuesta incorrecta: acompañar y permitir reintentar.
          if (mensajeConsolidacion) {
            mensajeConsolidacion.textContent = 'Casi... Probemos otra vez.';
            mensajeConsolidacion.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    // Momento 8: Celebración final.
    if (mensajeFinal) {
      mensajeFinal.textContent =
        'Hoy aprendimos que la masa de las cosas se mide con una balanza.';
    }

    if (botonVolverMiNido) {
      botonVolverMiNido.addEventListener('click', () => {
        // Marcar la aventura de masa como completada.
        try {
          window.NIDO.servicios.aventuras.completarAventura('masa');
        } catch (error) {
          console.error('NIDO: no se pudo completar la aventura.', error);
        }
        // Registrar el nivel educativo como completado.
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel('masa_manzana');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel educativo.', error);
        }
        // Continuar con la siguiente actividad del recorrido.
        iniciarActividadBanana();
      });
    }
  };

  /**
   * Carga la pantalla del primer encuentro.
   */
  const iniciarPrimerEncuentro = async () => {
    try {
      await cargarPantalla(RUTA_PRIMER_ENCUENTRO);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la experiencia con tu mascota.');
      return;
    }
    prepararPrimerEncuentro();
  };

  // ------------------------------------------------------------
  // Actividad: Banana (Nivel 2)
  // ------------------------------------------------------------

  /**
   * Prepara la actividad de la banana.
   * Pipo presenta una banana y el estudiante elige el instrumento correcto.
   */
  const prepararActividadBanana = () => {
    const pasos = [
      document.getElementById('paso-banana-presentacion'),
      document.getElementById('paso-banana-eleccion'),
      document.getElementById('paso-banana-explicacion'),
      document.getElementById('paso-banana-recompensa')
    ];

    const imagenPipoBanana = document.getElementById('imagen-pipo-banana');
    const mensajeBananaPresentacion = document.getElementById('mensaje-banana-presentacion');
    const botonContinuarPresentacion = document.getElementById('boton-continuar-banana-presentacion');

    const preguntaBanana = document.getElementById('pregunta-banana');
    const opcionesBanana = document.getElementById('opciones-banana');
    const mensajeBanana = document.getElementById('mensaje-banana');

    const imagenPipoBananaExplicacion = document.getElementById('imagen-pipo-banana-explicacion');
    const mensajeBananaExplicacion = document.getElementById('mensaje-banana-explicacion');
    const botonContinuarExplicacion = document.getElementById('boton-continuar-banana-explicacion');

    const mensajeBananaRecompensa = document.getElementById('mensaje-banana-recompensa');
    const botonSiguiente = document.getElementById('boton-siguiente-banana');

    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    if (imagenPipoBanana && imagenMascota) {
      imagenPipoBanana.src = imagenMascota;
      imagenPipoBanana.alt = nombreMascota;
    }
    if (imagenPipoBananaExplicacion && imagenMascota) {
      imagenPipoBananaExplicacion.src = imagenMascota;
      imagenPipoBananaExplicacion.alt = nombreMascota;
    }

    const mostrarPaso = (indice) => mostrarSeccion(pasos[indice], pasos);

    if (mensajeBananaPresentacion) {
      mensajeBananaPresentacion.textContent = '¡Mirá esta banana! ¿Descubrimos su masa?';
    }

    if (botonContinuarPresentacion) {
      botonContinuarPresentacion.addEventListener('click', () => {
        mostrarPaso(1);
      });
    }

    if (preguntaBanana) {
      preguntaBanana.textContent = '¿Con qué podemos conocer la masa de la banana?';
    }

    if (opcionesBanana) {
      opcionesBanana.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-instrumento');
        if (!boton) {
          return;
        }

        const instrumento = boton.dataset.instrumento;

        if (instrumento === 'balanza') {
          if (mensajeBanana) {
            mensajeBanana.textContent = '¡Muy bien! 🎉';
            mensajeBanana.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(2);
          }, 1200);
        } else {
          if (mensajeBanana) {
            mensajeBanana.textContent = 'Casi... Probemos otra vez.';
            mensajeBanana.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    if (mensajeBananaExplicacion) {
      mensajeBananaExplicacion.textContent =
        'La masa de la banana se conoce usando una balanza. ' +
        'La masa nos indica cuánta materia tiene.';
    }

    if (botonContinuarExplicacion) {
      botonContinuarExplicacion.addEventListener('click', () => {
        mostrarPaso(3);
      });
    }

    if (mensajeBananaRecompensa) {
      mensajeBananaRecompensa.textContent = '⭐ ¡Descubrimiento conseguido! ' + nombreMascota + ' está muy contento.';
    }

    if (botonSiguiente) {
      botonSiguiente.addEventListener('click', () => {
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel('masa_banana');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel de banana.', error);
        }
        iniciarActividadNaranja();
      });
    }
  };

  /**
   * Carga la actividad de la banana.
   */
  const iniciarActividadBanana = async () => {
    try {
      await cargarPantalla(RUTA_ACTIVIDAD_BANANA);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la actividad.');
      return;
    }
    prepararActividadBanana();
  };

  // ------------------------------------------------------------
  // Actividad: Naranja (Nivel 3)
  // ------------------------------------------------------------

  /**
   * Prepara la actividad de la naranja.
   * Pipo presenta una naranja y el estudiante elige el instrumento correcto.
   */
  const prepararActividadNaranja = () => {
    const pasos = [
      document.getElementById('paso-naranja-presentacion'),
      document.getElementById('paso-naranja-eleccion'),
      document.getElementById('paso-naranja-explicacion'),
      document.getElementById('paso-naranja-recompensa')
    ];

    const imagenPipoNaranja = document.getElementById('imagen-pipo-naranja');
    const mensajeNaranjaPresentacion = document.getElementById('mensaje-naranja-presentacion');
    const botonContinuarPresentacion = document.getElementById('boton-continuar-naranja-presentacion');

    const preguntaNaranja = document.getElementById('pregunta-naranja');
    const opcionesNaranja = document.getElementById('opciones-naranja');
    const mensajeNaranja = document.getElementById('mensaje-naranja');

    const imagenPipoNaranjaExplicacion = document.getElementById('imagen-pipo-naranja-explicacion');
    const mensajeNaranjaExplicacion = document.getElementById('mensaje-naranja-explicacion');
    const botonContinuarExplicacion = document.getElementById('boton-continuar-naranja-explicacion');

    const mensajeNaranjaRecompensa = document.getElementById('mensaje-naranja-recompensa');
    const botonSiguiente = document.getElementById('boton-siguiente-naranja');

    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    if (imagenPipoNaranja && imagenMascota) {
      imagenPipoNaranja.src = imagenMascota;
      imagenPipoNaranja.alt = nombreMascota;
    }
    if (imagenPipoNaranjaExplicacion && imagenMascota) {
      imagenPipoNaranjaExplicacion.src = imagenMascota;
      imagenPipoNaranjaExplicacion.alt = nombreMascota;
    }

    const mostrarPaso = (indice) => mostrarSeccion(pasos[indice], pasos);

    if (mensajeNaranjaPresentacion) {
      mensajeNaranjaPresentacion.textContent = '¡Mirá esta naranja! ¿Descubrimos su masa?';
    }

    if (botonContinuarPresentacion) {
      botonContinuarPresentacion.addEventListener('click', () => {
        mostrarPaso(1);
      });
    }

    if (preguntaNaranja) {
      preguntaNaranja.textContent = '¿Cuál podemos usar para conocer la masa de la naranja?';
    }

    if (opcionesNaranja) {
      opcionesNaranja.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-instrumento');
        if (!boton) {
          return;
        }

        const instrumento = boton.dataset.instrumento;

        if (instrumento === 'balanza') {
          if (mensajeNaranja) {
            mensajeNaranja.textContent = '¡Muy bien! 🎉';
            mensajeNaranja.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(2);
          }, 1200);
        } else {
          if (mensajeNaranja) {
            mensajeNaranja.textContent = 'Casi... Probemos otra vez.';
            mensajeNaranja.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    if (mensajeNaranjaExplicacion) {
      mensajeNaranjaExplicacion.textContent =
        'La masa de la naranja se conoce usando una balanza. ' +
        'La masa nos indica cuánta materia tiene.';
    }

    if (botonContinuarExplicacion) {
      botonContinuarExplicacion.addEventListener('click', () => {
        mostrarPaso(3);
      });
    }

    if (mensajeNaranjaRecompensa) {
      mensajeNaranjaRecompensa.textContent = '⭐ ¡Descubrimiento conseguido! ' + nombreMascota + ' está muy contento.';
    }

    if (botonSiguiente) {
      botonSiguiente.addEventListener('click', () => {
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel('masa_naranja');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel de naranja.', error);
        }
        iniciarActividadMochila();
      });
    }
  };

  /**
   * Carga la actividad de la naranja.
   */
  const iniciarActividadNaranja = async () => {
    try {
      await cargarPantalla(RUTA_ACTIVIDAD_NARANJA);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la actividad.');
      return;
    }
    prepararActividadNaranja();
  };

  // ------------------------------------------------------------
  // Actividad: Mochila (Nivel 4)
  // ------------------------------------------------------------

  /**
   * Prepara la actividad de la mochila.
   * Pipo presenta una mochila y el estudiante elige qué hacer.
   */
  const prepararActividadMochila = () => {
    const pasos = [
      document.getElementById('paso-mochila-presentacion'),
      document.getElementById('paso-mochila-eleccion'),
      document.getElementById('paso-mochila-explicacion'),
      document.getElementById('paso-mochila-recompensa')
    ];

    const imagenPipoMochila = document.getElementById('imagen-pipo-mochila');
    const mensajeMochilaPresentacion = document.getElementById('mensaje-mochila-presentacion');
    const botonContinuarPresentacion = document.getElementById('boton-continuar-mochila-presentacion');

    const preguntaMochila = document.getElementById('pregunta-mochila');
    const opcionesMochila = document.getElementById('opciones-mochila');
    const mensajeMochila = document.getElementById('mensaje-mochila');

    const imagenPipoMochilaExplicacion = document.getElementById('imagen-pipo-mochila-explicacion');
    const mensajeMochilaExplicacion = document.getElementById('mensaje-mochila-explicacion');
    const botonContinuarExplicacion = document.getElementById('boton-continuar-mochila-explicacion');

    const mensajeMochilaRecompensa = document.getElementById('mensaje-mochila-recompensa');
    const botonSiguiente = document.getElementById('boton-siguiente-mochila');

    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    if (imagenPipoMochila && imagenMascota) {
      imagenPipoMochila.src = imagenMascota;
      imagenPipoMochila.alt = nombreMascota;
    }
    if (imagenPipoMochilaExplicacion && imagenMascota) {
      imagenPipoMochilaExplicacion.src = imagenMascota;
      imagenPipoMochilaExplicacion.alt = nombreMascota;
    }

    const mostrarPaso = (indice) => mostrarSeccion(pasos[indice], pasos);

    if (mensajeMochilaPresentacion) {
      mensajeMochilaPresentacion.textContent = '¡Mirá esta mochila! ¿Descubrimos su masa?';
    }

    if (botonContinuarPresentacion) {
      botonContinuarPresentacion.addEventListener('click', () => {
        mostrarPaso(1);
      });
    }

    if (preguntaMochila) {
      preguntaMochila.textContent = '¿Qué hacemos para conocer la masa de la mochila?';
    }

    if (opcionesMochila) {
      opcionesMochila.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-instrumento');
        if (!boton) {
          return;
        }

        const instrumento = boton.dataset.instrumento;

        if (instrumento === 'balanza') {
          if (mensajeMochila) {
            mensajeMochila.textContent = '¡Muy bien! 🎉';
            mensajeMochila.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(2);
          }, 1200);
        } else {
          if (mensajeMochila) {
            mensajeMochila.textContent = 'Casi... Probemos otra vez.';
            mensajeMochila.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    if (mensajeMochilaExplicacion) {
      mensajeMochilaExplicacion.textContent =
        'La masa de la mochila se conoce poniéndola en la balanza. ' +
        'La masa nos indica cuánta materia tiene.';
    }

    if (botonContinuarExplicacion) {
      botonContinuarExplicacion.addEventListener('click', () => {
        mostrarPaso(3);
      });
    }

    if (mensajeMochilaRecompensa) {
      mensajeMochilaRecompensa.textContent = '⭐ ¡Descubrimiento conseguido! ' + nombreMascota + ' está muy contento.';
    }

    if (botonSiguiente) {
      botonSiguiente.addEventListener('click', () => {
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel('masa_mochila');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel de mochila.', error);
        }
        iniciarActividadPelota();
      });
    }
  };

  /**
   * Carga la actividad de la mochila.
   */
  const iniciarActividadMochila = async () => {
    try {
      await cargarPantalla(RUTA_ACTIVIDAD_MOCHILA);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la actividad.');
      return;
    }
    prepararActividadMochila();
  };

  // ------------------------------------------------------------
  // Actividad: Pelota (Nivel 5)
  // ------------------------------------------------------------

  /**
   * Prepara la actividad de la pelota.
   * Pipo presenta una pelota y el estudiante elige el instrumento correcto.
   */
  const prepararActividadPelota = () => {
    const pasos = [
      document.getElementById('paso-pelota-presentacion'),
      document.getElementById('paso-pelota-eleccion'),
      document.getElementById('paso-pelota-explicacion'),
      document.getElementById('paso-pelota-recompensa')
    ];

    const imagenPipoPelota = document.getElementById('imagen-pipo-pelota');
    const mensajePelotaPresentacion = document.getElementById('mensaje-pelota-presentacion');
    const botonContinuarPresentacion = document.getElementById('boton-continuar-pelota-presentacion');

    const preguntaPelota = document.getElementById('pregunta-pelota');
    const opcionesPelota = document.getElementById('opciones-pelota');
    const mensajePelota = document.getElementById('mensaje-pelota');

    const imagenPipoPelotaExplicacion = document.getElementById('imagen-pipo-pelota-explicacion');
    const mensajePelotaExplicacion = document.getElementById('mensaje-pelota-explicacion');
    const botonContinuarExplicacion = document.getElementById('boton-continuar-pelota-explicacion');

    const mensajePelotaRecompensa = document.getElementById('mensaje-pelota-recompensa');
    const botonSiguiente = document.getElementById('boton-siguiente-pelota');

    const mascota = window.NIDO.servicios.mascotas.obtenerMascotaDelEstudiante();
    const nombreMascota = mascota ? mascota.nombre : 'Pipo';
    const imagenMascota = mascota ? mascota.imagen : '';

    if (imagenPipoPelota && imagenMascota) {
      imagenPipoPelota.src = imagenMascota;
      imagenPipoPelota.alt = nombreMascota;
    }
    if (imagenPipoPelotaExplicacion && imagenMascota) {
      imagenPipoPelotaExplicacion.src = imagenMascota;
      imagenPipoPelotaExplicacion.alt = nombreMascota;
    }

    const mostrarPaso = (indice) => mostrarSeccion(pasos[indice], pasos);

    if (mensajePelotaPresentacion) {
      mensajePelotaPresentacion.textContent = '¡Mirá esta pelota! ¿Descubrimos su masa?';
    }

    if (botonContinuarPresentacion) {
      botonContinuarPresentacion.addEventListener('click', () => {
        mostrarPaso(1);
      });
    }

    if (preguntaPelota) {
      preguntaPelota.textContent = '¿Qué instrumento usamos para conocer la masa de la pelota?';
    }

    if (opcionesPelota) {
      opcionesPelota.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.opcion-instrumento');
        if (!boton) {
          return;
        }

        const instrumento = boton.dataset.instrumento;

        if (instrumento === 'balanza') {
          if (mensajePelota) {
            mensajePelota.textContent = '¡Muy bien! 🎉';
            mensajePelota.classList.remove('oculto');
          }
          boton.classList.add('opcion-correcta');
          setTimeout(() => {
            mostrarPaso(2);
          }, 1200);
        } else {
          if (mensajePelota) {
            mensajePelota.textContent = 'Casi... Probemos otra vez.';
            mensajePelota.classList.remove('oculto');
          }
          boton.classList.add('opcion-intento');
          setTimeout(() => {
            boton.classList.remove('opcion-intento');
          }, 800);
        }
      });
    }

    if (mensajePelotaExplicacion) {
      mensajePelotaExplicacion.textContent =
        'La masa de la pelota se conoce usando una balanza. ' +
        'La masa nos indica cuánta materia tiene.';
    }

    if (botonContinuarExplicacion) {
      botonContinuarExplicacion.addEventListener('click', () => {
        mostrarPaso(3);
      });
    }

    if (mensajePelotaRecompensa) {
      mensajePelotaRecompensa.textContent = '⭐ ¡Descubrimiento conseguido! ' + nombreMascota + ' está muy contento.';
    }

    if (botonSiguiente) {
      botonSiguiente.addEventListener('click', () => {
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel('masa_pelota');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel de pelota.', error);
        }
        // Masa completada: celebrar y volver a Mi NIDO.
        iniciarMiNido();
      });
    }
  };

  /**
   * Carga la actividad de la pelota.
   */
  const iniciarActividadPelota = async () => {
    try {
      await cargarPantalla(RUTA_ACTIVIDAD_PELOTA);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la actividad.');
      return;
    }
    prepararActividadPelota();
  };

  // ------------------------------------------------------------
  // Presentación inicial de NIDO
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla de presentación y la reproduce automáticamente.
   * Primero intenta reproducir con audio. Si el navegador bloquea el
   * autoplay con sonido, hace fallback automático a reproducción sin sonido
   * y muestra un botón discreto para activar el sonido sin reiniciar el video.
   * La presentación se muestra cada vez que se abre NIDO.
   * Al finalizar, realiza una transición suave hacia el flujo correspondiente.
   */
  const prepararPresentacion = () => {
    const pantallaPresentacion = document.getElementById('pantalla-presentacion-nido');
    const videoPresentacion = document.getElementById('video-presentacion-nido');
    const botonActivarSonido = document.getElementById('boton-activar-sonido');

    if (!pantallaPresentacion || !videoPresentacion) {
      console.error('NIDO: la pantalla de presentación no está completa.');
      continuarFlujoSegunEstado();
      return;
    }

    // Ocultar controles nativos del reproductor.
    videoPresentacion.controls = false;

    /**
     * Intenta reproducir automáticamente.
     * Primero con audio; si el navegador lo rechaza, se silencia y se reintenta.
     */
    const intentarReproduccionAutomatica = () => {
      // Intentar con audio habilitado.
      videoPresentacion.muted = false;

      videoPresentacion.play().catch(() => {
        // El navegador bloqueó el autoplay con sonido: fallback a sin sonido.
        console.warn('NIDO: autoplay con audio bloqueado. Se reproduce sin sonido.');
        videoPresentacion.muted = true;
        videoPresentacion.play().catch(() => {
          // Si tampoco se pudo reproducir sin sonido, continuar igualmente.
          console.warn('NIDO: no se pudo iniciar la reproducción automática.');
          continuarFlujoSegunEstado();
          return;
        });

        // Mostrar el botón para que la persona pueda activar el sonido.
        if (botonActivarSonido) {
          botonActivarSonido.classList.remove('oculto');
        }
      });
    };

    /**
     * Activa el sonido del video y oculta el botón.
     * Mantiene la posición actual del video sin reiniciarlo.
     */
    const activarSonido = () => {
      videoPresentacion.muted = false;

      videoPresentacion.play().then(() => {
        if (botonActivarSonido) {
          botonActivarSonido.classList.add('oculto');
        }
      }).catch(() => {
        // Si no se pudo activar el sonido, se mantiene el botón disponible.
        console.warn('NIDO: no se pudo activar el sonido de la presentación.');
      });
    };

    if (botonActivarSonido) {
      botonActivarSonido.addEventListener('click', activarSonido);
    }

    // Reproducción automática al cargar.
    intentarReproduccionAutomatica();

    videoPresentacion.addEventListener('ended', () => {
      finalizarPresentacion(pantallaPresentacion);
    });
  };

  /**
   * Realiza la transición suave de salida de la presentación.
   * @param {Element} pantallaPresentacion - Sección de la presentación.
   */
  const finalizarPresentacion = (pantallaPresentacion) => {
    pantallaPresentacion.classList.add('oculto');

    setTimeout(() => {
      continuarFlujoSegunEstado();
    }, 800);
  };

  /**
   * Carga la pantalla de presentación inicial de NIDO.
   */
  const iniciarPresentacion = async () => {
    try {
      await cargarPantalla(RUTA_PRESENTACION);
    } catch (error) {
      console.error(error);
      continuarFlujoSegunEstado();
      return;
    }
    prepararPresentacion();
  };

  /**
   * Continúa con el flujo correspondiente al estado actual de NIDO.
   * No modifica la lógica existente de los estados de acceso.
   */
  const continuarFlujoSegunEstado = async () => {
    await iniciarPantallaInicio();
  };

  // ------------------------------------------------------------
  // Pantalla de inicio (bienvenida y selección de rol)
  // ------------------------------------------------------------

  /**
   * Prepara la pantalla de inicio ya cargada en el contenedor principal.
   */
  const prepararInicio = () => {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const pantallaRoles = document.getElementById('pantalla-roles');
    const pantallaResultado = document.getElementById('pantalla-resultado');
    const botonComenzar = document.getElementById('boton-comenzar');
    const botonVolver = document.getElementById('boton-volver');
    const botonContinuar = document.getElementById('boton-continuar');
    const tituloResultado = document.getElementById('titulo-resultado');
    const textoResultado = document.getElementById('texto-resultado');
    const opcionesRol = document.querySelectorAll('.opcion-rol');

    const pantallas = [pantallaInicio, pantallaRoles, pantallaResultado];

    const mostrarResultado = (titulo, texto) => {
      if (tituloResultado && textoResultado) {
        tituloResultado.textContent = titulo;
        textoResultado.textContent = texto;
      }
      mostrarSeccion(pantallaResultado, pantallas);
    };

    if (botonComenzar) {
      botonComenzar.disabled = false;
      botonComenzar.textContent = 'Comenzar';
      botonComenzar.addEventListener('click', () => {
        mostrarSeccion(pantallaRoles, pantallas);
      });
    }

    if (botonVolver) {
      botonVolver.addEventListener('click', () => {
        mostrarSeccion(pantallaInicio, pantallas);
      });
    }

    if (botonContinuar) {
      botonContinuar.addEventListener('click', () => {
        mostrarSeccion(pantallaInicio, pantallas);
      });
    }

    opcionesRol.forEach((opcion) => {
      opcion.addEventListener('click', () => {
        const rol = opcion.dataset.rol;

        if (rol === 'adulto') {
          // Configuración local del adulto responsable (no es autenticación ni Cuenta NIDO).
          iniciarConfiguracionInicial();
        } else if (rol === 'docente') {
          // El modo docente no se implementa en esta etapa.
          mostrarResultado(
            'Docente',
            'El modo docente estará disponible en una versión futura.'
          );
        }
      });
    });

    // Consultar el estado de acceso mediante el sistema de servicios.
    const acceso = window.NIDO.servicios.acceso;
    const estadoAcceso = acceso.obtenerEstadoAcceso();

    if (estadoAcceso === 'sin_configurar') {
      // Flujo actual de bienvenida y selección de rol.
      mostrarSeccion(pantallaInicio, pantallas);
    } else if (estadoAcceso === 'configurado_sin_estudiante') {
      // Instalación configurada pero sin estudiante habitual.
      mostrarResultado(
        'Instalación configurada',
        'Esta instalación ya está configurada, pero todavía no tiene un estudiante habitual asociado.'
      );
    } else if (estadoAcceso === 'configurado_con_estudiante') {
      // Existe un estudiante habitual configurado.
      // Si ya tiene mascota, se dirige a Mi NIDO. Si no, a la elección de mascota.
      const tieneMascota = window.NIDO.servicios.mascotas.tieneMascota();
      if (tieneMascota) {
        iniciarMiNido();
      } else {
        iniciarEleccionMascota();
      }
    }
  };

  /**
   * Carga la pantalla de inicio.
   */
  async function iniciarPantallaInicio() {
    try {
      await cargarPantalla(RUTA_INICIO);
    } catch (error) {
      console.error(error);
      mostrarPantallaDeFalla('No se pudo cargar la pantalla inicial.');
      return;
    }
    prepararInicio();
  }

  // La presentación se reproduce cada vez que se abre NIDO,
  // independientemente del estado de configuración.
  await iniciarPresentacion();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      console.warn('No se pudo registrar el service worker.');
    });
  }

  console.log('NIDO: aplicación inicial lista.');
});
