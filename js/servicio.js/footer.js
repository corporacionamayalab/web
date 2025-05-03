document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scroll para el botón "Volver arriba"
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Mostrar/ocultar botón "Volver arriba" al hacer scroll
    window.addEventListener('scroll', function() {
      const backToTop = document.querySelector('.back-to-top');
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });
    
    // Animación para los elementos del footer al aparecer
    const footerCols = document.querySelectorAll('.footer-col');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    footerCols.forEach(col => {
      col.style.opacity = '0';
      col.style.transform = 'translateY(20px)';
      col.style.transition = 'all 0.5s ease-out';
      observer.observe(col);
    });
  });