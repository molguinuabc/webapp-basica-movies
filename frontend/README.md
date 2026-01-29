# Frontend - Gestor de Películas

Aplicación web frontend para gestionar películas, conectada a una API REST backend.

## Características

- **Interfaz Responsiva**: Diseño adaptativo con Bootstrap 5
- **CRUD Completo**: Crear, Leer, Actualizar y Eliminar películas
- **Búsqueda en Tiempo Real**: Buscar películas por término
- **Validación de Formularios**: Validación en cliente y servidor
- **Feedback Visual**: Alertas y notificaciones de estado
- **Sin Dependencias Externas**: Solo HTML, JavaScript y Bootstrap CDN

## Estructura del Proyecto

```
frontend/
├── index.html          # Página principal con estructura HTML
├── app.js             # Lógica JavaScript de la aplicación
└── README.md          # Documentación
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos con Bootstrap 5
- **JavaScript ES6+**: Lógica de la aplicación
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Bootstrap Icons**: Iconografía
- **Fetch API**: Comunicación con el backend

## Funcionalidades

### 1. Listado de Películas
- Tabla con todas las películas
- Información detallada: título, director, año, género, duración, calificación
- Indicadores visuales (badges, estrellas de calificación)
- Ordenamiento natural por fecha de creación

### 2. Formulario de Películas
- **Crear**: Formulario para agregar nuevas películas
- **Editar**: Mismo formulario reutilizado para edición
- **Validación**: 
  - Campos requeridos
  - Rango de años (1888-2030)
  - Duración positiva
  - Calificación entre 0-10
- **Feedback**: Indicadores visuales de validación

### 3. Búsqueda
- Buscar por cualquier término (título, director, género)
- Resultados en tiempo real
- Botón para limpiar búsqueda

### 4. Operaciones CRUD
- **Crear**: POST a `/api/peliculas`
- **Leer**: GET a `/api/peliculas` y `/api/peliculas/:id`
- **Actualizar**: PUT a `/api/peliculas/:id`
- **Eliminar**: DELETE a `/api/peliculas/:id`
- **Buscar**: GET a `/api/peliculas/buscar?q=término`

## Instalación y Uso

### Requisitos Previos
1. El backend debe estar ejecutándose en `http://localhost:3000`
2. Navegador web moderno (Chrome, Firefox, Edge, Safari)

### Ejecución
1. **Iniciar el backend** (en el directorio `backend/`):
   ```bash
   npm run dev
   ```

2. **Abrir el frontend**:
   - Abrir el archivo `index.html` directamente en el navegador
   - O usar un servidor local:
     ```bash
     # Python 3
     python3 -m http.server 8080
     
     # O con npx (Node.js)
     npx serve .
     ```

3. **Acceder a la aplicación**:
   - Si abres directamente: `file:///ruta/al/frontend/index.html`
   - Con servidor local: `http://localhost:8080`

## Estructura del Código

### `index.html`
- Estructura HTML con Bootstrap 5
- Formulario para crear/editar películas
- Tabla para listar películas
- Componentes de búsqueda y estadísticas
- Inclusión de recursos externos (Bootstrap, icons)

### `app.js`
- **Configuración**: URL de la API y estado de la aplicación
- **Manejo de Estado**: Películas, modo edición, película en edición
- **Funciones Principales**:
  - `cargarPeliculas()`: Obtiene todas las películas
  - `buscarPeliculas()`: Busca por término
  - `crearPelicula()`: Crea nueva película
  - `actualizarPelicula()`: Actualiza película existente
  - `eliminarPelicula()`: Elimina película
- **UI Helpers**:
  - `mostrarAlerta()`: Muestra mensajes de estado
  - `mostrarPeliculas()`: Renderiza la tabla
  - `validarFormulario()`: Valida datos del formulario
- **Event Handlers**: Manejo de eventos del formulario y botones

## API Endpoints Utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/peliculas` | Obtener todas las películas |
| GET | `/api/peliculas/buscar?q=término` | Buscar películas |
| GET | `/api/peliculas/:id` | Obtener película por ID |
| POST | `/api/peliculas` | Crear nueva película |
| PUT | `/api/peliculas/:id` | Actualizar película |
| DELETE | `/api/peliculas/:id` | Eliminar película |

## Modelo de Datos

```javascript
{
  "id": 1,
  "titulo": "El Padrino",
  "director": "Francis Ford Coppola",
  "año": 1972,
  "genero": "Drama",
  "duracion": 175,
  "calificacion": 9.2,
  "fecha_creacion": "2023-10-01 10:30:00"
}
```

## Características de UX/UI

### 1. Diseño Responsivo
- Adapta a móviles, tablets y desktop
- Grid system de Bootstrap
- Componentes colapsables en móviles

### 2. Feedback al Usuario
- **Alertas**: Mensajes de éxito/error
- **Validación**: Indicadores en formularios
- **Estados**: Spinners durante carga
- **Confirmaciones**: Para operaciones destructivas

### 3. Navegación
- Scroll suave al formulario
- Botones de acción claros
- Indicadores de estado (contador, badges)

### 4. Accesibilidad
- Etiquetas semánticas
- Atributos ARIA implícitos de Bootstrap
- Navegación por teclado
- Contraste de colores adecuado

## Solución de Problemas

### 1. Error de CORS
Si ves errores de CORS, asegúrate que:
- El backend tenga CORS habilitado (ya está configurado)
- Ambos (frontend y backend) estén en el mismo origen o configurados para CORS

### 2. Backend No Disponible
- Verifica que el backend esté ejecutándose: `http://localhost:3000`
- Revisa la consola del navegador para errores de red
- Asegúrate de que no haya firewalls bloqueando el puerto 3000

### 3. Problemas de Validación
- Los campos marcados con * son obligatorios
- El año debe estar entre 1888 y 2030
- La calificación debe estar entre 0 y 10
- La duración debe ser un número positivo

## Mejoras Futuras

1. **Paginación**: Para listas grandes de películas
2. **Ordenamiento**: Click en cabeceras de tabla para ordenar
3. **Filtros Avanzados**: Por año, género, calificación
4. **Exportación**: Exportar datos a CSV/JSON
5. **Importación**: Cargar películas desde archivo
6. **Autenticación**: Sistema de usuarios
7. **Favoritos**: Marcar películas como favoritas
8. **Comentarios**: Sistema de comentarios/reviews

## Licencia

ISC