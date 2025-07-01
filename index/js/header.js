document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener referencias a los elementos del DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation a');
    const header = document.querySelector('.main-header'); // Ya lo tenías en el scroll, lo subimos.

    // 2. Función para alternar el menú móvil y gestionar la accesibilidad
    function toggleMobileMenu() {
        // Alterna la clase 'active' para mostrar/ocultar el menú
        navigation.classList.toggle('active');

        // Alterna el icono de Font Awesome (fa-bars <-> fa-times)
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');

        // Gestiona el atributo aria-expanded para accesibilidad
        const isExpanded = navigation.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);

        // Bloquea/desbloquea el scroll del body cuando el menú está abierto/cerrado
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Restablece el valor por defecto
        }
    }

    // Asegurarse de que los elementos existen antes de añadir listeners
    if (mobileMenuBtn && navigation) {
        // 3. Evento para el botón del menú móvil
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // 4. Cerrar menú al hacer clic en un enlace (solo en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Asegúrate de que estamos en una pantalla móvil para cerrar el menú
            // (Tu media query es <= 992px, así que usamos esa misma lógica)
            if (window.innerWidth <= 992 && navigation.classList.contains('active')) {
                toggleMobileMenu(); // Vuelve a llamar a la función para cerrar
            }
        });
    });

    // 5. Añadir clase 'active' al enlace de la página actual
    // Esto se ejecuta una vez al cargar la página
    const currentPage = location.pathname.split('/').pop() || 'index.html'; // Obtiene el nombre del archivo (ej. "index.html")
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href'); // Obtiene el href del enlace
        if (currentPage === linkPage) {
            link.classList.add('active'); // Añade la clase 'active' si coincide
        }
    });

    // 6. Efecto de scroll en el header (cambio de sombra y fondo)
    // Usamos una variable para el último scroll para evitar re-ejecuciones innecesarias en algunos casos,
    // pero el enfoque principal es mantener la simplicidad y ya tienes una transición CSS.
    let lastScrollY = window.scrollY; // Para posible optimización futura si se necesitara

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--dark-blue)'; // Usa la variable CSS
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--primary-blue)'; // Usa la variable CSS
        }
        lastScrollY = window.scrollY; // Actualiza la posición de scroll
    });

    // Opcional: Ejecutar el efecto de scroll una vez al cargar la página
    // Esto es útil si la página carga con scroll > 50px
    window.dispatchEvent(new Event('scroll'));
});