# Sistema Completo: Frontend + Backend para Gestión de Películas

Este proyecto consiste en una aplicación web completa para gestionar películas, con un backend API REST y un frontend web.

## Estructura del Proyecto

```
webapp-basica-movies/
├── backend/          # API REST con Node.js, Express y SQLite
└── frontend/         # Aplicación web con HTML, JavaScript y Bootstrap
```

## Requisitos Previos

- Node.js 14.0 o superior
- Navegador web moderno

## Instalación y Configuración

### 1. Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor backend
npm run dev
```

El backend estará disponible en: `http://localhost:3000`

### 2. Configurar el Frontend

**Opción A: Abrir directamente en el navegador**
```bash
# Navegar al directorio frontend
cd frontend

# Abrir index.html en el navegador
# En Linux:
xdg-open index.html
# En macOS:
open index.html
# En Windows:
start index.html
```

**Opción B: Usar servidor Node.js (recomendado)**
```bash
# Navegar al directorio frontend
cd frontend

# Iniciar servidor frontend
npm start
```

El frontend estará disponible en: `http://localhost:8181`

## Verificación del Sistema

### 1. Verificar que el backend funciona:
```bash
# Desde otra terminal, probar la API
curl http://localhost:3000/api/peliculas
```

Deberías ver una respuesta JSON con las películas de ejemplo.

### 2. Verificar que el frontend funciona:
- Abre `http://localhost:8181` en tu navegador
- Deberías ver la interfaz del gestor de películas
- Las películas de ejemplo deberían cargarse automáticamente

## Uso de la Aplicación

### 1. Ver Películas
- Al abrir la aplicación, se muestran todas las películas
- Cada película muestra: título, director, año, género, duración y calificación

### 2. Crear Nueva Película
1. Completa el formulario en la parte superior
2. Los campos con * son obligatorios
3. Haz clic en "Guardar Película"
4. La nueva película aparecerá en la lista

### 3. Editar Película
1. Haz clic en el botón "Editar" de cualquier película
2. El formulario se llenará con los datos de la película
3. Modifica los campos necesarios
4. Haz clic en "Actualizar Película"

### 4. Eliminar Película
1. Haz clic en el botón "Eliminar" de cualquier película
2. Confirma la eliminación en el diálogo
3. La película se eliminará de la lista

### 5. Buscar Películas
1. Escribe un término en el campo de búsqueda
2. Presiona Enter o haz clic en el botón "Buscar"
3. Se mostrarán solo las películas que coincidan
4. Usa el botón "X" para limpiar la búsqueda

## Solución de Problemas Comunes

### 1. Error: "No se pudieron cargar las películas"
- Verifica que el backend esté ejecutándose (`npm run dev` en backend/)
- Asegúrate de que no haya errores en la terminal del backend
- Verifica que puedas acceder a `http://localhost:3000/api/peliculas` en tu navegador

### 2. Error de CORS
- El backend ya tiene CORS configurado
- Si usas el frontend desde `file://`, algunos navegadores pueden bloquear las peticiones
- **Solución**: Usa el servidor frontend (`npm start` en frontend/)

### 3. El formulario no envía datos
- Verifica que todos los campos requeridos estén completos
- Revisa la consola del navegador (F12 > Consola) para errores
- Asegúrate de que el backend esté recibiendo las peticiones

### 4. Los cambios no se guardan
- Verifica que la base de datos tenga permisos de escritura
- Revisa los logs del backend para errores de SQLite
- Asegúrate de que el archivo `database/peliculas.db` exista

## Endpoints de la API (Backend)

### GET `/api/peliculas`
- Obtiene todas las películas
- **Ejemplo**: `curl http://localhost:3000/api/peliculas`

### GET `/api/peliculas/buscar?q=término`
- Busca películas por término
- **Ejemplo**: `curl "http://localhost:3000/api/peliculas/buscar?q=drama"`

### GET `/api/peliculas/:id`
- Obtiene una película por ID
- **Ejemplo**: `curl http://localhost:3000/api/peliculas/1`

### POST `/api/peliculas`
- Crea una nueva película
- **Ejemplo**:
```bash
curl -X POST http://localhost:3000/api/peliculas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Inception",
    "director": "Christopher Nolan",
    "anio": 2010,
    "genero": "Ciencia Ficción",
    "duracion": 148,
    "calificacion": 8.8
  }'
```

### PUT `/api/peliculas/:id`
- Actualiza una película existente
- **Ejemplo**:
```bash
curl -X PUT http://localhost:3000/api/peliculas/1 \
  -H "Content-Type: application/json" \
  -d '{"calificacion": 9.5}'
```

### DELETE `/api/peliculas/:id`
- Elimina una película
- **Ejemplo**: `curl -X DELETE http://localhost:3000/api/peliculas/1`

## Estructura de Datos

### Película (JSON)
```json
{
  "id": 1,
  "titulo": "El Padrino",
  "director": "Francis Ford Coppola",
  "anio": 1972,
  "genero": "Drama",
  "duracion": 175,
  "calificacion": 9.2,
  "fecha_creacion": "2023-10-01 10:30:00"
}
```

## Características Técnicas

### Backend
- **Framework**: Express.js
- **Base de datos**: SQLite3
- **Validación**: En controladores
- **Arquitectura**: MVC (Modelo-Vista-Controlador)
- **Módulos**: ES6 Modules

### Frontend
- **Tecnologías**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5
- **Comunicación**: Fetch API
- **Validación**: Cliente y servidor
- **Diseño**: Responsive

## Desarrollo

### Modo Desarrollo Backend
```bash
cd backend
npm run dev  # Recarga automática con nodemon
```

### Modo Desarrollo Frontend
```bash
cd frontend
# Edita los archivos y refresca el navegador
# Los cambios se reflejan inmediatamente
```

### Pruebas
```bash
# Backend
cd backend
node test-api.js

# Frontend
# Abre la consola del navegador (F12)
# Verifica que no haya errores
```

## Despliegue

### Backend en Producción
```bash
cd backend
npm start
```

### Frontend en Producción
- Los archivos estáticos pueden servirse desde cualquier servidor web
- Asegúrate de actualizar `API_URL` en `app.js` si cambia la ubicación del backend

## Licencia

ISC