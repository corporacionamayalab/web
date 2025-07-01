document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation a');
    
    // Función para alternar menú móvil
    function toggleMobileMenu() {
        navigation.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (navigation.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    }
    
    // Evento para el botón del menú móvil
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú al hacer clic en enlace (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMobileMenu();
            }
        });
    });
    
    // Añadir clase activa al enlace actual
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--dark-blue)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--primary-blue)';
        }
    });
});