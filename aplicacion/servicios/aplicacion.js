/**
 * Aplicación: Orquestador principal de NIDO
 *
 * Gestión de pantallas generales y navegación.
 * Las aventuras se delegan en el motor de escenas (motor_escenas.js).
 *
 * Este orquestador:
 * - Carga las pantallas generales (inicio, configuración, elección de mascota, Mi NIDO, Aventuras).
 * - Consulta el estado de acceso mediante window.NIDO.servicios.acceso.
 * - Delega en el motor de escenas para ejecutar aventuras.
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
  const RUTA_ESCENA = 'aplicacion/pantallas/escena.html';

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
              // Delegar en el motor de escenas.
              iniciarEscena(nivel);
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
  // Motor de Escenas: inicio de aventuras
  // ------------------------------------------------------------

  /**
   * Inicia una aventura mediante el motor de escenas.
   * @param {Object} nivel - Nivel del recorrido a iniciar.
   * @param {Function} [alFinalizar] - Callback opcional al finalizar la aventura.
   */
  const iniciarEscena = (nivel, alFinalizar) => {
    const aventura = window.NIDO.datos.escenas.obtenerAventura(nivel.id);
    if (!aventura) {
      console.error('NIDO: no se encontró la aventura para el nivel ' + nivel.id);
      mostrarPantallaDeFalla('No se pudo cargar la actividad.');
      return;
    }

    window.NIDO.servicios.motorEscenas.iniciarAventura(
      contenedorApp,
      aventura,
      RUTA_ESCENA,
      (siguienteAventuraId) => {
        // Registrar el nivel actual como completado.
        try {
          window.NIDO.servicios.progresoEducativo.completarNivel(nivel.id);
          window.NIDO.servicios.aventuras.completarAventura('masa');
        } catch (error) {
          console.error('NIDO: no se pudo completar el nivel.', error);
        }

        if (alFinalizar) {
          alFinalizar(siguienteAventuraId);
        } else if (siguienteAventuraId) {
          // Continuar con la siguiente aventura automáticamente.
          const siguienteNivel = window.NIDO.modelos.obtenerNivelPorId('jugamos_a_medir', siguienteAventuraId);
          if (siguienteNivel) {
            iniciarEscena(siguienteNivel);
          } else {
            iniciarMiNido();
          }
        } else {
          // Aventura final completada -> Mi NIDO.
          iniciarMiNido();
        }
      }
    );
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