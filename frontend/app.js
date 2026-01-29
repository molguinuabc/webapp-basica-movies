// Configuración de la API
const API_URL = 'http://localhost:3000/api/peliculas';

// Estado de la aplicación
let peliculas = [];
let modoEdicion = false;
let peliculaEditando = null;

// Elementos del DOM
const elementos = {
    form: document.getElementById('pelicula-form'),
    tablaBody: document.getElementById('peliculas-body'),
    mensajeVacio: document.getElementById('mensaje-vacio'),
    cargando: document.getElementById('cargando'),
    alertContainer: document.getElementById('alert-container'),
    buscarInput: document.getElementById('buscar-input'),
    btnBuscar: document.getElementById('btn-buscar'),
    btnLimpiarBusqueda: document.getElementById('btn-limpiar-busqueda'),
    btnRefrescar: document.getElementById('btn-refrescar'),
    btnCancelar: document.getElementById('btn-cancelar'),
    contadorPeliculas: document.getElementById('contador-peliculas'),
    formTitle: document.getElementById('form-title'),
    btnSubmitText: document.getElementById('btn-submit-text'),
    
    // Campos del formulario
    peliculaId: document.getElementById('pelicula-id'),
    titulo: document.getElementById('titulo'),
    director: document.getElementById('director'),
    año: document.getElementById('año'),
    genero: document.getElementById('genero'),
    duracion: document.getElementById('duracion'),
    calificacion: document.getElementById('calificacion')
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    cargarPeliculas();
});

// Inicializar eventos
function inicializarEventos() {
    // Formulario
    elementos.form.addEventListener('submit', manejarSubmitFormulario);
    elementos.btnCancelar.addEventListener('click', cancelarEdicion);
    
    // Búsqueda
    elementos.btnBuscar.addEventListener('click', buscarPeliculas);
    elementos.btnLimpiarBusqueda.addEventListener('click', limpiarBusqueda);
    elementos.buscarInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscarPeliculas();
    });
    
    // Refrescar
    elementos.btnRefrescar.addEventListener('click', cargarPeliculas);
}

// Mostrar alerta
function mostrarAlerta(mensaje, tipo = 'info', tiempo = 5000) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    elementos.alertContainer.innerHTML = '';
    elementos.alertContainer.appendChild(alerta);
    
    if (tiempo > 0) {
        setTimeout(() => {
            if (alerta.parentNode) {
                const bsAlert = new bootstrap.Alert(alerta);
                bsAlert.close();
            }
        }, tiempo);
    }
}

// Mostrar error
function mostrarError(mensaje) {
    mostrarAlerta(`<i class="bi bi-exclamation-triangle"></i> ${mensaje}`, 'danger');
}

// Mostrar éxito
function mostrarExito(mensaje) {
    mostrarAlerta(`<i class="bi bi-check-circle"></i> ${mensaje}`, 'success');
}

// Cargar todas las películas
async function cargarPeliculas() {
    try {
        mostrarCargando(true);
        
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        peliculas = await respuesta.json();
        mostrarPeliculas(peliculas);
        actualizarContador();
        
    } catch (error) {
        console.error('Error al cargar películas:', error);
        mostrarError('No se pudieron cargar las películas. Verifica que el servidor esté ejecutándose.');
        mostrarPeliculas([]);
    } finally {
        mostrarCargando(false);
    }
}

// Buscar películas
async function buscarPeliculas() {
    const termino = elementos.buscarInput.value.trim();
    
    if (!termino) {
        cargarPeliculas();
        return;
    }
    
    try {
        mostrarCargando(true);
        
        const respuesta = await fetch(`${API_URL}/buscar?q=${encodeURIComponent(termino)}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const resultados = await respuesta.json();
        mostrarPeliculas(resultados);
        actualizarContador(resultados.length);
        
        if (resultados.length === 0) {
            mostrarAlerta(`No se encontraron películas con el término "${termino}"`, 'warning');
        }
        
    } catch (error) {
        console.error('Error al buscar películas:', error);
        mostrarError('Error al buscar películas');
    } finally {
        mostrarCargando(false);
    }
}

// Limpiar búsqueda
function limpiarBusqueda() {
    elementos.buscarInput.value = '';
    cargarPeliculas();
}

// Mostrar películas en la tabla
function mostrarPeliculas(listaPeliculas) {
    elementos.tablaBody.innerHTML = '';
    
    if (!listaPeliculas || listaPeliculas.length === 0) {
        elementos.mensajeVacio.style.display = 'block';
        return;
    }
    
    elementos.mensajeVacio.style.display = 'none';
    
    listaPeliculas.forEach(pelicula => {
        const fila = document.createElement('tr');
        fila.className = 'movie-card';
        fila.innerHTML = `
            <td><strong>${pelicula.titulo}</strong></td>
            <td>${pelicula.director}</td>
            <td>${pelicula.año}</td>
            <td><span class="badge bg-secondary">${pelicula.genero}</span></td>
            <td>${pelicula.duracion ? `${pelicula.duracion} min` : '-'}</td>
            <td>
                ${pelicula.calificacion ? `
                    <span class="rating-stars">
                        ${generarEstrellas(pelicula.calificacion)}
                    </span>
                    <small class="text-muted ms-1">(${pelicula.calificacion.toFixed(1)})</small>
                ` : '-'}
            </td>
            <td>
                <button class="btn btn-sm btn-warning btn-action" onclick="editarPelicula(${pelicula.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="eliminarPelicula(${pelicula.id})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        
        elementos.tablaBody.appendChild(fila);
    });
}

// Generar estrellas para calificación
function generarEstrellas(calificacion) {
    const estrellasLlenas = Math.floor(calificacion / 2);
    const mediaEstrella = calificacion % 2 >= 1;
    let html = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < estrellasLlenas) {
            html += '<i class="bi bi-star-fill"></i>';
        } else if (i === estrellasLlenas && mediaEstrella) {
            html += '<i class="bi bi-star-half"></i>';
        } else {
            html += '<i class="bi bi-star"></i>';
        }
    }
    
    return html;
}

// Actualizar contador
function actualizarContador(total = null) {
    const count = total !== null ? total : peliculas.length;
    elementos.contadorPeliculas.textContent = `${count} película${count !== 1 ? 's' : ''}`;
}

// Mostrar/ocultar estado de carga
function mostrarCargando(mostrar) {
    elementos.cargando.style.display = mostrar ? 'block' : 'none';
}

// Preparar formulario para edición
function prepararEdicion(pelicula) {
    modoEdicion = true;
    peliculaEditando = pelicula;
    
    // Llenar formulario
    elementos.peliculaId.value = pelicula.id;
    elementos.titulo.value = pelicula.titulo;
    elementos.director.value = pelicula.director;
    elementos.año.value = pelicula.año;
    elementos.genero.value = pelicula.genero;
    elementos.duracion.value = pelicula.duracion || '';
    elementos.calificacion.value = pelicula.calificacion || '';
    
    // Actualizar UI
    elementos.formTitle.textContent = 'Editar Película';
    elementos.btnSubmitText.textContent = 'Actualizar Película';
    elementos.btnCancelar.style.display = 'block';
    
    // Enfocar primer campo
    elementos.titulo.focus();
}

// Cancelar edición
function cancelarEdicion() {
    modoEdicion = false;
    peliculaEditando = null;
    limpiarFormulario();
    
    // Actualizar UI
    elementos.formTitle.textContent = 'Nueva Película';
    elementos.btnSubmitText.textContent = 'Guardar Película';
    elementos.btnCancelar.style.display = 'none';
}

// Limpiar formulario
function limpiarFormulario() {
    elementos.form.reset();
    elementos.peliculaId.value = '';
    
    // Remover clases de validación
    const inputs = elementos.form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}

// Manejar envío del formulario
async function manejarSubmitFormulario(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    const datosPelicula = {
        titulo: elementos.titulo.value.trim(),
        director: elementos.director.value.trim(),
        año: parseInt(elementos.año.value),
        genero: elementos.genero.value,
        duracion: elementos.duracion.value ? parseInt(elementos.duracion.value) : null,
        calificacion: elementos.calificacion.value ? parseFloat(elementos.calificacion.value) : null
    };
    
    try {
        if (modoEdicion) {
            await actualizarPelicula(peliculaEditando.id, datosPelicula);
        } else {
            await crearPelicula(datosPelicula);
        }
        
        cancelarEdicion();
        cargarPeliculas();
        
    } catch (error) {
        console.error('Error al guardar película:', error);
        mostrarError('Error al guardar la película');
    }
}

// Validar formulario
function validarFormulario() {
    let valido = true;
    
    // Validar campos requeridos
    const camposRequeridos = [
        { elemento: elementos.titulo, mensaje: 'El título es requerido' },
        { elemento: elementos.director, mensaje: 'El director es requerido' },
        { elemento: elementos.año, mensaje: 'El año es requerido' },
        { elemento: elementos.genero, mensaje: 'El género es requerido' }
    ];
    
    camposRequeridos.forEach(campo => {
        if (!campo.elemento.value.trim()) {
            marcarInvalido(campo.elemento, campo.mensaje);
            valido = false;
        } else {
            marcarValido(campo.elemento);
        }
    });
    
    // Validar año
    const año = parseInt(elementos.año.value);
    if (año < 1888 || año > 2030) {
        marcarInvalido(elementos.año, 'El año debe estar entre 1888 y 2030');
        valido = false;
    }
    
    // Validar duración
    if (elementos.duracion.value && parseInt(elementos.duracion.value) <= 0) {
        marcarInvalido(elementos.duracion, 'La duración debe ser positiva');
        valido = false;
    }
    
    // Validar calificación
    if (elementos.calificacion.value) {
        const calificacion = parseFloat(elementos.calificacion.value);
        if (calificacion < 0 || calificacion > 10) {
            marcarInvalido(elementos.calificacion, 'La calificación debe estar entre 0 y 10');
            valido = false;
        }
    }
    
    return valido;
}

// Marcar campo como inválido
function marcarInvalido(elemento, mensaje) {
    elemento.classList.remove('is-valid');
    elemento.classList.add('is-invalid');
    
    const feedback = elemento.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = mensaje;
    }
}

// Marcar campo como válido
function marcarValido(elemento) {
    elemento.classList.remove('is-invalid');
    elemento.classList.add('is-valid');
}

// Crear nueva película
async function crearPelicula(datos) {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    
    if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.mensaje || 'Error al crear película');
    }
    
    const resultado = await respuesta.json();
    mostrarExito(resultado.mensaje || 'Película creada exitosamente');
    return resultado;
}

// Actualizar película existente
async function actualizarPelicula(id, datos) {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    
    if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.mensaje || 'Error al actualizar película');
    }
    
    const resultado = await respuesta.json();
    mostrarExito(resultado.mensaje || 'Película actualizada exitosamente');
    return resultado;
}

// Eliminar película
async function eliminarPelicula(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta película?')) {
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.mensaje || 'Error al eliminar película');
        }
        
        const resultado = await respuesta.json();
        mostrarExito(resultado.mensaje || 'Película eliminada exitosamente');
        cargarPeliculas();
        
    } catch (error) {
        console.error('Error al eliminar película:', error);
        mostrarError('Error al eliminar la película');
    }
}

// Función para editar película (disponible globalmente)
window.editarPelicula = async function(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        
        if (!respuesta.ok) {
            throw new Error('Error al obtener película');
        }
        
        const pelicula = await respuesta.json();
        prepararEdicion(pelicula);
        
        // Desplazar al formulario
        elementos.form.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error al cargar película para editar:', error);
        mostrarError('Error al cargar la película para editar');
    }
};

// Función para eliminar película (disponible globalmente)
window.eliminarPelicula = eliminarPelicula;