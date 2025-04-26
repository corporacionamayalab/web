document.addEventListener('DOMContentLoaded', function() {
    // Menu móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Mostrar/ocultar campo "Otro servicio"
    const tipoServicio = document.getElementById('tipo_servicio');
    const otrosServicioContainer = document.getElementById('otros-servicio-container');
    
    tipoServicio.addEventListener('change', function() {
        if (this.value === 'otros') {
            otrosServicioContainer.style.display = 'block';
            document.getElementById('otros_servicio').setAttribute('required', '');
        } else {
            otrosServicioContainer.style.display = 'none';
            document.getElementById('otros_servicio').removeAttribute('required');
        }
    });
    
    // Mostrar/ocultar campo de información del seguro
    const seguroMedico = document.querySelectorAll('input[name="seguro_medico"]');
    const seguroInfoContainer = document.getElementById('seguro-info-container');
    
    seguroMedico.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'si') {
                seguroInfoContainer.style.display = 'block';
                document.getElementById('info_seguro').setAttribute('required', '');
            } else {
                seguroInfoContainer.style.display = 'none';
                document.getElementById('info_seguro').removeAttribute('required');
            }
        });
    });
    
    // Mostrar/ocultar campo de hora específica
    const horaPreferida = document.getElementById('hora_preferida');
    const horaEspecificaContainer = document.getElementById('hora-especifica-container');
    
    horaPreferida.addEventListener('change', function() {
        if (this.value === 'especifica') {
            horaEspecificaContainer.style.display = 'block';
            document.getElementById('hora_especifica').setAttribute('required', '');
        } else {
            horaEspecificaContainer.style.display = 'none';
            document.getElementById('hora_especifica').removeAttribute('required');
        }
    });
    
    // Validación de fecha de nacimiento
    const fechaNacimiento = document.getElementById('fecha_nacimiento');
    const fechaActual = new Date();
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaActual.getFullYear() - 120); // 120 años atrás
    
    fechaNacimiento.max = fechaActual.toISOString().split('T')[0];
    fechaNacimiento.min = fechaMinima.toISOString().split('T')[0];
    
    // Validación de fecha preferida (no puede ser en el pasado)
    const fechaPreferida = document.getElementById('fecha_preferida');
    fechaPreferida.min = fechaActual.toISOString().split('T')[0];
    
    // Manejo del envío del formulario
    const labForm = document.getElementById('labForm');
    
    labForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación adicional si es necesaria
        const formData = new FormData(this);
        
        // Envío con Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Gracias por su solicitud. Nos pondremos en contacto con usted pronto.');
                labForm.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        })
        .catch(error => {
            alert('Hubo un problema al enviar su solicitud. Por favor, inténtelo de nuevo más tarde.');
            console.error('Error:', error);
        });
    });
});