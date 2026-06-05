/* ============================================
   HISTORIA - ANIMACIONES AOS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const elementos = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => entry.target.classList.add('aos-animate'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(el => observer.observe(el));

});