# Decisiones Técnicas NIDO

## 1. Objetivo

El propósito de documentar las decisiones técnicas es registrar las razones y criterios detrás de las elecciones tecnológicas. Esto facilita la comunicación entre el equipo, permite revisar decisiones en el futuro y reduce la ambigüedad al avanzar en el desarrollo de NIDO.

## 2. Requisitos técnicos del proyecto

NIDO debe considerar una serie de requisitos que orientan las decisiones técnicas desde el inicio.

- Funcionamiento sin conexión
  - El sistema debe ofrecer acceso a contenidos y progreso cuando no hay conexión a internet.
  - La experiencia debe ser robusta frente a interrupciones de red.

- Uso en dispositivos móviles
  - La plataforma debe estar diseñada para dispositivos móviles, con interfaces optimizadas para pantallas pequeñas.
  - Se debe priorizar la experiencia en tablets y teléfonos.

- Interfaz táctil
  - La interacción principal debe ser táctil, con elementos grandes y fáciles de seleccionar.
  - Los controles deben ser intuitivos y accesibles para niños y personas con baja destreza motriz.

- Animaciones
  - Las animaciones deben ser fluidas y contribuir a la comprensión y la motivación.
  - Es importante equilibrar calidad visual y rendimiento.

- Accesibilidad
  - La aplicación debe ser usable por estudiantes con diferentes necesidades.
  - Debe contemplar texto legible, contraste adecuado, navegación clara y apoyos visuales.

- Crecimiento futuro
  - La plataforma debe permitir añadir nuevas materias, aventuras y recursos sin reescribir la base técnica.
  - El diseño técnico debe ser escalable y modular.

## 3. Plataformas posibles

Se consideran varias opciones de plataforma para NIDO, sin seleccionar una tecnología definitiva en esta etapa.

- Android nativo
  - Ofrece alto rendimiento en dispositivos Android.
  - Permite aprovechar capacidades locales y optimizar la experiencia táctil.

- Multiplataforma
  - Facilita el desarrollo para Android e iOS con una sola base de código.
  - Puede acelerar la llegada a más dispositivos.

- Aplicación web
  - Permite acceso desde navegadores en diferentes dispositivos.
  - Es más fácil de distribuir y actualizar, pero requiere considerar el soporte sin conexión y el rendimiento móvil.

## 4. Criterios de selección

Los criterios que guiarán la elección de plataforma y tecnologías deben estar alineados con los requisitos del proyecto.

- Rendimiento
  - El sistema debe ser ágil y respondiendo de forma inmediata en las interacciones.
  - El rendimiento es especialmente crítico en animaciones y navegación.

- Mantenimiento
  - La solución técnica debe ser fácil de mantener a lo largo del tiempo.
  - Se debe priorizar claridad en el código y una estructura que facilite la evolución.

- Experiencia de desarrollo
  - El equipo debe poder trabajar de forma eficiente con la tecnología elegida.
  - La curva de aprendizaje y la disponibilidad de recursos de desarrollo son factores relevantes.

- Escalabilidad
  - La plataforma debe permitir agregar nuevos contenidos y funcionalidades sin complejidad innecesaria.
  - Se valora una arquitectura que soporte crecimiento sostenible.

- Compatibilidad
  - Se debe buscar compatibilidad con dispositivos y sistemas que usen los estudiantes objetivo.
  - La tecnología elegida debe permitir un acceso amplio, tanto en dispositivos modernos como en hardware más modesto.

## 5. Tecnología elegida

Para NIDO v0.1 se adopta como decisión oficial una Aplicación Web Progresiva (PWA).

- HTML, CSS y JavaScript como tecnologías base.
- Service Worker para funcionamiento offline.
- Archivos JSON para contenido educativo configurable.
- IndexedDB o almacenamiento local para progreso del estudiante.
- Arquitectura modular separando motor educativo y contenido.
- Compatibilidad con celulares, tablets y computadoras.

## 6. Motivos de elección

La elección de una PWA responde a criterios que favorecen la accesibilidad y el crecimiento del proyecto.

- Facilidad de distribución
  - Permite acceder a la aplicación desde navegadores sin requerir una instalación compleja.
  - Las actualizaciones se despliegan de forma más simple.

- Funcionamiento multiplataforma
  - La aplicación puede ejecutarse en Android, iOS y computadoras con un mismo código base.
  - Ofrece una experiencia consistente en distintos dispositivos.

- Independencia del sistema operativo
  - No depende de una plataforma nativa específica.
  - La aplicación funciona sobre navegadores compatibles.

- Mantenimiento sencillo
  - El uso de tecnologías web estándar facilita el mantenimiento.
  - La base técnica es más fácil de entender y evolucionar.

- Posibilidad de crecimiento futuro
  - Una arquitectura modular soporta la expansión de contenidos y funciones.
  - El contenido configurable en JSON permite añadir materias y aventuras sin cambiar el motor.

## 7. Principios técnicos

Los principios técnicos definen el estilo y los valores que deberían guiar el desarrollo de NIDO.

- Código mantenible
  - El código debe ser legible, modular y fácil de entender.
  - Se debe evitar complejidad innecesaria.

- Nombres en español
  - Se recomienda usar nombres en español para entidades clave, variables y conceptos del dominio, cuando facilite la comprensión del equipo.
  - Esto ayuda a que la documentación, los datos y el código compartan un mismo vocabulario.

- Arquitectura limpia
  - Se debe buscar una separación clara entre capas: lógica de presentación, lógica de negocio y datos.
  - La arquitectura debe permitir cambios en contenido sin afectar el motor.

- Evitar dependencias innecesarias
  - Solo se deben incorporar bibliotecas o herramientas que aporten valor claro al proyecto.
  - Se debe cuidar la simplicidad y la estabilidad.

- Priorizar estabilidad
  - Las decisiones técnicas deben favorecer una base estable y fiable.
  - Es preferible optar por soluciones probadas y robustas.

## Resumen

Este documento agrupa los criterios y principios técnicos iniciales de NIDO y establece la decisión oficial para NIDO v0.1: desarrollar una Aplicación Web Progresiva (PWA). Se documentan HTML, CSS y JavaScript como tecnologías base, el uso de Service Worker para funcionamiento offline, archivos JSON para contenido configurable, almacenamiento local o IndexedDB para el progreso del estudiante, y una arquitectura modular que separa el motor educativo del contenido. Además, conserva los principios previos de nombres en español, arquitectura limpia, accesibilidad y evitar dependencias innecesarias.
