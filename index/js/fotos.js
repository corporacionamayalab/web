document.addEventListener('DOMContentLoaded', function() {
    // 1. Lazy Loading para las imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-item img');

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src') || img.src; // Usa data-src si existe
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src'); // Limpia el atributo para evitar recarga
                    img.classList.add('loaded'); // Añade una clase para posibles transiciones CSS
                }
                observer.unobserve(img); // Deja de observar una vez cargada
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px', // Carga 100px antes de que la imagen entre en el viewport
        threshold: 0.1 // Dispara cuando el 10% de la imagen es visible
    });

    galleryImages.forEach(img => {
        // Mueve el src original a data-src para lazy loading
        if (img.src) {
            img.setAttribute('data-src', img.src);
            img.removeAttribute('src'); // Quita el src para que no se cargue inmediatamente
        }
        lazyLoadObserver.observe(img);
    });

    // 2. Efecto de Partículas de Fondo para la sección de galería (opcional)
    const gallerySection = document.querySelector('.local-gallery-section');
    const particleContainer = document.createElement('div');
    particleContainer.id = 'gallery-particles'; // Asegúrate de que este ID coincida con tu HTML si lo añades
    gallerySection.prepend(particleContainer); // Añade el contenedor de partículas al inicio de la sección

    const numParticles = 10; // Número de partículas
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'gallery-section-particle';
        particleContainer.appendChild(particle);

        // Posición y tamaño aleatorios
        const size = Math.random() * 20 + 10; // 10px a 30px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        // Retraso de animación aleatorio para que no empiecen a la vez
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // Duración aleatoria 10-20s
    }

    // 3. Funcionalidad de Lightbox (Base - la implementación completa requiere más JS/Librería)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            if (!imgSrc) return; // Si la imagen aún no se ha cargado con lazy-load, no hacer nada

            // Crea el overlay del lightbox
            const lightboxOverlay = document.createElement('div');
            lightboxOverlay.classList.add('lightbox-overlay');

            // Crea la imagen grande dentro del lightbox
            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;
            lightboxImg.alt = this.querySelector('img').alt;
            lightboxImg.classList.add('lightbox-img');

            // Agrega un botón de cerrar
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;'; // Símbolo 'x'

            lightboxOverlay.appendChild(lightboxImg);
            lightboxOverlay.appendChild(closeBtn);
            body.appendChild(lightboxOverlay);
            body.style.overflow = 'hidden'; // Evita el scroll del fondo

            // Cierra el lightbox al hacer clic en el overlay o en el botón de cerrar
            lightboxOverlay.addEventListener('click', function(e) {
                if (e.target === lightboxOverlay || e.target === closeBtn) {
                    lightboxOverlay.remove();
                    body.style.overflow = ''; // Restaura el scroll
                }
            });

            // Cierra el lightbox con la tecla ESC
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    lightboxOverlay.remove();
                    body.style.overflow = '';
                    document.removeEventListener('keydown', handler); // Limpia el listener
                }
            });
        });
    });
});