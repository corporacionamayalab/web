document.addEventListener('DOMContentLoaded', function() {
    // Menu móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
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

  // Mostrar/ocultar campo "Hora específica"
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

  // Validación de fecha (no permitir fechas pasadas)
  const fechaPreferida = document.getElementById('fecha_preferida');
  const hoy = new Date().toISOString().split('T')[0];
  fechaPreferida.setAttribute('min', hoy);

  // Validación del formulario antes de enviar
  const labForm = document.getElementById('labForm');

  labForm.addEventListener('submit', function(e) {
    let isValid = true;
    
    // Validar que al menos un servicio esté seleccionado
    if (tipoServicio.value === '') {
      isValid = false;
      tipoServicio.style.borderColor = 'var(--accent-color)';
    } else {
      tipoServicio.style.borderColor = '#ddd';
    }

    // Validar fecha de nacimiento (debe ser en el pasado)
    const fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    const hoyDate = new Date();
    
    if (fechaNacimiento >= hoyDate) {
      isValid = false;
      document.getElementById('fecha_nacimiento').style.borderColor = 'var(--accent-color)';
    } else {
      document.getElementById('fecha_nacimiento').style.borderColor = '#ddd';
    }

    if (!isValid) {
      e.preventDefault();
      alert('Por favor complete todos los campos requeridos correctamente.');
    } else {
      // Mostrar mensaje de éxito (simulado)
      alert('Su solicitud ha sido enviada con éxito. Nos pondremos en contacto con usted pronto.');
    }
  });

  // Resetear estilos de validación al cambiar los campos
  const inputs = labForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = '#ddd';
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});