// Lightbox para la galería
document.addEventListener('DOMContentLoaded', function() {
    // Crear lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="close-lightbox">&times;</span>
      <div class="lightbox-content">
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    // Variables
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    
    // Abrir lightbox al hacer clic en una imagen
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        
        lightbox.style.display = 'flex';
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        document.body.style.overflow = 'hidden'; // Evitar scroll
      });
    });
    
    // Cerrar lightbox
    closeBtn.addEventListener('click', function() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Animaciones al desplazarse
    const animateOnScroll = () => {
      const features = document.querySelectorAll('.feature-item');
      const windowHeight = window.innerHeight;
      
      features.forEach(feature => {
        const featurePosition = feature.getBoundingClientRect().top;
        
        if (featurePosition < windowHeight - 100) {
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Configurar animaciones iniciales
    document.querySelectorAll('.feature-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.6s ease-out';
    });
    
    // Ejecutar al cargar y al desplazar
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para anclas
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