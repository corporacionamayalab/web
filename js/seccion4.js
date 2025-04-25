document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año automáticamente
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Efecto de seguimiento del mouse en las secciones
    const sections = document.querySelectorAll('.footer-organic-section');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            section.style.setProperty('--mouse-x', `${x}px`);
            section.style.setProperty('--mouse-y', `${y}px`);
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.removeProperty('--mouse-x');
            section.style.removeProperty('--mouse-y');
        });
    });
    
    // Efecto de ondas al hacer clic
    document.querySelector('.footer-organic').addEventListener('click', function(e) {
        // Solo crear onda si se hace clic en el fondo, no en los elementos
        if (e.target === this) {
            createWave(e.clientX, e.clientY);
        }
    });
    
    function createWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'footer-particle';
        
        const size = Math.random() * 20 + 10;
        wave.style.width = `${size}px`;
        wave.style.height = `${size}px`;
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        
        document.querySelector('.footer-organic').appendChild(wave);
        
        // Animación
        const animation = wave.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(10)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => wave.remove();
    }
    
    // Efecto hover orgánico para enlaces
    const organicLinks = document.querySelectorAll('.organic-link');
    
    organicLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transitionDelay = '0s';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transitionDelay = '0.1s';
        });
    });
    
    // Efecto de rebote para botones de acción
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-5px)';
        });
    });
    
    // Efecto de burbuja para iconos sociales
    const socialBubbles = document.querySelectorAll('.social-bubble');
    
    socialBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            bubble.style.transform = 'translateY(-8px) scale(1.15)';
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = '';
        });
    });
});