document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de imágenes
    const carousel = {
        items: document.querySelectorAll('.carousel-item'),
        indicators: document.querySelectorAll('.carousel-indicators span'),
        prevBtn: document.querySelector('.carousel-control.prev'),
        nextBtn: document.querySelector('.carousel-control.next'),
        currentIndex: 0,
        interval: null,
        intervalTime: 5000,
        
        init: function() {
            // Crear indicadores dinámicamente si no existen
            if (this.indicators.length === 0) {
                const indicatorsContainer = document.querySelector('.carousel-indicators');
                this.items.forEach((_, index) => {
                    const indicator = document.createElement('span');
                    indicator.dataset.index = index;
                    if (index === 0) indicator.classList.add('active');
                    indicatorsContainer.appendChild(indicator);
                });
                this.indicators = document.querySelectorAll('.carousel-indicators span');
            }
            
            // Configurar eventos
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            
            this.indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    this.goTo(parseInt(indicator.dataset.index));
                });
            });
            
            // Iniciar autoplay
            this.startAutoPlay();
            
            // Pausar autoplay cuando el mouse está sobre el carrusel
            const carouselElement = document.querySelector('.carousel');
            carouselElement.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselElement.addEventListener('mouseleave', () => this.startAutoPlay());
        },
        
        showSlide: function(index) {
            // Ocultar todas las diapositivas
            this.items.forEach(item => item.classList.remove('active'));
            this.indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Mostrar la diapositiva actual
            this.items[index].classList.add('active');
            this.indicators[index].classList.add('active');
            this.currentIndex = index;
        },
        
        next: function() {
            const nextIndex = (this.currentIndex + 1) % this.items.length;
            this.showSlide(nextIndex);
        },
        
        prev: function() {
            const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.showSlide(prevIndex);
        },
        
        goTo: function(index) {
            this.showSlide(index);
        },
        
        startAutoPlay: function() {
            this.stopAutoPlay();
            this.interval = setInterval(() => this.next(), this.intervalTime);
        },
        
        stopAutoPlay: function() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    };
    
    // Inicializar el carrusel
    if (document.querySelector('.carousel')) {
        carousel.init();
    }
    
    // Efecto de scroll suave para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.beneficio-card, .paso');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar elementos para animación
    document.querySelectorAll('.beneficio-card, .paso').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});