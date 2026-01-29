import { Router } from 'express';
import { PeliculaController } from '../controllers/pelicula.controller.js';

const router = Router();
router.use((res, req, next) => {
    console.log(`Petición recibida en /api/peliculas: ${res.method} ${res.url}`);
    next();
})

// Ruta para obtener todas las películas
router.get('/', PeliculaController.obtenerTodas);

// Ruta para buscar películas por término
router.get('/buscar', PeliculaController.buscar);

// Ruta para obtener una película por ID
router.get('/:id', PeliculaController.obtenerPorId);

// Ruta para crear una nueva película
router.post('/', PeliculaController.crear);

// Ruta para actualizar una película existente
router.put('/:id', PeliculaController.actualizar);

// Ruta para eliminar una película
router.delete('/:id', PeliculaController.eliminar);

export default router;