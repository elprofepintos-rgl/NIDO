# Diseño de Pantallas NIDO

## 01 Bienvenida NIDO
- Nombre: Bienvenida NIDO
- Objetivo: Introducir la aplicación, presentar la propuesta pedagógica y guiar al usuario al siguiente paso.
- Usuario que la utiliza: Adulto responsable y docente.
- Elementos visuales: logo de NIDO, mensaje de bienvenida, pregunta inicial "¿Quién está ingresando?", opciones para Adulto Responsable y Docente, ilustraciones de la mascota.
- Acciones disponibles: seleccionar "Adulto responsable" o "Docente".
- Consideraciones de accesibilidad: texto legible, contraste adecuado, botones grandes, navegación clara.
- Relación con otras pantallas: conduce a configuración inicial del Adulto Responsable o al inicio docente.

## 02 Acceso adulto responsable
- Nombre: Acceso adulto responsable
- Objetivo: Permitir que el adulto responsable inicie sesión o se registre para configurar la aplicación.
- Usuario que la utiliza: Adulto responsable.
- Elementos visuales: formulario de acceso, campos de credenciales, botón de continuar, ayuda breve.
- Acciones disponibles: iniciar sesión, registrarse o recuperar acceso.
- Consideraciones de accesibilidad: etiquetas claras, campos de entrada accesibles, enfoque evidente.
- Relación con otras pantallas: desde Bienvenida; hacia Crear perfil adulto o espacio de configuración.

## 03 Crear perfil adulto
- Nombre: Crear perfil adulto
- Objetivo: Configurar el perfil del adulto responsable y sus permisos iniciales.
- Usuario que la utiliza: Adulto responsable.
- Elementos visuales: formulario de datos, opciones de configuración, botón de guardar.
- Acciones disponibles: ingresar nombre, establecer método de acceso, definir permisos básicos.
- Consideraciones de accesibilidad: formularios sencillos, instrucciones explícitas, validaciones accesibles.
- Relación con otras pantallas: desde Acceso adulto responsable; hacia Crear estudiante.

## 04 Crear estudiante
- Nombre: Crear estudiante
- Objetivo: Registrar el perfil del estudiante que utilizará NIDO.
- Usuario que la utiliza: Adulto responsable.
- Elementos visuales: campos de nombre, edad, avatar, opciones de nivel, preferencias.
- Acciones disponibles: crear perfil del estudiante, asignar nivel inicial, guardar perfil.
- Consideraciones de accesibilidad: selección de avatar con texto alternativo, botones grandes, lenguaje accesible.
- Relación con otras pantallas: desde Crear perfil adulto; hacia Elección de mascota.

## 05 Elección de mascota
- Nombre: Elección de mascota
- Objetivo: Permitir al estudiante elegir su mascota compañera.
- Usuario que la utiliza: Estudiante (con acompañamiento de adulto responsable).
- Elementos visuales: opciones de mascotas, descripciones de personalidad, animaciones, botón de selección.
- Acciones disponibles: seleccionar mascota, ver detalles de cada opción.
- Consideraciones de accesibilidad: contrastes, texto claro sobre personalidad, confirmación audible/visual.
- Relación con otras pantallas: desde Crear estudiante; hacia Confirmación mascota.

## 06 Confirmación mascota
- Nombre: Confirmación mascota
- Objetivo: Confirmar la mascota elegida y cerrar la selección.
- Usuario que la utiliza: Estudiante.
- Elementos visuales: mascota seleccionada, descripción de compañero, botón de confirmación.
- Acciones disponibles: confirmar mascota, regresar a la selección si es necesario.
- Consideraciones de accesibilidad: botones destacados, mensajes de confirmación claros.
- Relación con otras pantallas: desde Elección de mascota; hacia Mi NIDO.

## 07 Mi NIDO
- Nombre: Mi NIDO
- Objetivo: Presentar el espacio personal del estudiante con su mascota, progreso y accesos rápidos.
- Usuario que la utiliza: Estudiante.
- Elementos visuales: avatar de mascota, estado del espacio, accesos a aventuras, progreso, tienda, inventario.
- Acciones disponibles: ingresar a aventuras, ver recompensas, personalizar espacio, revisar progreso.
- Consideraciones de accesibilidad: navegación simple, iconos con texto, secciones bien delimitadas.
- Relación con otras pantallas: desde Confirmación mascota; hacia Mapa de aventuras, Tienda y recompensas.

## 08 Mapa de aventuras
- Nombre: Mapa de aventuras
- Objetivo: Mostrar las aventuras disponibles y el recorrido educativo.
- Usuario que la utiliza: Estudiante y docente.
- Elementos visuales: mapa o lista de aventuras, estado de progreso, accesos directos.
- Acciones disponibles: seleccionar aventura, ver descripción, filtrar por nivel.
- Consideraciones de accesibilidad: etiquetas claras, agrupación lógica, foco visible.
- Relación con otras pantallas: desde Mi NIDO; hacia Aventura educativa.

## 09 Aventura educativa
- Nombre: Aventura educativa
- Objetivo: Desarrollar una experiencia de aprendizaje concreta con desafíos y apoyo de la mascota.
- Usuario que la utiliza: Estudiante.
- Elementos visuales: enunciados, imágenes, opciones, barra de progreso, mensajes de la mascota.
- Acciones disponibles: responder desafío, avanzar contenido, pedir ayuda.
- Consideraciones de accesibilidad: opciones grandes, texto legible, apoyo auditivo opcional.
- Relación con otras pantallas: desde Mapa de aventuras; hacia Mi NIDO tras completar o pausar.

## 10 Tienda y recompensas
- Nombre: Tienda y recompensas
- Objetivo: Mostrar las recompensas disponibles y el inventario del estudiante.
- Usuario que la utiliza: Estudiante.
- Elementos visuales: monedas, objetos, accesorios, descripciones, botones de adquisición.
- Acciones disponibles: canjear recompensas, ver inventario, revisar logros.
- Consideraciones de accesibilidad: contraste de precios, descripciones claras, botones accesibles.
- Relación con otras pantallas: desde Mi NIDO; hacia Mi NIDO o personalización.

## 11 Panel docente
- Nombre: Panel docente
- Objetivo: Proveer un espacio para que el docente gestione grupos, estudiantes y contenidos.
- Usuario que la utiliza: Docente.
- Elementos visuales: listado de grupos, estudiantes, estadísticas, botones de creación.
- Acciones disponibles: seleccionar grupo, ver progreso, crear aventuras, personalizar contenidos.
- Consideraciones de accesibilidad: estructura ordenada, textos claros, atajos de navegación.
- Relación con otras pantallas: desde Bienvenida o menú docente; hacia Crear aventura educativa.

## 12 Crear aventura educativa
- Nombre: Crear aventura educativa
- Objetivo: Permitir al docente diseñar una nueva aventura con objetivos, desafíos y recursos.
- Usuario que la utiliza: Docente.
- Elementos visuales: formulario de título, tema, nivel, lista de desafíos, opciones de multimedia.
- Acciones disponibles: ingresar datos de la aventura, añadir desafíos, guardar contenido.
- Consideraciones de accesibilidad: campos accesibles, instrucciones claras, validaciones fáciles de entender.
- Relación con otras pantallas: desde Panel docente; hacia Panel docente o retorno a Mapa de aventuras.

## Flujo general de navegación

Bienvenida

↓

¿Quién está ingresando?

↓

Adulto responsable

↓

Configuración inicial

↓

Crear estudiante

↓

Elegir mascota

↓

Mi NIDO

↓

Aventuras

↓

Progreso

↓

Recompensas

Docente

↓

Inicio docente

↓

Grupo o gestión docente

Estudiante

↓

NIDO

↓

Mi NIDO

↓

JUGAR
