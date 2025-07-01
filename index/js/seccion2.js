document.addEventListener('DOMContentLoaded', function() {
    // Animación de las tarjetas al aparecer
    const serviceCards = document.querySelectorAll('.service-card');
    
    const animateCards = () => {
      serviceCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 200 * index);
        
        // Estilos iniciales para la animación
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
    };
    
    // Intersection Observer para animar cuando son visibles
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCards();
          servicesObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesObserver.observe(servicesSection);
    }
    
    // Efecto hover avanzado para las tarjetas
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const x = e.clientX - card.getBoundingClientRect().left;
        const y = e.clientY - card.getBoundingClientRect().top;
        
        const centerX = card.offsetWidth / 2;
        const centerY = card.offsetHeight / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
      });
    });
    
    // Animación del DNA
    const dnaIllustration = document.querySelector('.dna-illustration');
    if (dnaIllustration) {
      const animateDNA = () => {
        const paths = dnaIllustration.querySelectorAll('path');
        paths.forEach((path, index) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          
          // Animación
          path.animate([
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
          ], {
            duration: 2000,
            delay: index * 300,
            fill: 'forwards',
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
          });
        });
      };
      
      // Observador para el DNA
      const dnaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateDNA();
            dnaObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      dnaObserver.observe(dnaIllustration);
    }
    
    // Efecto de partículas para el fondo (opcional)
    const initParticles = () => {
      if (document.querySelector('.services-section')) {
        const section = document.querySelector('.services-section');
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.3';
        section.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
        
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`
          });
        }
        
        const animateParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
          }
          
          requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        window.addEventListener('resize', () => {
          canvas.width = section.offsetWidth;
          canvas.height = section.offsetHeight;
        });
      }
    };
    
    // Inicializar partículas (opcional, descomentar si se desea)
    // initParticles();
  });