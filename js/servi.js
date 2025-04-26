document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize slider
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
      
      // Add animation to active slide content
      const activeContent = slides[index].querySelector('.slide-content');
      activeContent.style.animation = 'none';
      setTimeout(() => {
        activeContent.style.animation = 'slideInLeft 0.8s ease-out';
      }, 10);
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      showSlide(currentSlide);
    }
    
    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
    
    // Show first slide initially
    showSlide(0);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('mobile-menu-open');
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Service card hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.querySelector('.service-icon').style.transform = 'rotate(10deg) scale(1.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.querySelector('.service-icon').style.transform = 'rotate(0) scale(1)';
      });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .feature-item, .gallery-item');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  });