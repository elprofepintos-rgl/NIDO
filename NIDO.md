# NIDO

## Identidad del proyecto

NIDO es una aplicación web progresiva educativa que utiliza una mascota virtual para acompañar estudiantes mediante experiencias interactivas.

## Filosofía

- El estudiante siempre debe sentirse acompañado.
- Aprender debe ser una experiencia positiva.
- La tecnología debe adaptarse a la persona.
- La accesibilidad es obligatoria.
- El error forma parte del aprendizaje.

## Arquitectura general

NIDO se sustenta en dos capas claras: motor educativo y contenido educativo.

- El motor educativo define la lógica y la experiencia.
- El contenido educativo es configurable y puede crecer sin cambiar el motor.
- El motor no debe depender de una materia específica.

## Tecnología

- Aplicación Web Progresiva (PWA).
- HTML.
- CSS.
- JavaScript.
- Service Worker.
- Datos configurables mediante JSON.
- Funcionamiento offline.

## Idioma del proyecto

Todo en español:

- Carpetas.
- Archivos.
- Variables.
- Clases.
- Funciones.
- Comentarios.
- Documentación.

## Roles

- Adulto Responsable.
- Docente.
- Estudiante.

## Mascota

Pipo es el compañero virtual que guía, motiva y acompaña al estudiante durante las aventuras educativas.

## Sistema de identidad del estudiante

- El estudiante no ingresa directamente al contenido educativo desde el primer ingreso.
- El primer ingreso de NIDO debe ofrecer una selección inicial de rol: Adulto Responsable o Docente.
- Cuando el sistema aún no tiene una configuración establecida, debe aparecer la pregunta: "¿Quién está ingresando?" con opciones para Adulto Responsable y Docente.
- La configuración inicial pertenece al Adulto Responsable o al Docente.
- El Adulto Responsable crea y configura el perfil del estudiante, su espacio y sus preferencias iniciales.
- El Docente gestiona el inicio docente, grupos y experiencias educativas.
- Una vez configurado, el estudiante accede directamente a su espacio personal dentro de NIDO.
- El estudiante debe elegir una mascota compañera.
- La mascota representa acompañamiento emocional y educativo.
- La mascota acompaña explicaciones, desafíos, celebraciones y errores.
- La mascota no es un premio, es un compañero de aprendizaje.
- Regla conceptual: el estudiante nunca debe atravesar la configuración administrativa para poder aprender.

## Mundo personal del estudiante

- Mi NIDO como espacio personal.
- Mascota.
- Aventuras.
- Progreso.
- Monedas.
- Recompensas.
- Inventario.
- Personalización.

## Reglas para la IA

La IA debe:

- Leer documentación antes de crear.
- No improvisar funcionalidades.
- No cambiar arquitectura sin autorización.
- Priorizar simplicidad y mantenimiento.
- Crear código reutilizable.
- Evitar dependencias innecesarias.
- Respetar accesibilidad.

## Forma de trabajo

Siempre seguir:

1. Especificación funcional.
2. Diseño.
3. Diseño técnico.
4. Implementación.
5. Pruebas.
6. Aprobación.
