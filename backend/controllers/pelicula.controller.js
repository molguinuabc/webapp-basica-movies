import { PeliculaModel } from '../models/pelicula.model.js';

export class PeliculaController {
  // Obtener todas las películas
  static async obtenerTodas(req, res) {
    try {
      const peliculas = await PeliculaModel.obtenerTodas();
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener películas',
        mensaje: error.message 
      });
    }
  }

  // Obtener una película por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await PeliculaModel.obtenerPorId(id);
      
      if (!pelicula) {
        return res.status(404).json({ 
          error: 'Película no encontrada',
          mensaje: `No se encontró una película con ID ${id}`
        });
      }
      
      res.json(pelicula);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener película',
        mensaje: error.message 
      });
    }
  }

  // Crear una nueva película
  static async crear(req, res) {
    try {
      const { titulo, director, anio, genero, duracion, calificacion } = req.body;
      
      // Validar campos requeridos
      if (!titulo || !director || !anio || !genero) {
        return res.status(400).json({ 
          error: 'Datos incompletos',
          mensaje: 'Los campos titulo, director, anio y genero son requeridos'
        });
      }
      
      // Validar tipos de datos
      if (typeof anio !== 'number' || anio < 1888 || anio > new Date().getFullYear() + 5) {
        return res.status(400).json({ 
          error: 'Año inválido',
          mensaje: 'El año debe ser un número válido'
        });
      }
      
      if (duracion && (typeof duracion !== 'number' || duracion <= 0)) {
        return res.status(400).json({ 
          error: 'Duración inválida',
          mensaje: 'La duración debe ser un número positivo'
        });
      }
      
      if (calificacion && (typeof calificacion !== 'number' || calificacion < 0 || calificacion > 10)) {
        return res.status(400).json({ 
          error: 'Calificación inválida',
          mensaje: 'La calificación debe estar entre 0 y 10'
        });
      }
      
      const nuevaPelicula = { titulo, director, anio, genero, duracion, calificacion };
      const peliculaCreada = await PeliculaModel.crear(nuevaPelicula);
      
      res.status(201).json({
        mensaje: 'Película creada exitosamente',
        pelicula: peliculaCreada
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al crear película',
        mensaje: error.message 
      });
    }
  }

  // Actualizar una película existente
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;
      
      // Validar que haya datos para actualizar
      if (Object.keys(datosActualizados).length === 0) {
        return res.status(400).json({ 
          error: 'Datos inválidos',
          mensaje: 'No se proporcionaron datos para actualizar'
        });
      }
      
      // Validar tipos de datos si se proporcionan
      if (datosActualizados.anio && (typeof datosActualizados.anio !== 'number' || datosActualizados.anio < 1888)) {
        return res.status(400).json({ 
          error: 'Año inválido',
          mensaje: 'El año debe ser un número válido'
        });
      }
      
      if (datosActualizados.duracion && (typeof datosActualizados.duracion !== 'number' || datosActualizados.duracion <= 0)) {
        return res.status(400).json({ 
          error: 'Duración inválida',
          mensaje: 'La duración debe ser un número positivo'
        });
      }
      
      if (datosActualizados.calificacion && (typeof datosActualizados.calificacion !== 'number' || datosActualizados.calificacion < 0 || datosActualizados.calificacion > 10)) {
        return res.status(400).json({ 
          error: 'Calificación inválida',
          mensaje: 'La calificación debe estar entre 0 y 10'
        });
      }
      
      const actualizado = await PeliculaModel.actualizar(id, datosActualizados);
      
      if (!actualizado) {
        return res.status(404).json({ 
          error: 'Película no encontrada',
          mensaje: `No se encontró una película con ID ${id} para actualizar`
        });
      }
      
      res.json({
        mensaje: 'Película actualizada exitosamente',
        id: id,
        datosActualizados: datosActualizados
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al actualizar película',
        mensaje: error.message 
      });
    }
  }

  // Eliminar una película
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await PeliculaModel.eliminar(id);
      
      if (!eliminado) {
        return res.status(404).json({ 
          error: 'Película no encontrada',
          mensaje: `No se encontró una película con ID ${id} para eliminar`
        });
      }
      
      res.json({
        mensaje: 'Película eliminada exitosamente',
        id: id
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al eliminar película',
        mensaje: error.message 
      });
    }
  }

  // Buscar películas por término
  static async buscar(req, res) {
    try {
      const { q } = req.query;
      
      if (!q || q.trim() === '') {
        return res.status(400).json({ 
          error: 'Término de búsqueda requerido',
          mensaje: 'Debe proporcionar un término de búsqueda (parámetro q)'
        });
      }
      
      const peliculas = await PeliculaModel.buscar(q.trim());
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al buscar películas',
        mensaje: error.message 
      });
    }
  }
}