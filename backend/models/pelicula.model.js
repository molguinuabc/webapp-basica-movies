import { obtenerConexion } from '../config/database.js';

export class PeliculaModel {
  // Obtener todas las películas
  static async obtenerTodas() {
    try {
      const db = await obtenerConexion();
      const peliculas = await db.all('SELECT * FROM peliculas ORDER BY fecha_creacion DESC');
      await db.close();
      return peliculas;
    } catch (error) {
      console.error('Error al obtener películas:', error);
      throw error;
    }
  }

  // Obtener una película por ID
  static async obtenerPorId(id) {
    try {
      const db = await obtenerConexion();
      const pelicula = await db.get('SELECT * FROM peliculas WHERE id = ?', id);
      await db.close();
      return pelicula;
    } catch (error) {
      console.error(`Error al obtener película con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear una nueva película
  static async crear(pelicula) {
    try {
      const { titulo, director, año, genero, duracion, calificacion } = pelicula;
      
      const db = await obtenerConexion();
      const resultado = await db.run(
        'INSERT INTO peliculas (titulo, director, año, genero, duracion, calificacion) VALUES (?, ?, ?, ?, ?, ?)',
        [titulo, director, año, genero, duracion, calificacion]
      );
      
      await db.close();
      return { id: resultado.lastID, ...pelicula };
    } catch (error) {
      console.error('Error al crear película:', error);
      throw error;
    }
  }

  // Actualizar una película existente
  static async actualizar(id, datosActualizados) {
    try {
      const db = await obtenerConexion();
      
      // Construir la consulta dinámicamente
      const campos = [];
      const valores = [];
      
      for (const [campo, valor] of Object.entries(datosActualizados)) {
        if (valor !== undefined) {
          campos.push(`${campo} = ?`);
          valores.push(valor);
        }
      }
      
      if (campos.length === 0) {
        throw new Error('No hay datos para actualizar');
      }
      
      valores.push(id);
      const consulta = `UPDATE peliculas SET ${campos.join(', ')} WHERE id = ?`;
      
      const resultado = await db.run(consulta, valores);
      await db.close();
      
      return resultado.changes > 0;
    } catch (error) {
      console.error(`Error al actualizar película con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una película
  static async eliminar(id) {
    try {
      const db = await obtenerConexion();
      const resultado = await db.run('DELETE FROM peliculas WHERE id = ?', id);
      await db.close();
      return resultado.changes > 0;
    } catch (error) {
      console.error(`Error al eliminar película con ID ${id}:`, error);
      throw error;
    }
  }

  // Buscar películas por término
  static async buscar(termino) {
    try {
      const db = await obtenerConexion();
      const peliculas = await db.all(
        `SELECT * FROM peliculas 
         WHERE titulo LIKE ? OR director LIKE ? OR genero LIKE ?
         ORDER BY fecha_creacion DESC`,
        [`%${termino}%`, `%${termino}%`, `%${termino}%`]
      );
      await db.close();
      return peliculas;
    } catch (error) {
      console.error(`Error al buscar películas con término "${termino}":`, error);
      throw error;
    }
  }
}