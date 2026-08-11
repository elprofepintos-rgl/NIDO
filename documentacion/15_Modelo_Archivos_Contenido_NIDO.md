# 1. Objetivo

Explicar que el contenido educativo está separado del motor de la aplicación.

El contenido educativo de NIDO se almacena como archivos configurables independientes del motor, lo que permite que el motor interprete y ejecute experiencias sin contener datos específicos.

# 2. Principio fundamental

"El motor sabe cómo enseñar, pero el contenido define qué enseñar."

Este principio establece que el motor educativo maneja la lógica de enseñanza, mientras que los archivos de contenido describen las aventuras, los desafíos y los recursos pedagógicos.

# 3. Organización general

Definir una estructura:

contenido/

├── fisica/
├── matematica/
├── lengua/
├── ciencias/

Explicación de cada carpeta:

- `fisica/`: contiene los temas y aventuras de la materia de Física.
- `matematica/`: agrupa los temas y aventuras de Matemática.
- `lengua/`: incluye las aventuras relacionadas con Lengua.
- `ciencias/`: contiene contenidos de Ciencias.

Cada carpeta de materia organiza el contenido en temas y aventuras configurables.

# 4. Estructura de una materia

Ejemplo:

contenido/

fisica/

masa/

longitud/

tiempo/

Explicación:

Cada tema en una materia contiene sus propias aventuras. Por ejemplo, el tema `masa/` incluye aventuras relacionadas con la masa, cada una en su propia carpeta.

# 5. Estructura de una aventura

Definir:

aventura_001/

├── aventura.json
├── imagenes/
├── sonidos/
├── animaciones/

Explicación de cada elemento:

- `aventura.json`: archivo principal que describe la aventura y sus desafíos.
- `imagenes/`: recursos visuales utilizados en la aventura.
- `sonidos/`: efectos de audio y pistas auditivas específicos de la aventura.
- `animaciones/`: secuencias animadas que apoyan la experiencia.

# 6. Modelo conceptual de aventura

Debe contener:

- identificador
- nombre
- descripción
- materia
- tema
- nivel
- edad recomendada
- objetivos educativos
- personaje acompañante
- desafíos
- recompensas

Este modelo define la estructura de los datos que describe cada aventura y permite que el motor educativo procese la experiencia.

# 7. Modelo conceptual de desafío

Debe incluir:

- pregunta
- imagen
- audio
- opciones
- respuesta correcta
- explicación
- ayuda
- repetición adaptativa

Cada desafío describe la interacción concreta que vivirá el estudiante dentro de la aventura.

# 8. Tipos de actividades

Documentar ejemplos:

- elegir imagen correcta.
- ordenar elementos.
- comparar tamaños.
- asociar instrumento con magnitud.
- escuchar y responder.

Estos tipos de actividades permiten diversificar el aprendizaje y usar distintos modos de interacción.

# 9. Recursos multimedia

Definir:

- imágenes.
- sonidos.
- voces.
- animaciones.

Los recursos multimedia se almacenan junto con las aventuras y se referencian desde sus archivos de configuración para enriquecer la experiencia.

# 10. Adaptación al estudiante

Explicar cómo el contenido podrá ajustarse según:

- progreso.
- dificultad.
- errores frecuentes.
- preferencias.

El modelo de archivos debe permitir que el motor decida repetir, simplificar o reforzar contenidos según el desempeño y las necesidades del estudiante.

# 11. Compatibilidad con modo docente

Explicar cómo un docente podrá:

- crear aventuras.
- modificar contenido.
- agregar materias.
- compartir contenido.

La estructura de archivos facilita que el modo docente trabaje sobre contenidos configurables sin cambiar la lógica del motor.

# 12. Reglas para IA y desarrolladores

Incluir:

- no mezclar código y contenido.
- respetar estructura.
- no crear formatos propios.
- documentar nuevos tipos de contenido.

## Resumen de decisión

Este modelo permitirá que NIDO crezca como plataforma educativa sin modificar el motor principal.
