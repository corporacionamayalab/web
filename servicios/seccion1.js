/* ============================================
   HERO SLIDER SERVICIOS - INTERACTIVIDAD
   Partículas + Cambio automático cada 6 seg
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. CREAR PARTÍCULAS FLOTANTES =====
    const contenedorParticulas = document.getElementById('adnParticulas');
    
    if (contenedorParticulas) {
        const numParticulas = 60;
        
        for (let i = 0; i < numParticulas; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula');
            
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duracion = 8 + Math.random() * 12;
            const size = Math.random() * 3 + 1;
            
            particula.style.left = left + '%';
            particula.style.width = size + 'px';
            particula.style.height = size + 'px';
            particula.style.animationDelay = delay + 's';
            particula.style.animationDuration = duracion + 's';
            
            contenedorParticulas.appendChild(particula);
        }
    }

    // ===== 2. SLIDER AUTOMÁTICO =====
    const slides = document.querySelectorAll('.slider-slide');
    const progresoFill = document.getElementById('sliderProgresoFill');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    const slideDuration = 6000;
    const progressStep = 100 / (slideDuration / 100);

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        resetProgress();
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function resetProgress() {
        clearInterval(progressInterval);
        clearInterval(slideInterval);
        
        if (progresoFill) progresoFill.style.width = '0%';
        
        let progress = 0;
        
        progressInterval = setInterval(() => {
            progress += progressStep;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            if (progresoFill) progresoFill.style.width = progress + '%';
        }, 100);
        
        slideInterval = setInterval(() => {
            nextSlide();
        }, slideDuration);
    }

    // ===== 3. PAUSAR AL HOVER =====
    const sliderContainer = document.querySelector('.servicios-slider');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
            clearInterval(progressInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            resetProgress();
        });
    }

    // ===== 4. TECLADO =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }
    });

    // ===== INICIAR =====
    goToSlide(0);

});