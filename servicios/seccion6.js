/* ============================================
   FAQ - ACORDEÓN INTERACTIVO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== ACORDEÓN =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');

        pregunta.addEventListener('click', () => {
            // Cerrar los demás
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });

            // Alternar el actual
            item.classList.toggle('active');
        });
    });

    // ===== AOS =====
    const elementosAnimados = document.querySelectorAll('[data-aos]');

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
    }, { threshold: 0.2 });

    elementosAnimados.forEach(el => observer.observe(el));

});