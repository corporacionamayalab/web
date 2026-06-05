/* ============================================
   HEADER PREMIUM - INTERACTIVIDAD
   Sticky, Glassmorphism, Menú Móvil, Swipe
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Elementos del DOM
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // ===== 1. STICKY + GLASSMORPHISM + PROGRESS BAR =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Solo ejecutar si existe la barra de progreso
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // ===== 2. MENÚ MÓVIL TOGGLE =====
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
            
            if (headerNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // ===== 3. CERRAR MENÚ AL HACER CLIC EN ENLACE =====
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // ===== 4. CERRAR MENÚ AL HACER CLIC FUERA =====
    document.addEventListener('click', (e) => {
        if (headerNav && menuToggle) {
            if (!headerNav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // ===== 5. CERRAR MENÚ CON TECLA ESCAPE =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && headerNav && headerNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // ===== 6. SWIPE PARA CERRAR Y ABRIR MENÚ =====
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (headerNav) {
        // Swipe dentro del menú para cerrar
        headerNav.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        headerNav.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            // Swipe hacia la derecha = cerrar
            if (touchEndX - touchStartX > 60) {
                closeMenu();
            }
        });
    }

    // Swipe desde el borde izquierdo para ABRIR el menú
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        // Swipe desde la izquierda (primeros 30px) hacia la derecha
        if (touchStartX < 30 && touchEndX - touchStartX > 60 && headerNav) {
            if (!headerNav.classList.contains('active')) {
                headerNav.classList.add('active');
                if (menuToggle) menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // ===== FUNCIÓN PARA CERRAR MENÚ =====
    function closeMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (headerNav) headerNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== 7. NAVEGACIÓN ACTIVA POR SCROLL (SPY) =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ===== 8. ESTADO INICIAL SI HAY SCROLL =====
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    }

});