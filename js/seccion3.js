document.addEventListener('DOMContentLoaded', function() {
    // Efecto de video al hacer hover
    const videoBg = document.querySelector('.video-background video');
    const dnaCards = document.querySelectorAll('.dna-card');
    
    if(videoBg) {
        videoBg.addEventListener('mouseenter', function() {
            this.style.opacity = '0.25';
        });
        
        videoBg.addEventListener('mouseleave', function() {
            this.style.opacity = '0.15';
        });
    }
    
    // Efecto hover avanzado para tarjetas
    dnaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.dna-card-icon');
            if(icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#fff';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.dna-card-icon');
            if(icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#64ffda';
            }
        });
    });
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Carga dinámica de recursos
    function loadFontAwesome() {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(faLink);
    }
    
    function loadAOS() {
        const aosCSS = document.createElement('link');
        aosCSS.rel = 'stylesheet';
        aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
        document.head.appendChild(aosCSS);
        
        const aosJS = document.createElement('script');
        aosJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
        aosJS.onload = function() {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        };
        document.body.appendChild(aosJS);
    }
    
    // Carga los recursos solo si no están ya cargados
    if(!document.querySelector('link[href*="font-awesome"]')) {
        loadFontAwesome();
    }
    
    if(!document.querySelector('link[href*="aos.css"]')) {
        loadAOS();
    }
    
    // Efecto de scroll suave para los botones
    document.querySelectorAll('.dna-btn[href^="#"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ajuste responsive del video
    function adjustVideoSize() {
        const video = document.querySelector('.video-background video');
        if(!video) return;
        
        const windowRatio = window.innerWidth / window.innerHeight;
        const videoRatio = video.videoWidth / video.videoHeight;
        
        if(windowRatio < videoRatio) {
            video.style.width = 'auto';
            video.style.height = '100%';
        } else {
            video.style.width = '100%';
            video.style.height = 'auto';
        }
    }
    
    window.addEventListener('resize', adjustVideoSize);
    window.addEventListener('orientationchange', adjustVideoSize);
    
    // Inicialización
    adjustVideoSize();
});