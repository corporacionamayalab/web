document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 segundos por slide
  
    // Cambiar de slide con animación
    function goToSlide(n) {
      // Animación de salida
      slides[currentSlide].style.opacity = 0;
      slides[currentSlide].style.transition = 'opacity 1s ease-out';
      
      setTimeout(() => {
        slides[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        
        // Reiniciar animaciones
        resetAnimations();
        
        // Animación de entrada
        setTimeout(() => {
          slides[currentSlide].style.opacity = 1;
        }, 50);
        
      }, 1000);
    }
  
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
  
    function resetAnimations() {
      const titles = document.querySelectorAll('.title-animate');
      const texts = document.querySelectorAll('.text-animate');
      const icons = document.querySelectorAll('.icon-float');
      
      // Reiniciar animaciones
      titles.forEach(title => {
        title.style.animation = 'none';
        void title.offsetWidth; // Trigger reflow
        title.style.animation = 'fadeInUp 1s ease-out both';
      });
      
      texts.forEach(text => {
        text.style.animation = 'none';
        void text.offsetWidth;
        text.style.animation = 'fadeInUp 1s ease-out 0.3s both';
      });
      
      icons.forEach((icon, i) => {
        icon.style.animation = 'none';
        void icon.offsetWidth;
        icon.style.animation = `float 6s ease-in-out ${i}s infinite`;
      });
    }
  
    // Iniciar carrusel automático
    function startSlider() {
      slideInterval = setInterval(nextSlide, slideDuration);
    }
  
    // Pausar al interactuar
    function setupInteractions() {
      const slider = document.querySelector('.slider-container');
      
      slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        startSlider();
      });
      
      // Touch para móviles
      let touchStartX = 0;
      
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
      }, {passive: true});
      
      slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) goToSlide(currentSlide - 1);
        startSlider();
      }, {passive: true});
    }
  
    // Iniciar todo
    startSlider();
    setupInteractions();
    resetAnimations();
  });