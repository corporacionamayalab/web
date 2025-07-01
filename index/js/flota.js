// index/js/load-components.js

document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar un componente HTML
    function loadComponent(elementId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(elementId).innerHTML = html;
            })
            .catch(error => {
                console.error(`Error al cargar el componente ${filePath}:`, error);
            });
    }

    // Crea un div para los botones sociales flotantes
    const socialFloatContainer = document.createElement('div');
    socialFloatContainer.id = 'social-float-placeholder'; // Le damos un ID para que la función lo encuentre
    document.body.appendChild(socialFloatContainer); // Lo añade al final del body

    // Carga los botones sociales flotantes
    // Asegúrate de que la ruta sea correcta desde la raíz de tu proyecto
    loadComponent('social-float-placeholder', 'components/social-float.html');

    // Aquí podrías añadir otras llamadas si tuvieras más componentes:
    // loadComponent('otro-placeholder', 'components/otro-componente.html');
});