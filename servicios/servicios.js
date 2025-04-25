document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navList.style.display = isExpanded ? 'none' : 'flex';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navList.style.display = 'none';
                }
            });
        });
        
        // Manejar cambios de tamaño de pantalla
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navList.style.display = 'flex';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                navList.style.display = isExpanded ? 'flex' : 'none';
            }
        });
        
        // Estado inicial
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
        }
    }

    // Efecto de aparición suave para las tarjetas de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    
    const animateCards = () => {
        servicioCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * index);
        });
    };
    
    // Inicializar las tarjetas con opacidad 0 para la animación
    if (servicioCards.length > 0) {
        servicioCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Animar cuando la sección es visible
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCards();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const serviciosSection = document.querySelector('.servicios-section');
        if (serviciosSection) {
            observer.observe(serviciosSection);
        }
    }
    
    // Smooth scroll para los enlaces del footer
    document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = window.innerWidth <= 768 ? 60 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenuBtn && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navList.style.display = 'none';
                }
            }
        });
    });
    
    // Actualizar año del copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
    }
});