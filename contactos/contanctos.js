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