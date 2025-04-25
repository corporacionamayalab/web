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