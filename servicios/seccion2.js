/* ============================================
   ESPECIALIDADES HERO - INTERACTIVIDAD
   Partículas + Animaciones AOS + Contador
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. CREAR PARTÍCULAS FLOTANTES =====
    const contenedorParticulas = document.getElementById('especialidadesParticulas');
    
    if (contenedorParticulas) {
        const numParticulas = 80;
        
        for (let i = 0; i < numParticulas; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula-esp');
            
            const left = Math.random() * 100;
            const delay = Math.random() * 18;
            const duracion = 10 + Math.random() * 15;
            const size = Math.random() * 2.5 + 1;
            
            particula.style.left = left + '%';
            particula.style.width = size + 'px';
            particula.style.height = size + 'px';
            particula.style.animationDelay = delay + 's';
            particula.style.animationDuration = duracion + 's';
            
            contenedorParticulas.appendChild(particula);
        }
    }

    // ===== 2. ANIMACIONES AOS =====
    const elementosAnimados = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
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

    // ===== 3. EFECTO HOVER EN TARJETAS =====
    const cards = document.querySelectorAll('.especialidad-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icono = card.querySelector('.especialidad-icono');
            if (icono) {
                icono.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            }
        });
    });

});