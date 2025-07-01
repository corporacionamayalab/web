document.addEventListener('DOMContentLoaded', () => {
    // --- Carrousel de Imágenes del Laboratorio ---
    const labGallerySection = document.getElementById('lab-galeria-imagenes');

    // Proceed only if the lab gallery section exists on the page
    if (labGallerySection) {
        const carrouselInner = labGallerySection.querySelector('.lab-carrusel-inner');
        const images = Array.from(carrouselInner.querySelectorAll('.lab-carrusel-img'));
        const totalImages = images.length;

        // Get navigation buttons and carousel container for hover
        const prevBtn = labGallerySection.querySelector('.lab-carrusel-btn-prev');
        const nextBtn = labGallerySection.querySelector('.lab-carrusel-btn-next');
        const carrouselContainer = labGallerySection.querySelector('.lab-carrusel-contenedor'); // Use the main container for hover

        // If there are no images or only one, no need for a carrousel
        if (totalImages <= 1) {
            const indicatorsContainer = labGallerySection.querySelector('.lab-carrusel-indicadores');
            if (indicatorsContainer) {
                indicatorsContainer.style.display = 'none';
            }
            // Also hide navigation buttons if they exist
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return; // Exit the function as carrousel logic is not needed
        }

        let currentIndex = 0;
        const intervalTime = 4000; // 4 seconds per image
        let slideInterval;

        const indicatorsContainer = labGallerySection.querySelector('.lab-carrusel-indicadores');

        if (!indicatorsContainer) {
            console.error("Error: '.lab-carrusel-indicadores' container not found within '#lab-galeria-imagenes'. Carrousel indicators will not function.");
        } else {
            indicatorsContainer.innerHTML = '';

            images.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('lab-punto');
                if (index === 0) {
                    dot.classList.add('activo');
                }
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval(); // Reset timer when user interacts
                });
                indicatorsContainer.appendChild(dot);
            });
        }

        const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.lab-punto') : [];

        /**
         * Navigates the carrousel to a specific slide index.
         * @param {number} index The target slide index.
         */
        function goToSlide(index) {
            if (index >= totalImages) {
                index = 0; // Loop back to the first image
            } else if (index < 0) {
                index = totalImages - 1; // Loop back to the last image
            }

            currentIndex = index;
            const offset = -currentIndex * 100;
            carrouselInner.style.transform = `translateX(${offset}%)`;

            // Update active state of indicator dots
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('activo');
                } else {
                    dot.classList.remove('activo');
                }
            });
        }

        /** Moves the carrousel to the next slide. */
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        /** Moves the carrousel to the previous slide. */
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        /** Starts the automatic slide interval. */
        function startInterval() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        /** Clears and restarts the automatic slide interval. */
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // --- Event Listeners for Carousel ---
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval(); // Reset timer when user interacts
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval(); // Reset timer when user interacts
            });
        }

        // Pause on hover, resume on mouse leave
        if (carrouselContainer) {
            carrouselContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval); // Pause interval
            });

            carrouselContainer.addEventListener('mouseleave', () => {
                startInterval(); // Resume interval
            });
        }

        // Initialize the carrousel
        startInterval();
    }

    // --- Actualización Dinámica del Año en el Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = '2024'; // This line will now correctly set it to 2024
    }
});

// REMOVED THE DUPLICATE DOMContentLoaded LISTENER THAT WAS OVERWRITING THE YEAR
/*
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
*/