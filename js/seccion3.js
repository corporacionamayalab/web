document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura para el título
    const typedTitle = document.querySelector('.typed-out');
    if (typedTitle) {
      setTimeout(() => {
        typedTitle.style.borderRight = 'none';
      }, 3000);
    }
  
    // Intersection Observer para animaciones
    const animateOnScroll = () => {
      const cards = document.querySelectorAll('.dna-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
  
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
      });
    };
  
    // Video background fallback
    const videoFallback = () => {
      const videoBg = document.querySelector('.video-background video');
      if (videoBg) {
        videoBg.addEventListener('error', () => {
          const fallbackImg = document.querySelector('.video-background img');
          if (fallbackImg) {
            fallbackImg.style.display = 'block';
            document.querySelector('.video-overlay').style.backgroundColor = 'var(--dna-dark)';
          }
        });
      }
    };
  
    // Inicializar funciones
    animateOnScroll();
    videoFallback();
  
    // Efecto hover avanzado para botones
    const buttons = document.querySelectorAll('.dna-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        const x = e.pageX - button.getBoundingClientRect().left;
        const y = e.pageY - button.getBoundingClientRect().top;
        
        const ripples = document.createElement('span');
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;
        ripples.classList.add('ripple-effect');
        
        button.appendChild(ripples);
        
        setTimeout(() => {
          ripples.remove();
        }, 1000);
      });
    });
  });
  
  // AOS Animation (si usas la librería AOS)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }