document.addEventListener('DOMContentLoaded', function() {
    // Sistema de pestañas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones y contenidos
            tabBtns.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animación de los círculos de porcentaje
    const graphicCircles = document.querySelectorAll('.graphic-circle');
    
    graphicCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (percent / 100) * circumference;
        
        circle.style.setProperty('--circumference', circumference);
        circle.style.setProperty('--offset', offset);
        
        // Animación al aparecer
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            circle.style.strokeDashoffset = offset;
        }, 300);
    });
    
    // Efecto hover para las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.servicio-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Botones de agendar
    const agendarBtns = document.querySelectorAll('.btn-agendar');
    
    agendarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const servicio = this.closest('.servicio-card').getAttribute('data-servicio');
            console.log(`Agendando servicio: ${servicio}`);
            // Aquí puedes agregar la lógica para abrir un modal o redirigir
            alert(`Servicio ${servicio} agregado a tu cita`);
        });
    });
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.servicio-card, .info-panel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});