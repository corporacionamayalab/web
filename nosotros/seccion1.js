/* ============================================
   HERO NOSOTROS - INTERACTIVIDAD
   Partículas + Animaciones AOS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. CREAR PARTÍCULAS =====
    const contenedorParticulas = document.getElementById('nosotrosParticulas');
    
    if (contenedorParticulas) {
        for (let i = 0; i < 50; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula-nos');
            particula.style.left = Math.random() * 100 + '%';
            particula.style.animationDelay = Math.random() * 15 + 's';
            particula.style.animationDuration = (8 + Math.random() * 12) + 's';
            particula.style.width = (Math.random() * 2.5 + 1) + 'px';
            particula.style.height = particula.style.width;
            contenedorParticulas.appendChild(particula);
        }
    }

    // ===== 2. ANIMACIONES AOS =====
    const elementos = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => entry.target.classList.add('aos-animate'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => observer.observe(el));

    // Activar al cargar si ya está visible
    setTimeout(() => {
        elementos.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => el.classList.add('aos-animate'), delay);
            }
        });
    }, 300);

});