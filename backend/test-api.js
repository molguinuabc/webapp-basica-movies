// Script de prueba para la API de películas
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/peliculas';

async function probarAPI() {
  console.log('=== Probando API de Películas ===\n');

  try {
    // 1. Obtener todas las películas
    console.log('1. Obteniendo todas las películas...');
    const respuestaTodas = await fetch(API_URL);
    const peliculas = await respuestaTodas.json();
    console.log(`   Encontradas ${Array.isArray(peliculas) ? peliculas.length : 0} películas\n`);

    // 2. Buscar películas
    console.log('2. Buscando películas con "drama"...');
    const respuestaBusqueda = await fetch(`${API_URL}/buscar?q=drama`);
    const resultadosBusqueda = await respuestaBusqueda.json();
    console.log(`   Encontradas ${Array.isArray(resultadosBusqueda) ? resultadosBusqueda.length : 0} películas\n`);

    // 3. Crear una nueva película
    console.log('3. Creando nueva película...');
    const nuevaPelicula = {
      titulo: "Interstellar",
      director: "Christopher Nolan",
      año: 2014,
      genero: "Ciencia Ficción",
      duracion: 169,
      calificacion: 8.6
    };

    const respuestaCrear = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaPelicula)
    });
    
    const peliculaCreada = await respuestaCrear.json();
    console.log(`   Película creada: ${peliculaCreada.mensaje}`);
    const idNuevaPelicula = peliculaCreada.pelicula?.id;
    console.log(`   ID de la nueva película: ${idNuevaPelicula}\n`);

    // 4. Obtener la película recién creada
    if (idNuevaPelicula) {
      console.log(`4. Obteniendo película con ID ${idNuevaPelicula}...`);
      const respuestaObtener = await fetch(`${API_URL}/${idNuevaPelicula}`);
      const peliculaObtenida = await respuestaObtener.json();
      console.log(`   Título: ${peliculaObtenida.titulo}`);
      console.log(`   Director: ${peliculaObtenida.director}\n`);
    }

    // 5. Actualizar la película
    if (idNuevaPelicula) {
      console.log(`5. Actualizando película con ID ${idNuevaPelicula}...`);
      const datosActualizacion = {
        calificacion: 8.7,
        duracion: 170
      };

      const respuestaActualizar = await fetch(`${API_URL}/${idNuevaPelicula}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizacion)
      });
      
      const resultadoActualizacion = await respuestaActualizar.json();
      console.log(`   ${resultadoActualizacion.mensaje}\n`);
    }

    // 6. Eliminar la película
    if (idNuevaPelicula) {
      console.log(`6. Eliminando película con ID ${idNuevaPelicula}...`);
      const respuestaEliminar = await fetch(`${API_URL}/${idNuevaPelicula}`, {
        method: 'DELETE'
      });
      
      const resultadoEliminacion = await respuestaEliminar.json();
      console.log(`   ${resultadoEliminacion.mensaje}\n`);
    }

    console.log('=== Pruebas completadas ===');

  } catch (error) {
    console.error('Error durante las pruebas:', error.message);
    console.log('\nAsegúrate de que el servidor esté ejecutándose en http://localhost:3000');
    console.log('Ejecuta: npm run dev');
  }
}

// Ejecutar las pruebas
probarAPI();