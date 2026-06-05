/* ============================================
   PAQUETES - INTERACTIVIDAD
   Animaciones AOS + Efectos hover
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ANIMACIONES AOS =====
    const elementosAnimados = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // ===== 2. EFECTO HOVER EN TARJETAS =====
    const cards = document.querySelectorAll('.paquete-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icono = card.querySelector('.paquete-icono');
            if (icono && !card.classList.contains('paquete-popular')) {
                icono.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            }
        });
    });

    // ===== 3. DESTACAR PAQUETE POPULAR =====
    const paquetePopular = document.querySelector('.paquete-popular');
    
    if (paquetePopular) {
        // Efecto sutil al cargar
        setTimeout(() => {
            paquetePopular.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 1000);
    }

});