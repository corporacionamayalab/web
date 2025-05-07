document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVBAR TOGGLE ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // ========== HERO SLIDER ==========
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 segundos
    
    // Crear indicadores
    slides.forEach((slide, index) => {
      const indicator = document.createElement('span');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.slide-indicators span');
    
    // Iniciar slider
    function startSlider() {
      slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Detener slider
    function stopSlider() {
      clearInterval(slideInterval);
    }
    
    // Ir a slide específico
    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }
    
    // Slide siguiente
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
    
    // Slide anterior
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
      nextSlide();
      stopSlider();
      startSlider();
    });
    
    prevBtn.addEventListener('click', function() {
      prevSlide();
      stopSlider();
      startSlider();
    });
    
    // Pausar slider al pasar el ratón
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
    
    // Inicializar
    slides[0].classList.add('active');
    indicators[0].classList.add('active');
    startSlider();
    
    // ========== ANIMACIONES AL SCROLL ==========
    const animateOnScroll = function() {
      const steps = document.querySelectorAll('.step');
      
      steps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (stepPosition < screenPosition) {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Configurar animaciones iniciales
    window.addEventListener('load', function() {
      document.querySelectorAll('.step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      animateOnScroll();
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });