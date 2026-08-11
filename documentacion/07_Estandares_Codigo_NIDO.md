# Estándares de Código NIDO

## Idioma del proyecto

Todo el código propio, carpetas, archivos y nombres deben estar en español.

- Variables, funciones, clases y constantes deben usar nombres en español cuando describan conceptos del dominio.
- Las carpetas y archivos deben reflejar su contenido en español, con nombres claros y consistentes.
- Se pueden usar términos en inglés únicamente cuando correspondan a bibliotecas externas o convenciones técnicas establecidas.

## Convenciones de nombres

- Variables
  - Usar nombres descriptivos y en minúsculas, con palabras separadas por guiones bajos si es necesario.
  - Evitar abreviaturas poco claras.

- Funciones
  - Usar verbos en infinitivo o expresiones claras que indiquen la acción, por ejemplo: `calcular_puntaje`, `cargar_avance`.
  - Preferir nombres cortos pero expresivos.

- Clases
  - Usar mayúscula inicial en cada palabra (CamelCase) para clases y entidades, por ejemplo: `Aventura`, `Estudiante`, `MotorEducativo`.
  - Mantener nombres representativos del rol de la clase.

- Archivos
  - Usar nombres en minúsculas y con guiones bajos para separar palabras cuando se requiera, por ejemplo: `pantalla_inicio`, `servicio_progreso`.
  - Los archivos deben ser coherentes con el tipo de contenido que contienen.

## Organización del código

- Componentes
  - Contener la lógica y la presentación de piezas de interfaz reutilizables.
  - Deben ser independientes, fáciles de testear y con una responsabilidad clara.

- Pantallas
  - Representar vistas completas o secciones principales de la aplicación.
  - Deben orquestar componentes y servicios necesarios para mostrar el contenido.

- Modelos
  - Definir las estructuras de datos centrales del dominio.
  - Representar entidades como `Estudiante`, `Mascota`, `Aventura`, `Desafío`, `Progreso` y `Recompensas`.

- Servicios
  - Encapsular la lógica de negocio, acceso a datos y operaciones transversales.
  - Ejemplos: servicios de almacenamiento, carga de contenido, evaluación de respuestas.

- Datos
  - Incluir contenido configurado, como archivos JSON educativos y cualquier estructura de datos estática.
  - Mantener los datos separados de la lógica del motor.

- Utilidades
  - Reunir funciones auxiliares que se usan en diferentes partes del proyecto.
  - Deben ser genéricas y no depender de la lógica específica del dominio.

- Estilos
  - Mantener los estilos separados de la lógica y el contenido.
  - Organizar estilos por componentes o por pantallas, según el patrón elegido.

## Arquitectura

- Separación entre motor educativo y contenido
  - El motor educativo debe ser independiente de los datos y contenidos concretos.
  - El contenido debe ser configurable y consumido por el motor sin acoplamientos rígidos.

- Modularidad
  - El código debe estar organizado en módulos pequeños y coherentes.
  - Cada módulo debe tener una responsabilidad bien definida.

- Reutilización
  - Priorizar componentes y servicios reutilizables.
  - Evitar duplicar lógica en diferentes partes del proyecto.

- Mantenimiento futuro
  - Diseñar el código para que sea fácil de extender y mantener.
  - Elegir estructuras claras que permitan agregar nuevas materias, aventuras y funcionalidades con mínimas modificaciones.

## Reglas para asistentes de IA

- Analizar antes de programar
  - Revisar el contexto, la documentación y los requisitos antes de generar código.
  - Comprender el objetivo antes de proponer soluciones.

- Respetar documentación
  - Seguir los lineamientos y la estructura definida en la documentación del proyecto.
  - No implementar cambios que contradigan las normas establecidas.

- Evitar código innecesario
  - Generar solo lo que aporta valor a la solución.
  - No añadir complejidad, funciones ni estructuras no requeridas.

- Explicar decisiones
  - Acompañar el código con razones claras cuando se propongan soluciones.
  - Describir brevemente por qué se eligió una aproximación determinada.

## Accesibilidad

- Requisitos obligatorios para interfaces
  - Texto legible con contraste adecuado.
  - Elementos táctiles con tamaños accesibles.
  - Navegación clara y lógica.
  - Apoyos visuales y sonoros que refuercen la comprensión.
  - Respeto por la diversidad de capacidades y ritmos de aprendizaje.

## Resumen

Este documento define los estándares de código de NIDO, incluyendo el idioma del proyecto, convenciones de nombres, organización del código, arquitectura, reglas para asistentes de IA y requisitos de accesibilidad. Está orientado a garantizar claridad, consistencia y mantenibilidad en el desarrollo futuro.
