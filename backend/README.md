# API REST para Gestión de Películas

API REST desarrollada con Node.js, Express y SQLite para gestionar datos de películas.

## Características

- CRUD completo para películas
- Base de datos SQLite integrada
- Validación de datos
- Búsqueda por término
- Código modular con separación de responsabilidades
- ES6 Modules

## Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de la base de datos
├── controllers/
│   └── pelicula.controller.js # Controladores de la API
├── models/
│   └── pelicula.model.js    # Modelo de datos
├── routes/
│   └── peliculas.routes.js  # Definición de rutas
├── database/
│   └── peliculas.db         # Base de datos SQLite
├── server.js                # Punto de entrada
├── package.json             # Dependencias y scripts
└── README.md               # Documentación
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

## Ejecución

### Desarrollo (con recarga automática):

```bash
npm run dev
```

### Producción:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints de la API

### Obtener todas las películas
```
GET /api/peliculas
```

### Buscar películas
```
GET /api/peliculas/buscar?q=término
```

### Obtener una película por ID
```
GET /api/peliculas/:id
```

### Crear una nueva película
```
POST /api/peliculas
```
**Body (JSON):**
```json
{
  "titulo": "Nombre de la película",
  "director": "Nombre del director",
  "anio": 2023,
  "genero": "Género",
  "duracion": 120,
  "calificacion": 8.5
}
```

### Actualizar una película
```
PUT /api/peliculas/:id
```
**Body (JSON):** Campos a actualizar

### Eliminar una película
```
DELETE /api/peliculas/:id
```

## Modelo de Datos

```javascript
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

## Validaciones

- `titulo`, `director`, `anio`, `genero`: Requeridos
- `anio`: Número válido (1888 - año actual + 5)
- `duracion`: Número positivo (opcional)
- `calificacion`: Número entre 0 y 10 (opcional)

## Ejemplos de Uso

### Obtener todas las películas:
```bash
curl http://localhost:3000/api/peliculas
```

### Crear una película:
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

### Buscar películas:
```bash
curl "http://localhost:3000/api/peliculas/buscar?q=nolan"
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript
- **Express**: Framework web para Node.js
- **SQLite3**: Base de datos ligera
- **ES6 Modules**: Sistema de módulos moderno

## Licencia

ISC