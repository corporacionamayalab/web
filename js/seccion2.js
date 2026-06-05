/* ============================================
   SECCIÓN: ¿CÓMO FUNCIONA?
   Animaciones al hacer scroll (AOS)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== ELEMENTOS A ANIMAR =====
    const elementosAnimados = document.querySelectorAll('[data-aos]');

    // ===== OBSERVER PARA INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir delay si existe
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ===== OBSERVAR CADA ELEMENTO =====
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // ===== EFECTO HOVER EN TARJETAS (RESALTA ÍCONO) =====
    const pasoCards = document.querySelectorAll('.paso-card');
    
    pasoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icono = card.querySelector('.paso-icono');
            if (icono) {
                icono.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.2)';
            }
        });
    });

});