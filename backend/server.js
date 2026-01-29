import express from 'express';
import peliculasRoutes from './routes/peliculas.routes.js';
import { inicializarBaseDeDatos } from './config/database.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas
app.use('/api/peliculas', peliculasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Películas funcionando' });
});

// Inicializar la base de datos y luego iniciar el servidor
inicializarBaseDeDatos()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}/api/peliculas`);
    });
  })
  .catch((error) => {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  });

export default app;