# 1. Objetivo del documento

Este documento define cómo se organizarán los archivos reales del proyecto NIDO como Aplicación Web Progresiva (PWA). Describe la estructura física de carpetas y archivos para mantener el proyecto ordenado, modular y fácil de mantener.

# 2. Principios de organización

- separación entre motor educativo y contenido educativo.
- modularidad.
- facilidad de mantenimiento.
- nombres en español.
- crecimiento futuro.
- accesibilidad.

# 3. Estructura principal del proyecto

La estructura principal del proyecto debe ser:

NIDO/
├── aplicacion/
├── activos/
├── contenido/
├── documentacion/
├── prompts/
├── pruebas/

Explicación de cada carpeta:

- `aplicacion/` contiene la lógica de la app, los componentes de interfaz, las pantallas y los servicios del motor educativo.
- `activos/` agrupa los recursos multimedia como imágenes, sonidos, animaciones, iconos y mascotas.
- `contenido/` almacena las aventuras educativas configurables por materia.
- `documentacion/` contiene los documentos de definición, diseño, arquitectura y guías del proyecto.
- `prompts/` incluye instrucciones y especificaciones para asistentes de inteligencia artificial o flujos de proyecto.
- `pruebas/` aloja casos de prueba, escenarios y registros de validación.

# 4. Carpeta aplicacion/

La carpeta `aplicacion/` debe incluir módulos que soporten el funcionamiento general de NIDO:

aplicacion/
├── componentes/
├── datos/
├── pantallas/
├── modelos/
├── servicios/
├── utilidades/
├── estilos/

Responsabilidades:

- `componentes/`: piezas reutilizables de la interfaz como botones, tarjetas, ventanas y paneles.
- `datos/`: información local del usuario, perfiles, configuración y progreso para funcionamiento offline.
- `pantallas/`: vistas completas que representan las distintas etapas de la experiencia.
- `modelos/`: estructuras de datos del dominio, como estudiante, mascota, aventura y desafío.
- `servicios/`: lógica de negocio y operaciones transversales como almacenamiento, carga de contenido y evaluación.
- `utilidades/`: funciones auxiliares genéricas que no pertenecen a un módulo específico.
- `estilos/`: archivos de diseño visual, temas, estilos globales y variables de presentación.

# 5. Carpeta contenido/

La carpeta `contenido/` debe separar los contenidos por materias:

contenido/
├── fisica/
├── matematica/
├── lengua/
├── ciencias/

Aquí vivirán las aventuras educativas configurables. Cada materia contendrá unidades, aventuras, desafíos y recursos propios que el motor educativo interpretará sin depender de código específico.

# 6. Carpeta activos/

La carpeta `activos/` debe contener los recursos multimedia del proyecto:

activos/
├── imagenes/
├── sonidos/
├── animaciones/
├── iconos/
├── mascotas/

Función de cada sección:

- `imagenes/`: ilustraciones, fondos y gráficos de apoyo.
- `sonidos/`: efectos, narraciones y pistas auditivas.
- `animaciones/`: animaciones visuales y secuencias de movimiento.
- `iconos/`: símbolos y elementos gráficos de la interfaz.
- `mascotas/`: recursos específicos de personajes, como sprites, expresiones y animaciones de la mascota.

# 7. Carpeta datos/

La carpeta `aplicacion/datos/` sirve para almacenar información local y permitir el funcionamiento offline:

- perfiles de estudiantes.
- configuraciones.
- progreso.
- información local.
- datos para funcionamiento offline.

# 8. Archivos principales PWA

Los archivos principales de la PWA son:

- `index.html`: punto de entrada de la aplicación, carga la estructura básica y los recursos iniciales.
- `manifest.json`: define cómo se instala la aplicación, su icono, nombre y comportamiento en dispositivos.
- `service-worker.js`: gestiona el cache, el funcionamiento offline y la actualización de recursos.

# 9. Organización del contenido educativo

Una aventura tendrá:

- información general.
- desafíos.
- imágenes.
- audios.
- recompensas.
- niveles.

Cada aventura debe describir sus metas, su contexto y sus recursos, de modo que el motor educativo pueda interpretarla como datos configurables.

# 10. Organización de mascotas

Las mascotas deben almacenarse con sus detalles y recursos:

- personajes.
- expresiones.
- animaciones.
- accesorios.

Esto permite que la mascota se presente como compañero, con personalidad y reacciones que apoyan la experiencia educativa.

# 11. Preparación para modo docente

Esta estructura permite:

- crear aventuras.
- agregar materias.
- modificar contenido.
- mantener separado el motor.

El docente podrá trabajar sobre contenidos y configuraciones sin alterar la lógica del motor educativo.

# 12. Reglas para futuros desarrolladores o IA

- revisar documentación antes de crear archivos.
- no mezclar contenido con programación.
- respetar nombres en español.
- no crear estructuras paralelas.
- mantener arquitectura definida.

## Resumen de decisión

Esta estructura será la base oficial del desarrollo de NIDO PWA, garantizando que el proyecto se organice de forma clara, modular y coherente con el contrato establecido en NIDO.md.
