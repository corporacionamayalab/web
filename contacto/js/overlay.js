document.addEventListener('DOMContentLoaded', function() {
    const anuncio = document.getElementById('anuncio-rutinario');
    const overlay = document.getElementById('anuncio-overlay');
    const cerrarBtn = document.getElementById('cerrar-anuncio');

    // Función para mostrar el anuncio
    function mostrarAnuncio() {
        anuncio.classList.add('active');
        overlay.classList.add('active');
    }

    // Función para ocultar el anuncio
    function ocultarAnuncio() {
        anuncio.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Mostrar el anuncio al cargar la página
    mostrarAnuncio();

    // Ocultar el anuncio automáticamente después de 5 segundos
    const timerAnuncio = setTimeout(ocultarAnuncio, 5000); // 5000 milisegundos = 5 segundos

    // Ocultar el anuncio al hacer clic en el botón de cierre
    cerrarBtn.addEventListener('click', function() {
        clearTimeout(timerAnuncio); // Detiene el temporizador si el usuario lo cierra antes
        ocultarAnuncio();
    });

    // Opcional: Ocultar el anuncio si se hace clic fuera de él (en el overlay)
    overlay.addEventListener('click', function() {
        clearTimeout(timerAnuncio); // Detiene el temporizador si el usuario lo cierra antes
        ocultarAnuncio();
    });
});