document.addEventListener('DOMContentLoaded', function() {
  // Configuración del slider
  const sliderConfig = {
      slides: document.querySelectorAll('.lab-slide'),
      dotsContainer: document.querySelector('.slider-dots'),
      prevBtn: document.querySelector('.slider-prev'),
      nextBtn: document.querySelector('.slider-next'),
      interval: 5000, // 5 segundos
      currentIndex: 0,
      timer: null,
      isAutoPlaying: true
  };

  // Inicializar el slider
  function initSlider() {
      createNavigationDots();
      goToSlide(0);
      startAutoPlay();
      setupEventListeners();
      
      // Solo activar efectos adicionales en desktop
      if (window.innerWidth > 992) {
          setupParallaxEffect();
      }
      
      setupIntersectionObserver();
      setupSmoothScrolling();
  }

  // Crear indicadores de navegación
  function createNavigationDots() {
      sliderConfig.slides.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = 'slider-dot';
          dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
          dot.addEventListener('click', () => goToSlide(index));
          sliderConfig.dotsContainer.appendChild(dot);
      });
  }

  // Navegar a un slide específico
  function goToSlide(index) {
      // Validar índice
      const slideCount = sliderConfig.slides.length;
      sliderConfig.currentIndex = (index + slideCount) % slideCount;
      
      // Actualizar slides
      sliderConfig.slides.forEach(slide => slide.classList.remove('active'));
      sliderConfig.slides[sliderConfig.currentIndex].classList.add('active');
      
      // Actualizar dots
      const dots = sliderConfig.dotsContainer.children;
      Array.from(dots).forEach(dot => dot.classList.remove('active'));
      dots[sliderConfig.currentIndex].classList.add('active');
      
      // Reiniciar autoplay si está activo
      if (sliderConfig.isAutoPlaying) {
          resetAutoPlay();
      }
  }

  // Slide siguiente
  function nextSlide() {
      goToSlide(sliderConfig.currentIndex + 1);
  }

  // Slide anterior
  function prevSlide() {
      goToSlide(sliderConfig.currentIndex - 1);
  }

  // Control del autoplay
  function startAutoPlay() {
      if (sliderConfig.timer) clearInterval(sliderConfig.timer);
      sliderConfig.timer = setInterval(nextSlide, sliderConfig.interval);
      sliderConfig.isAutoPlaying = true;
  }

  function pauseAutoPlay() {
      clearInterval(sliderConfig.timer);
      sliderConfig.isAutoPlaying = false;
  }

  function resetAutoPlay() {
      pauseAutoPlay();
      startAutoPlay();
  }

  // Configurar event listeners
  function setupEventListeners() {
      sliderConfig.prevBtn.addEventListener('click', () => {
          prevSlide();
          pauseAutoPlay();
      });
      
      sliderConfig.nextBtn.addEventListener('click', () => {
          nextSlide();
          pauseAutoPlay();
      });
      
      // Pausar al interactuar con los controles
      const controls = [sliderConfig.prevBtn, sliderConfig.nextBtn, sliderConfig.dotsContainer];
      controls.forEach(control => {
          control.addEventListener('mouseenter', pauseAutoPlay);
          control.addEventListener('mouseleave', startAutoPlay);
          control.addEventListener('focusin', pauseAutoPlay);
          control.addEventListener('focusout', startAutoPlay);
      });
      
      // Pausar cuando la ventana no está visible
      document.addEventListener('visibilitychange', () => {
          document.hidden ? pauseAutoPlay() : startAutoPlay();
      });
  }

  // Efecto parallax para imágenes
  function setupParallaxEffect() {
      const slideImages = document.querySelectorAll('.slide-image img');
      
      window.addEventListener('scroll', function() {
          const scrollPosition = window.pageYOffset;
          
          slideImages.forEach(img => {
              img.style.transform = `translateY(${scrollPosition * 0.3}px)`;
          });
      });
  }

  // Observer para animaciones al aparecer
  function setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.slide-content, .slide-image').forEach(el => {
          observer.observe(el);
      });
  }
  
  // Smooth scrolling para enlaces internos
  function setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              const targetId = this.getAttribute('href');
              if (targetId === '#' || targetId === '#!') return;
              
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                  e.preventDefault();
                  targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
                  
                  // Actualizar URL sin recargar
                  if (history.pushState) {
                      history.pushState(null, null, targetId);
                  } else {
                      location.hash = targetId;
                  }
              }
          });
      });
  }

  // Inicializar todo
  initSlider();

  // Manejar redimensionamiento
  window.addEventListener('resize', function() {
      if (window.innerWidth <= 992) {
          // Desactivar parallax en móviles
          document.querySelectorAll('.slide-image img').forEach(img => {
              img.style.transform = '';
          });
      }
  });
});