document.addEventListener('DOMContentLoaded', function() {
    // Animación para las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Configuración del Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar estilos iniciales y observar cada tarjeta
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Efecto hover mejorado para dispositivos con mouse
    function handleHoverEvents() {
        serviceCards.forEach(card => {
            // Solo aplicar estos efectos si no es un dispositivo táctil
            if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.service-icon');
                    icon.style.transform = 'rotateY(180deg) scale(1.1)';
                    this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.service-icon');
                    icon.style.transform = 'rotateY(0) scale(1)';
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                });
            }
        });
    }
    
    handleHoverEvents();
    
    // Cambiar estilos al hacer clic en móviles
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                this.classList.toggle('active');
                
                // Resetear otras tarjetas
                serviceCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Cargar más servicios dinámicamente (ejemplo)
    
    
    loadMoreButton.addEventListener('click', function() {
        // Aquí podríamos cargar más servicios mediante AJAX en una implementación real
        
    });
    
    // Agregar el botón después del grid de servicios
    const servicesSection = document.querySelector('.services .container');
    servicesSection.appendChild(loadMoreButton);
});