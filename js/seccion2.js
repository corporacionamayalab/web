document.addEventListener('DOMContentLoaded', function() {
    // Efecto de aparición gradual para las tarjetas
    const serviceCards = document.querySelectorAll('.service-card');
    
    const animateCards = () => {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    };
    
    // Función para ajustar el espaciado en móviles
    const adjustMobileSpacing = () => {
        if (window.innerWidth < 576) {
            document.querySelector('.services-section').style.padding = '2rem 0';
        } else {
            document.querySelector('.services-section').style.padding = '5rem 0';
        }
    };
    
    // Contador de servicios (efecto empresarial)
    const setupServiceCounters = () => {
        const counters = document.querySelectorAll('.analysis-list li');
        
        counters.forEach((counter, index) => {
            counter.style.opacity = '0';
            counter.style.transform = 'translateX(-20px)';
            counter.style.transition = `all 0.3s ease ${index * 0.05}s`;
            
            setTimeout(() => {
                counter.style.opacity = '1';
                counter.style.transform = 'translateX(0)';
            }, 300 + (index * 50));
        });
    };
    
    // Inicialización de funciones
    animateCards();
    adjustMobileSpacing();
    setupServiceCounters();
    
    // Re-ejecutar al cambiar el tamaño de la ventana
    window.addEventListener('resize', adjustMobileSpacing);
    
    // Efecto hover avanzado para tarjetas
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1.1)';
            this.querySelector('.service-icon').style.color = '#2ecc71';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-icon').style.transform = 'scale(1)';
            this.querySelector('.service-icon').style.color = '#3498db';
        });
    });
    
    // Analytics para tracking de clicks (ejemplo empresarial)
    document.querySelector('.view-more-btn').addEventListener('click', function(e) {
        e.preventDefault();
        // Simulación de tracking - en producción usaría Google Analytics o similar
        console.log('Servicios: Click en Ver Más');
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    });
});