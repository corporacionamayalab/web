document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    // Las referencias a prevButton, nextButton y los puntos de paginación han sido eliminadas

    let currentIndex = 0; // Índice de la diapositiva actual

    // Función para mostrar la diapositiva actual
    function showSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Ocultar todas las diapositivas y quitar la clase 'active'
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0'; // Asegurar que estén ocultas visualmente
            slide.style.position = 'absolute'; // Quitar del flujo para transiciones
        });

        // Mostrar la diapositiva activa
        slides[currentIndex].classList.add('active');
        slides[currentIndex].style.opacity = '1';
        slides[currentIndex].style.position = 'relative'; // Poner en el flujo para ocupar espacio

        // Los puntos de paginación han sido eliminados, por lo tanto, no hay actualización aquí.
    }

    // Los event listeners para los botones de navegación y los puntos de paginación han sido eliminados

    // Inicializar el carrusel mostrando la primera diapositiva
    showSlide(currentIndex);

    // Auto-avance del carrusel cada 4 segundos
    const intervalTime = 4000; // Tiempo en milisegundos (4 segundos)
    let slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, intervalTime);

    // Pausar auto-avance al pasar el ratón por encima del carrusel
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Reanudar auto-avance al quitar el ratón del carrusel
    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalTime);
    });
});