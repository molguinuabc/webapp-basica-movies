import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Configuración de la base de datos
const configBaseDeDatos = {
  filename: './database/peliculas.db',
  driver: sqlite3.Database
};

// Función para inicializar la base de datos
export async function inicializarBaseDeDatos() {
  try {
    const db = await open(configBaseDeDatos);
    
    // Crear tabla de películas si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS peliculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        director TEXT NOT NULL,
        año INTEGER NOT NULL,
        genero TEXT NOT NULL,
        duracion INTEGER,
        calificacion REAL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Base de datos inicializada correctamente');
    
    // Insertar datos de ejemplo si la tabla está vacía
    const conteo = await db.get('SELECT COUNT(*) as total FROM peliculas');
    
    if (conteo.total === 0) {
      await db.exec(`
        INSERT INTO peliculas (titulo, director, año, genero, duracion, calificacion) VALUES
        ('El Padrino', 'Francis Ford Coppola', 1972, 'Drama', 175, 9.2),
        ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crimen', 154, 8.9),
        ('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', 2003, 'Fantasía', 201, 8.9),
        ('Matrix', 'Lana y Lilly Wachowski', 1999, 'Ciencia Ficción', 136, 8.7),
        ('Parásitos', 'Bong Joon-ho', 2019, 'Drama', 132, 8.6)
      `);
      console.log('Datos de ejemplo insertados');
    }
    
    await db.close();
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// Función para obtener conexión a la base de datos
export async function obtenerConexion() {
  return await open(configBaseDeDatos);
}