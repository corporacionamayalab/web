/* ============================================
   FOOTER PREMIUM - INTERACTIVIDAD
   Animaciones AOS + Año dinámico
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. AÑO DINÁMICO EN COPYRIGHT =====
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        const year = new Date().getFullYear();
        footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', year);
    }

    // ===== 2. ANIMACIONES AOS (SCROLL) =====
    const elementosAnimados = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.15,
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

    // ===== 3. EFECTO HOVER EN REDES SOCIALES =====
    const redesSociales = document.querySelectorAll('.red-social');
    
    redesSociales.forEach(red => {
        red.addEventListener('mouseenter', () => {
            red.style.transition = 'all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        });
    });

    // ===== 4. SUAVIZAR SCROLL EN ENLACES DEL FOOTER =====
    const footerLinks = document.querySelectorAll('.footer-lista li a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});