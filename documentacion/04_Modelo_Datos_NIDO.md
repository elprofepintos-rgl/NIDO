# Modelo de Datos NIDO

## 1. Principios

El modelo de datos de NIDO sigue la separación entre motor educativo y contenido educativo.

- Separación entre datos y código
  - El motor educativo interpreta la información sin incluir el contenido en su lógica fija.
  - El contenido educativo se define como datos configurables que el motor consume.

- Contenido configurable
  - Las aventuras, desafíos, perfiles y configuraciones deben poder adaptarse sin tocar el motor.
  - El modelo se basa en estructuras declarativas que describen el comportamiento esperado.

- Crecimiento futuro
  - El diseño permite incorporar nuevas entidades y relaciones sin rehacer la base del sistema.
  - El motor permanece estable mientras el contenido y la gestión se expanden.

## 2. Gestión de personas

### AdultoResponsable

Representa al adulto que configura y acompaña la experiencia.

Datos conceptuales:
- Identificador
  - id único del adulto responsable.
- Nombre
  - nombre completo o seudónimo.
- Método de acceso
  - credenciales o forma de autenticación.
- Configuraciones permitidas
  - qué ajustes puede cambiar (tiempo de uso, accesibilidad, perfiles).
- Estudiantes asociados
  - lista de estudiantes bajo su cuidado.

### Docente

Representa al profesional educativo.

Datos conceptuales:
- Identificador
  - id único del docente.
- Nombre
  - nombre completo.
- Institución
  - centro educativo, escuela o institución asociada.
- Grupos asociados
  - conjuntos de estudiantes o cursos que administra.
- Aventuras creadas
  - aventuras y contenidos pedagógicos que ha generado.

### Estudiante

Representa al usuario principal de NIDO.

Datos conceptuales:
- Identificador
  - id único del estudiante.
- Nombre
  - nombre o alias.
- Datos configurados por adulto responsable
  - configuraciones iniciales, accesibilidad y preferencias establecidas por el adulto.
- Mascota elegida
  - mascota compañera seleccionada por el estudiante.
- Progreso educativo
  - registro de avance en aventuras, resultados y logros.
- Monedas
  - unidades de recompensa acumulables.
- Inventario
  - objetos y elementos coleccionables del estudiante.
- Personalización
  - ajustes de apariencia y preferencias individuales.

## 3. Experiencia educativa

### Mascota

Representa el compañero virtual.

Debe incluir:
- Identificador
  - id único de la mascota.
- Nombre
  - nombre del personaje.
- Especie
  - tipo de mascota o personaje.
- Personalidad
  - rasgos que definen su forma de acompañar.
- Expresiones
  - emociones visuales y verbales.
- Animaciones
  - movimientos y reacciones durante la experiencia.
- Accesorios disponibles
  - objetos que puede usar o equipar.
- Relación con estudiante
  - vínculo de apoyo emocional y educativo.

### Aventura

Unidad educativa principal.

Debe incluir:
- Nombre
  - título de la aventura.
- Materia
  - área de conocimiento asociada.
- Tema
  - subtema específico.
- Nivel
  - grado de dificultad o etapa educativa.
- Objetivos
  - metas pedagógicas esperadas.
- Desafíos
  - actividades que componen la aventura.
- Recompensas
  - incentivos asociados a la participación y logro.

### Desafío

Actividad dentro de una aventura.

Debe incluir:
- Pregunta
  - enunciado principal.
- Imagen
  - recurso visual de apoyo.
- Audio
  - soporte sonoro opcional.
- Opciones
  - posibles respuestas o interacciones.
- Respuesta correcta
  - criterio de solución.
- Explicación
  - retroalimentación y razonamiento.
- Adaptación
  - ajuste de dificultad o repetición según el estudiante.

### Progreso

Debe registrar:
- Aventuras realizadas
  - seguimiento de las aventuras completadas o en curso.
- Respuestas
  - resultados y patrones de respuestas del estudiante.
- Avances
  - logros, hitos y niveles alcanzados.
- Dificultades
  - áreas donde requiere apoyo.
- Recomendaciones
  - sugerencias pedagógicas basadas en el desempeño.

### Recompensa

Debe incluir:
- Monedas
  - unidades acumulables por logro.
- Objetos
  - elementos coleccionables o funcionales.
- Accesorios
  - artículos para personalizar la mascota u otros elementos.
- Logros
  - reconocimientos y distintivos por avance.

## 4. Configuración

### Grupo

Representa una organización de estudiantes.

Ejemplo:
- Curso escolar.

Debe permitir:
- Asociación de estudiantes.
- Asociación de docentes.
- Organización de aventuras.

### Configuración

Representa preferencias del sistema.

Ejemplos:
- Tiempo diario
  - límite o recomendaciones de uso.
- Accesibilidad
  - opciones de soporte visual, auditivo o de navegación.
- Sonidos
  - volumen y presencia de audio en la experiencia.
- Tamaño visual
  - escalado de texto y botones.
- Nivel de ayuda
  - grado de orientación ofrecido al estudiante.

## 5. Relaciones entre entidades

- AdultoResponsable → Estudiante
- Docente → Grupo
- Grupo → Estudiantes
- Estudiante → Mascota
- Mascota → Progreso educativo
- Estudiante → Progreso
- Aventura → Desafíos
- Desafío → Recompensas
- ConfiguraciónInicial → AdultoResponsable
- ConfiguraciónInicial → Docente
- ConfiguraciónInicial → Estudiante
- Estudiante → EstadoAcceso
- EstadoAcceso → MiNIDO

## Resumen

El modelo conceptual de NIDO ahora incorpora la gestión de personas con AdultoResponsable, Docente y Estudiante; la experiencia educativa con Mascota, Aventura, Desafío, Progreso y Recompensa; y la configuración de Grupo y Configuración. Estas entidades siguen el principio de mantener separado el motor educativo del contenido educativo, con relaciones claras que soportan supervisión, creación y seguimiento pedagógico.
