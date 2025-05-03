class ElegantAutoSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.slide');
    this.currentIndex = 0;
    this.intervalTime = 6000;
    this.transitionTime = 1500;
    this.interval = null;
    
    this.init();
  }
  
  init() {
    this.preloadImages();
    this.showSlide(this.currentIndex);
    this.startRotation();
    
    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.pauseRotation() : this.startRotation();
    });
    
    // Touch events for mobile
    this.setupTouchEvents();
  }
  
  preloadImages() {
    this.slides.forEach(slide => {
      const img = new Image();
      img.src = slide.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)[1];
    });
  }
  
  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[index].classList.add('active');
    this.currentIndex = index;
  }
  
  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }
  
  startRotation() {
    if (!this.interval) {
      this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
    }
  }
  
  pauseRotation() {
    clearInterval(this.interval);
    this.interval = null;
  }
  
  setupTouchEvents() {
    let touchStartX = 0;
    
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      this.pauseRotation();
    }, { passive: true });
    
    this.slider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        diff > 0 ? this.nextSlide() : this.prevSlide();
      }
      
      this.startRotation();
    }, { passive: true });
  }
  
  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new ElegantAutoSlider('.hero-slider');
});