# 1. Objetivo de la arquitectura

Esta arquitectura transforma la visión conceptual de NIDO en una estructura técnica mantenible.

Debe respetar:

- Motor educativo separado del contenido.
- Modularidad.
- Escalabilidad.
- Accesibilidad.
- Funcionamiento offline.
- Código en español.

---

# 2. Tecnología seleccionada

Aplicación Web Progresiva (PWA)

Tecnologías base:

- HTML.
- CSS.
- JavaScript.
- JSON.
- Service Worker.
- IndexedDB o almacenamiento local.

Motivos:

- Funciona en celulares, tablets y computadoras.
- Puede instalarse como aplicación.
- Puede funcionar sin conexión.
- Facilita mantenimiento y crecimiento.

---

# 3. Estructura general del proyecto

Definir una estructura conceptual:

NIDO/

aplicacion/

componentes/

pantallas/

motor/

servicios/

modelos/

datos/

utilidades/

estilos/


contenido/

fisica/

matematica/

lengua/

ciencias/


activos/

imagenes/

sonidos/

animaciones/

iconos/

mascotas/


documentacion/

prompts/

pruebas/

---

# 4. Módulo Motor Educativo

Responsabilidades:

- Cargar aventuras.
- Administrar desafíos.
- Evaluar respuestas.
- Controlar dificultad.
- Entregar recompensas.
- Actualizar progreso.

El motor no debe contener contenidos específicos.

---

# 5. Módulo Contenido Educativo

Definir:

Los contenidos serán independientes del código.

Ejemplo:

Física:

- Masa.
- Tiempo.
- Longitud.

Cada contenido puede contener:

- explicación.
- imágenes.
- preguntas.
- ayudas.
- recompensas.

---

# 6. Módulo Estudiante

Responsabilidades:

- Gestionar perfil.
- Mascota elegida.
- Progreso.
- Monedas.
- Inventario.
- Personalización.

---

# 7. Módulo Mascota

Responsabilidades:

- Mostrar expresiones.
- Animaciones.
- Acompañamiento.
- Reacciones.
- Personalidad.

---

# 8. Módulo Adulto Responsable

Responsabilidades:

- Configuración inicial.
- Gestión de estudiantes.
- Control de acceso.
- Configuración general.

---

# 9. Módulo Docente

Responsabilidades:

- Crear aventuras.
- Gestionar grupos.
- Consultar progreso.
- Agregar contenido.

---

# 10. Componentes reutilizables

Definir componentes:

- Botones NIDO.
- Tarjetas.
- Ventanas de diálogo.
- Panel mascota.
- Barra de progreso.
- Selector de opciones.
- Recompensas.

---

# 11. Datos y almacenamiento

Definir almacenamiento:

- Datos del estudiante.
- Progreso.
- Configuración.
- Contenido descargado.

Considerar:

- funcionamiento offline.
- sincronización futura.

---

# 12. Accesibilidad

Incluir:

- textos simples.
- imágenes claras.
- sonidos.
- botones grandes.
- pocas opciones simultáneas.
- navegación sencilla.

---

# 13. Principios técnicos

Agregar:

- No crear código innecesario.
- Reutilizar componentes.
- Mantener separación entre módulos.
- Evitar dependencias sin justificar.
- Mantener nombres en español.
- Documentar decisiones importantes.
