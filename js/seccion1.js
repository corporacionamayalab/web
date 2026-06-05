/* ============================================
   HERO SLIDER - INTERACTIVIDAD
   Cambio automático cada 6 segundos
   Sin dots ni flechas
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== ELEMENTOS DEL DOM =====
    const slides = document.querySelectorAll('.hero-slide');
    const progressFill = document.getElementById('heroProgressFill');
    
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    const slideDuration = 6000; // 6 segundos por slide (más tiempo para leer)
    const progressStep = 100 / (slideDuration / 100);

    // ===== FUNCIÓN: CAMBIAR SLIDE =====
    function goToSlide(index) {
        // Quitar active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Activar el slide seleccionado
        slides[index].classList.add('active');
        
        // Resetear barra de progreso
        resetProgress();
        
        currentSlide = index;
    }

    // ===== FUNCIÓN: SIGUIENTE SLIDE =====
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // ===== FUNCIÓN: RESETEAR PROGRESO =====
    function resetProgress() {
        clearInterval(progressInterval);
        clearInterval(slideInterval);
        
        progressFill.style.width = '0%';
        
        let progress = 0;
        
        progressInterval = setInterval(() => {
            progress += progressStep;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            progressFill.style.width = progress + '%';
        }, 100);
        
        slideInterval = setInterval(() => {
            nextSlide();
        }, slideDuration);
    }

    // ===== INICIAR SLIDER =====
    goToSlide(0);
    
    // ===== PAUSAR AL HACER HOVER =====
    const heroSlider = document.querySelector('.hero-slider');
    
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        clearInterval(progressInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        resetProgress();
    });

    // ===== NAVEGACIÓN POR TECLADO (OPCIONAL PERO ÚTIL) =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
        if (e.key === 'ArrowLeft') {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }
    });

});