document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navbar = document.querySelector('.navbar');
  
  mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navbar.classList.toggle('active');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Validate form
          const name = document.getElementById('name');
          const email = document.getElementById('email');
          const message = document.getElementById('message');
          const consent = document.getElementById('consent');
          let isValid = true;
          
          // Reset error states
          document.querySelectorAll('.form-group').forEach(group => {
              group.classList.remove('error');
          });
          
          // Validate name
          if (!name.value.trim()) {
              name.closest('.form-group').classList.add('error');
              isValid = false;
          }
          
          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email.value)) {
              email.closest('.form-group').classList.add('error');
              isValid = false;
          }
          
          // Validate message
          if (!message.value.trim()) {
              message.closest('.form-group').classList.add('error');
              isValid = false;
          }
          
          // Validate consent
          if (!consent.checked) {
              consent.closest('.form-group').classList.add('error');
              isValid = false;
          }
          
          if (isValid) {
              // Simulate form submission
              const submitBtn = contactForm.querySelector('button[type="submit"]');
              submitBtn.disabled = true;
              submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
              
              // In a real implementation, you would use fetch() or AJAX here
              setTimeout(() => {
                  alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
                  contactForm.reset();
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
              }, 1500);
          }
      });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
              mobileMenuBtn.classList.remove('active');
              navbar.classList.remove('active');
              mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
      });
  });
});