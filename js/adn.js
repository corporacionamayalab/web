/**
 * Script para la sección de Pruebas de Paternidad
 */
document.addEventListener('DOMContentLoaded', function() {
    // Animación de las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    
    const animateCards = () => {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };
    
    // Intersection Observer para animaciones al hacer scroll
    const setupIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('paternity-features')) {
                        animateCards();
                    }
                    
                    if (entry.target.classList.contains('steps-container')) {
                        const steps = entry.target.querySelectorAll('.step');
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.style.opacity = '1';
                                step.style.transform = 'scale(1)';
                            }, index * 200);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Elementos a observar
        const sectionsToAnimate = [
            document.querySelector('.paternity-features'),
            document.querySelector('.steps-container')
        ];
        
        sectionsToAnimate.forEach(section => {
            if (section) observer.observe(section);
        });
    };
    
    // Inicializar estilos para animación
    const initAnimationStyles = () => {
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'scale(0.9)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    };
    
    // Smooth scroll para enlaces internos
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Actualizar URL sin recargar
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };
    
    // Inicialización
    initAnimationStyles();
    setupIntersectionObserver();
    setupSmoothScroll();
    
    // Efecto hover en certificaciones
    const certLogos = document.querySelectorAll('.cert-logos img');
    certLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    });
});