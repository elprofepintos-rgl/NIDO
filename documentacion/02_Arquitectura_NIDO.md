# Arquitectura NIDO

## 1. Principios arquitectónicos

La arquitectura de NIDO se fundamenta en los siguientes principios:

- modularidad: cada parte del sistema debe cumplir una función clara y poder evolucionar de forma independiente.
- escalabilidad: el sistema debe permitir incorporar nuevas aventuras, materias y recursos sin alterar la base del motor.
- separación entre motor y contenido: el motor educativo permanece estable mientras el contenido puede crecer y cambiar.
- mantenimiento: la estructura debe facilitar la comprensión, la revisión y la evolución del proyecto.
- accesibilidad: la experiencia debe ser simple, comprensible y usable para distintos estudiantes.

## 2. Visión general

NIDO está compuesto por un motor educativo y contenidos configurables.

Modelo:

NIDO

Motor educativo
+
Contenido educativo

El motor educativo define la lógica del aprendizaje, la progresión y la interacción. El contenido educativo aporta las experiencias, preguntas, actividades y materiales propios de cada tema.

## 3. Motor educativo

El motor educativo es el núcleo de NIDO. Sus responsabilidades principales son:

- administrar aventuras,
- presentar desafíos,
- evaluar respuestas,
- entregar recompensas,
- controlar progreso.

Este módulo debe ser estable y reusable, sin depender de un contenido específico.

## 4. Sistema de aventuras

Una aventura es una secuencia educativa organizada con intención pedagógica y narrativa.

Ejemplo:

Aventura: "Descubriendo las magnitudes"

Elementos de una aventura:

- historia,
- objetivos,
- desafíos,
- recompensas.

Cada aventura puede estar compuesta por varias actividades, cada una orientada a un aprendizaje concreto.

## 5. Sistema de contenidos

Los contenidos deben ser independientes del código. Esto significa que las experiencias educativas se pueden crear y modificar sin alterar el funcionamiento del motor.

Ejemplo:

Física:

- masa,
- longitud,
- tiempo.

El sistema debe permitir incorporar nuevos contenidos como Matemática, Lengua, Ciencias, Historia, Música o Inglés, sin modificar la base del motor.

## 6. Sistema de estudiante

El sistema de estudiante organiza la información relacionada con la persona que aprende.

Incluye:

- perfil,
- progreso,
- logros,
- preferencias.

Esta información permite adaptar la experiencia y mantener una continuidad en el aprendizaje.

## 7. Sistema de mascota

El sistema de mascota representa a Pipo como un personaje central dentro de la experiencia.

Incluye:

- personaje,
- emociones,
- estados,
- animaciones,
- accesorios.

Su función es acompañar, motivar y dar identidad emocional a la experiencia educativa.

## 8. Sistema de recompensas

El sistema de recompensas refuerza el progreso y la motivación del estudiante.

Puede incluir:

- monedas,
- objetos,
- logros,
- personalización.

Estas recompensas ayudan a reforzar el sentido de avance y participación.

## 9. Sistema audiovisual

El sistema audiovisual apoya la comprensión y la emoción de la experiencia.

Incluye:

- imágenes,
- sonidos,
- voces,
- animaciones.

El objetivo es que la experiencia sea más clara, atractiva y memorable.

## 10. Interfaz del estudiante

La interfaz del estudiante debe ser:

- simple,
- visual,
- accesible,
- intuitiva.

Su diseño debe favorecer la comprensión inmediata y reducir la carga cognitiva del usuario.

## 11. Flujo general de funcionamiento

El funcionamiento general de NIDO puede describirse de la siguiente manera:

1. Ingreso del estudiante.
2. Encuentro con Pipo.
3. Selección de aventura.
4. Actividad educativa.
5. Respuesta.
6. Retroalimentación.
7. Recompensa.
8. Guardado de progreso.

Este flujo permite una experiencia guiada, progresiva y motivadora.

## 12. Preparación para futuro crecimiento

La arquitectura de NIDO está preparada para crecer hacia:

- nuevas materias,
- nuevos contenidos,
- nuevos personajes,
- nuevos docentes.

La estructura modular facilita que el proyecto evolucione sin perder coherencia ni estabilidad.

## Resumen

La arquitectura de NIDO propone un sistema modular, estable y escalable, donde el motor educativo sostiene la experiencia y el contenido educativo puede crecer de forma independiente. Esta organización permite construir una propuesta educativa sólida, adaptable y preparada para el futuro.
