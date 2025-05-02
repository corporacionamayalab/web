document.addEventListener('DOMContentLoaded', function() {
    // Elementos del slider
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.slider-dot');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 segundos
    
    // Función para cambiar de slide
    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      
      // Reiniciar animaciones
      resetAnimations();
    }
    
    // Función para resetear animaciones
    function resetAnimations() {
      const activeSlide = slides[currentSlide];
      const title = activeSlide.querySelector('.title-animate');
      const text = activeSlide.querySelector('.text-animate');
      const icons = activeSlide.querySelector('.floating-icons');
      
      // Resetear animaciones
      title.style.animation = 'none';
      text.style.animation = 'none';
      icons.style.animation = 'none';
      
      // Forzar reflow/repaint
      void title.offsetWidth;
      void text.offsetWidth;
      void icons.offsetWidth;
      
      // Reactivar animaciones
      title.style.animation = '';
      text.style.animation = '';
      icons.style.animation = '';
    }
    
    // Función para el siguiente slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
    
    // Función para el slide anterior
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
    
    // Iniciar autoplay
    function startSlider() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Pausar autoplay
    function pauseSlider() {
      clearInterval(slideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
      pauseSlider();
      nextSlide();
      startSlider();
    });
    
    prevBtn.addEventListener('click', function() {
      pauseSlider();
      prevSlide();
      startSlider();
    });
    
    // Navegación por dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        pauseSlider();
        goToSlide(index);
        startSlider();
      });
    });
    
    // Pausar al interactuar con el slider
    sliderContainer.addEventListener('mouseenter', pauseSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
    
    // Touch events para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      pauseSlider();
    }, {passive: true});
    
    sliderContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startSlider();
    }, {passive: true});
    
    function handleSwipe() {
      const threshold = 50; // Mínimo de desplazamiento para considerar swipe
      
      if (touchEndX < touchStartX - threshold) {
        nextSlide(); // Swipe izquierda
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide(); // Swipe derecha
      }
    }
    
    // Iniciar slider
    startSlider();
    
    // Ajustar altura del slider en carga y resize
    function adjustSliderHeight() {
      const heroSlider = document.querySelector('.hero-slider');
      if (window.innerWidth <= 768) {
        heroSlider.style.height = '70vh';
      } else {
        heroSlider.style.height = '100vh';
      }
    }
    
    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
    
    // Efecto de partículas opcional (puedes implementarlo con una librería como particles.js)
  });