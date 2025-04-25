document.addEventListener('DOMContentLoaded', function() {
    // Animación para los elementos de características al aparecer en el viewport
    const featureItems = document.querySelectorAll('.feature-item, .valor-item');
    
    const animateOnScroll = function() {
        featureItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuración inicial para la animación
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Efecto hover para los botones de redes sociales
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Botón de WhatsApp flotante (podrías añadirlo si lo necesitas)
    // Botón de WhatsApp flotante - Versión corregida
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/51990571182';
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';

// Estilos corregidos (sin línea no deseada)
whatsappBtn.style.position = 'fixed';
whatsappBtn.style.bottom = '30px';
whatsappBtn.style.right = '30px';
whatsappBtn.style.backgroundColor = '#25D366';
whatsappBtn.style.color = 'white';
whatsappBtn.style.width = '60px';
whatsappBtn.style.height = '60px';
whatsappBtn.style.borderRadius = '50%';
whatsappBtn.style.display = 'flex';
whatsappBtn.style.alignItems = 'center';
whatsappBtn.style.justifyContent = 'center';
whatsappBtn.style.fontSize = '30px';
whatsappBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
whatsappBtn.style.zIndex = '1000';
whatsappBtn.style.transition = 'all 0.3s ease';
whatsappBtn.style.border = 'none'; // Asegura que no haya bordes
whatsappBtn.style.outline = 'none'; // Elimina el outline
whatsappBtn.style.textDecoration = 'none'; // Elimina subrayados

// Efectos hover
whatsappBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
});

whatsappBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
});

document.body.appendChild(whatsappBtn);
    
    document.body.appendChild(whatsappBtn);
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