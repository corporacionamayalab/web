document.addEventListener('DOMContentLoaded', function() {
    // Efecto de hover para los elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
        
        // Click para ampliar imagen (puedes implementar un lightbox)
        item.addEventListeyner('click', function() {
            // Aquí puedes agregar funcionalidad para un lightbox
            console.log('Imagen clickeada:', this.querySelector('img').alt);
        });
    });
    
    // Smooth scroll para enlaces (si los hay)
    document.querySelectorAll('.footer-bottom a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animación para los elementos de contacto
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        // Animación de aparición
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500);
    });
    
    // Botón de WhatsApp flotante para móviles
    function createFloatingWhatsApp() {
        if (window.innerWidth <= 768) {
            const floatingBtn = document.createElement('a');
            floatingBtn.href = 'https://wa.me/1234567890';
            floatingBtn.className = 'floating-whatsapp';
            floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
            document.body.appendChild(floatingBtn);
            
            // Estilos dinámicos
            const style = document.createElement('style');
            style.textContent = `
                .floating-whatsapp {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background-color: #25D366;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    z-index: 1000;
                    animation: pulse 2s infinite;
                    text-decoration: none;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createFloatingWhatsApp();
    
    // Recrear el botón si cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        const existingBtn = document.querySelector('.floating-whatsapp');
        if (existingBtn) existingBtn.remove();
        createFloatingWhatsApp();
    });
});