document.addEventListener('DOMContentLoaded', function() {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Por favor complete todos los campos obligatorios.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor ingrese un correo electrónico válido.');
                return;
            }
            
            // Simular envío del formulario
            console.log('Formulario enviado:', {
                name,
                email,
                phone: document.getElementById('phone').value.trim(),
                subject,
                message
            });
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.');
            
            // Resetear formulario
            contactForm.reset();
        });
    }
    
    // Validación de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Smooth scrolling para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación para los elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-item, .contact-form, .social-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar observadores de intersección para animaciones
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-item, .contact-form, .social-section').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Inicializar animaciones al cargar
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Puedes agregar tracking aquí
            console.log('WhatsApp button clicked');
        });
    }
    
    // Botones de llamada
    const callButtons = document.querySelectorAll('a[href^="tel:"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Tracking para llamadas
            console.log('Call button clicked:', this.getAttribute('href'));
        });
    });
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