class HeroSlider {
  constructor() {
      this.slides = document.querySelectorAll('.slide');
      this.dots = document.querySelectorAll('.slider-dot');
      this.prevBtn = document.querySelector('.slider-arrow.prev');
      this.nextBtn = document.querySelector('.slider-arrow.next');
      this.currentSlide = 0;
      this.slideInterval = 6000;
      this.autoSlide = true;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.slideShow = null;
      
      this.init();
  }
  
  init() {
      // Initialize first slide
      this.showSlide(this.currentSlide);
      
      // Start autoplay
      this.startAutoSlide();
      
      // Event listeners
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
      
      // Dot navigation
      this.dots.forEach((dot, index) => {
          dot.addEventListener('click', () => this.goToSlide(index));
      });
      
      // Pause on hover
      const sliderContainer = document.querySelector('.slider-container');
      sliderContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
      sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
      
      // Touch events for mobile
      sliderContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      sliderContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
      });
  }
  
  showSlide(index) {
      // Hide all slides
      this.slides.forEach(slide => slide.classList.remove('active'));
      this.dots.forEach(dot => dot.classList.remove('active'));
      
      // Show selected slide
      this.slides[index].classList.add('active');
      this.dots[index].classList.add('active');
      
      // Reset animations
      this.resetAnimations(this.slides[index]);
      
      // Update current slide
      this.currentSlide = index;
  }
  
  resetAnimations(slide) {
      const animatedElements = slide.querySelectorAll('[class*="-animate"]');
      
      animatedElements.forEach(el => {
          const className = Array.from(el.classList).find(c => c.includes('-animate'));
          el.classList.remove(className);
          void el.offsetWidth; // Trigger reflow
          el.classList.add(className);
      });
  }
  
  nextSlide() {
      const nextIndex = (this.currentSlide + 1) % this.slides.length;
      this.showSlide(nextIndex);
      this.restartAutoSlide();
  }
  
  prevSlide() {
      const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.showSlide(prevIndex);
      this.restartAutoSlide();
  }
  
  goToSlide(index) {
      this.showSlide(index);
      this.restartAutoSlide();
  }
  
  startAutoSlide() {
      if (this.autoSlide) {
          this.slideShow = setInterval(() => this.nextSlide(), this.slideInterval);
      }
  }
  
  pauseAutoSlide() {
      clearInterval(this.slideShow);
  }
  
  restartAutoSlide() {
      this.pauseAutoSlide();
      this.startAutoSlide();
  }
  
  handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
      this.pauseAutoSlide();
  }
  
  handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
      this.startAutoSlide();
  }
  
  handleSwipe() {
      const threshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      
      if (diff > threshold) {
          this.nextSlide();
      } else if (diff < -threshold) {
          this.prevSlide();
      }
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
});