document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navList.style.display = isExpanded ? 'none' : 'flex';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navList.style.display = 'none';
                }
            });
        });
        
        // Manejar cambios de tamaño de pantalla
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navList.style.display = 'flex';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                navList.style.display = isExpanded ? 'flex' : 'none';
            }
        });
        
        // Estado inicial
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
        }
    }

    // Efecto de aparición suave para las tarjetas de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    
    const animateCards = () => {
        servicioCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * index);
        });
    };
    
    // Inicializar las tarjetas con opacidad 0 para la animación
    if (servicioCards.length > 0) {
        servicioCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Animar cuando la sección es visible
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCards();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const serviciosSection = document.querySelector('.servicios-section');
        if (serviciosSection) {
            observer.observe(serviciosSection);
        }
    }
    
    // Smooth scroll para los enlaces del footer
    document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = window.innerWidth <= 768 ? 60 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenuBtn && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navList.style.display = 'none';
                }
            }
        });
    });
    
    // Actualizar año del copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
    }
});
/**
 * Header Module - Gestiona el comportamiento del header y navegación
 */
((window, document) => {
    'use strict';
    
    class Header {
        constructor() {
            this.selectors = {
                header: '.header',
                mobileMenuBtn: '#mobileMenuBtn',
                navbar: '.navbar',
                navLinks: '.nav-link',
                sections: 'section',
                overlay: '.navbar-overlay'
            };
            
            this.state = {
                lastScrollPosition: 0,
                isMobileMenuOpen: false,
                scrollDirection: 'down'
            };
            
            this.init();
        }
        
        init() {
            this.cacheElements();
            this.createOverlay();
            this.setupEventListeners();
            this.handleScroll();
        }
        
        cacheElements() {
            this.elements = {
                header: document.querySelector(this.selectors.header),
                mobileMenuBtn: document.querySelector(this.selectors.mobileMenuBtn),
                navbar: document.querySelector(this.selectors.navbar),
                navLinks: Array.from(document.querySelectorAll(this.selectors.navLinks)),
                sections: Array.from(document.querySelectorAll(this.selectors.sections))
            };
            
            if (!this.elements.header || !this.elements.mobileMenuBtn || !this.elements.navbar) {
                console.error('Elementos esenciales del header no encontrados');
                return;
            }
        }
        
        createOverlay() {
            if (window.innerWidth > 992) return;
            
            const overlay = document.createElement('div');
            overlay.className = 'navbar-overlay';
            document.body.appendChild(overlay);
            this.elements.overlay = overlay;
        }
        
        setupEventListeners() {
            // Menú móvil
            this.elements.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
            
            // Cerrar menú al hacer clic en enlace
            this.elements.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        this.closeMobileMenu();
                    }
                    this.setActiveLink(link);
                });
            });
            
            // Scroll con debounce
            window.addEventListener('scroll', this.debounce(() => this.handleScroll(), 15));
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (this.state.isMobileMenuOpen && 
                    !this.elements.navbar.contains(e.target) && 
                    !this.elements.mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            // Redimensionamiento
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992 && this.state.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
        
        toggleMobileMenu() {
            if (this.state.isMobileMenuOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
        
        openMobileMenu() {
            this.elements.mobileMenuBtn.classList.add('active');
            this.elements.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            this.elements.navbar.classList.add('active');
            this.elements.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.state.isMobileMenuOpen = true;
        }
        
        closeMobileMenu() {
            this.elements.mobileMenuBtn.classList.remove('active');
            this.elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            this.elements.navbar.classList.remove('active');
            this.elements.overlay.classList.remove('active');
            document.body.style.overflow = '';
            this.state.isMobileMenuOpen = false;
        }
        
        handleScroll() {
            const currentScroll = window.pageYOffset;
            const { header } = this.elements;
            
            // Determinar dirección del scroll
            this.state.scrollDirection = currentScroll > this.state.lastScrollPosition ? 'down' : 'up';
            
            // Efecto de scroll en el header
            if (currentScroll > 50) {
                header.classList.add('scrolled');
                
                if (this.state.scrollDirection === 'down' && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            this.state.lastScrollPosition = currentScroll;
            this.highlightActiveSection();
        }
        
        highlightActiveSection() {
            const scrollPosition = window.pageYOffset + 100;
            
            this.elements.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const activeLink = this.elements.navLinks.find(link => 
                        link.getAttribute('href') === `#${sectionId}`);
                    
                    if (activeLink) {
                        this.setActiveLink(activeLink);
                    }
                }
            });
        }
        
        setActiveLink(link) {
            this.elements.navLinks.forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });
            
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        
        debounce(func, wait) {
            let timeout;
            return () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(), wait);
            };
        }
    }
    
    // Inicialización
    document.addEventListener('DOMContentLoaded', () => {
        new Header();
    });
    
})(window, document);