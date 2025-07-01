document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos del DOM
    const splashScreen = document.getElementById('splash-screen');
    const backgroundVideo = document.getElementById('background-video');
    // Asume que tienes un contenedor para el resto de tu página con ID 'main-content'
    const mainContent = document.getElementById('main-content'); 

    // Intentar reproducir el video. Esto es importante para manejar las políticas
    // de autoplay de algunos navegadores, especialmente en dispositivos móviles.
    backgroundVideo.play().catch(error => {
        console.warn('Autoplay del video falló:', error);
        // Si el autoplay falla, el splash screen aún se ocultará después del temporizador.
        // Puedes agregar lógica aquí si necesitas un comportamiento diferente.
    });

    // Define la duración que el splash screen estará visible (en milisegundos)
    const splashDuration = 3500; // 3.5 segundos

    // Temporizador para iniciar el desvanecimiento del splash screen
    setTimeout(() => {
        splashScreen.classList.add('fade-out'); // Añade la clase que activa la transición CSS

        // Escucha el evento 'transitionend' en el splash screen.
        // Esto asegura que el contenido principal se muestre solo DESPUÉS
        // de que la animación de desvanecimiento del splash haya terminado.
        splashScreen.addEventListener('transitionend', () => {
            // Verifica que la transición de opacidad haya finalizado (la opacidad sea 0)
            if (getComputedStyle(splashScreen).opacity === '') {
                splashScreen.style.display = 'none'; // Oculta el splash screen completamente del flujo del documento
                
                // Muestra el contenido principal de la página
                if (mainContent) { // Verifica que 'main-content' existe antes de manipularlo
                    mainContent.classList.remove('hidden-content'); // Remueve la clase que lo oculta
                    mainContent.classList.add('visible-content'); // Añade la clase para hacerlo visible con transición
                }
            }
        }, { once: true }); // El { once: true } asegura que este evento se dispare solo una vez
    }, splashDuration);
});