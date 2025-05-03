document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu ul');
  
  mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close mobile menu if open
          navMenu.classList.remove('show');
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Hero Slider Functionality
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const indicatorsContainer = document.querySelector('.slide-indicators');
  let currentSlide = 0;
  
  // Create indicators
  slides.forEach((slide, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('slide-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
  });
  
  const indicators = document.querySelectorAll('.slide-indicator');
  
  function updateSlider() {
      slides.forEach((slide, index) => {
          slide.classList.remove('active');
          indicators[index].classList.remove('active');
      });
      
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
  }
  
  function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      updateSlider();
  }
  
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
  }
  
  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto slide change
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Animation on Scroll
  function animateOnScroll() {
      const elements = document.querySelectorAll('.step, .service-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  }
  
  // Set initial state for animated elements
  document.querySelectorAll('.step, .service-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Current Year for Footer
  document.querySelector('.copyright').innerHTML = `&copy; ${new Date().getFullYear()} LabClin. Todos los derechos reservados.`;
});