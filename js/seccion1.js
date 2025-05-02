document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const heroSlider = document.querySelector('.hero-slider');
    
    // Variables de control
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 segundos
    
    // Función para cambiar de slide
    function goToSlide(n) {
        // Remover clase active del slide y dot actual
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Calcular nuevo índice de slide
        currentSlide = (n + slides.length) % slides.length;
        
        // Añadir clase active al nuevo slide y dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Función para el slide siguiente
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Función para el slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Iniciar autoplay
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Detener autoplay
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners para controles de navegación
    nextBtn.addEventListener('click', function() {
        pauseSlideShow();
        nextSlide();
        startSlideShow();
    });
    
    prevBtn.addEventListener('click', function() {
        pauseSlideShow();
        prevSlide();
        startSlideShow();
    });
    
    // Event listeners para los dots de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            pauseSlideShow();
            goToSlide(index);
            startSlideShow();
        });
    });
    
    // Pausar al interactuar con el slider
    heroSlider.addEventListener('mouseenter', pauseSlideShow);
    heroSlider.addEventListener('mouseleave', startSlideShow);
    
    // Para dispositivos táctiles
    heroSlider.addEventListener('touchstart', pauseSlideShow);
    heroSlider.addEventListener('touchend', startSlideShow);
    
    // Ajustar altura en dispositivos móviles
    function adjustHeight() {
        // Primero ajustamos la variable CSS --vh
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Luego ajustamos la altura del slider
        heroSlider.style.height = window.innerHeight + 'px';
    }
    
    // Manejar el evento de redimensionamiento
    window.addEventListener('resize', adjustHeight);
    
    // Inicialización
    adjustHeight(); // Ajustar altura inicial
    startSlideShow(); // Iniciar el slider automático
    
    // Opcional: Añadir animaciones adicionales
    const animateElements = function() {
        const title = document.querySelector('.slide.active .title-animate');
        const text = document.querySelector('.slide.active .text-animate');
        const icons = document.querySelectorAll('.slide.active .icon-float');
        
        // Resetear animaciones
        title.style.animation = 'none';
        text.style.animation = 'none';
        icons.forEach(icon => icon.style.animation = 'none');
        
        // Forzar reflow
        void title.offsetWidth;
        void text.offsetWidth;
        icons.forEach(icon => void icon.offsetWidth);
        
        // Aplicar animaciones
        title.style.animation = 'fadeInUp 1s ease-out forwards';
        text.style.animation = 'fadeInUp 1s ease-out 0.3s forwards';
        icons.forEach((icon, i) => {
            icon.style.animation = `float 3s ease-in-out ${i * 0.2}s infinite, fadeIn 1s ease-out ${0.6 + i * 0.1}s forwards`;
        });
    };
    
    // Ejecutar animaciones al cambiar de slide
    slides.forEach(slide => {
        slide.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                animateElements();
            }
        });
    });
    
    // Ejecutar animaciones al cargar la página
    animateElements();
});