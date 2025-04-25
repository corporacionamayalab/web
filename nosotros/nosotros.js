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