document.addEventListener('DOMContentLoaded', function() {
    // Solo activar slider en móviles/tablets
    if (window.innerWidth <= 992) {
      const slider = document.querySelector('.services-slider');
      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'slider-container';
      
      // Mover las tarjetas al contenedor del slider
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        sliderContainer.appendChild(card.cloneNode(true));
      });
      
      slider.appendChild(sliderContainer);
      
      // Crear controles
      const controls = document.createElement('div');
      controls.className = 'slider-controls';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'slider-btn';
      prevBtn.innerHTML = '&lt;';
      prevBtn.addEventListener('click', () => moveSlide(-1));
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'slider-btn';
      nextBtn.innerHTML = '&gt;';
      nextBtn.addEventListener('click', () => moveSlide(1));
      
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'slider-dots';
      
      // Crear puntos indicadores
      for (let i = 0; i < cards.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
      
      controls.appendChild(prevBtn);
      controls.appendChild(dotsContainer);
      controls.appendChild(nextBtn);
      slider.appendChild(controls);
      
      // Variables del slider
      let currentIndex = 0;
      const totalSlides = cards.length;
      
      // Función para mover el slider
      function moveSlide(direction) {
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
        updateSlider();
      }
      
      // Función para ir a un slide específico
      function goToSlide(index) {
        currentIndex = index;
        updateSlider();
      }
      
      // Actualizar slider
      function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar puntos activos
        document.querySelectorAll('.dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      // Touch events para móviles
      let touchStartX = 0;
      let touchEndX = 0;
      
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        if (touchEndX < touchStartX - 50) moveSlide(1); // Swipe izquierda
        if (touchEndX > touchStartX + 50) moveSlide(-1); // Swipe derecha
      }
      
      // Auto-avance opcional (descomentar si se desea)
      // setInterval(() => moveSlide(1), 5000);
    }
  });