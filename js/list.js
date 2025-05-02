document.addEventListener('DOMContentLoaded', () => {
    // Base de datos ampliada de exámenes clínicos
    const analisisData = [
        // Hematología (20)
        { id: 1, nombre: "Hemograma completo", categoria: "hematologia" },
        { id: 2, nombre: "Ferritina", categoria: "hematologia" },
        { id: 3, nombre: "Hierro sérico", categoria: "hematologia" },
        { id: 4, nombre: "Transferrina", categoria: "hematologia" },
        { id: 5, nombre: "Índice de saturación de transferrina", categoria: "hematologia" },
        { id: 6, nombre: "PCR ultrasensible", categoria: "hematologia" },
        { id: 7, nombre: "VSG (Velocidad de sedimentación)", categoria: "hematologia" },
        { id: 8, nombre: "Coagulograma completo", categoria: "hematologia" },
        { id: 9, nombre: "Tiempo de protrombina (TP)", categoria: "hematologia" },
        { id: 10, nombre: "Tiempo de tromboplastina parcial (TTP)", categoria: "hematologia" },
        { id: 11, nombre: "Fibrinógeno", categoria: "hematologia" },
        { id: 12, nombre: "Dímero D", categoria: "hematologia" },
        { id: 13, nombre: "Antitrombina III", categoria: "hematologia" },
        { id: 14, nombre: "Proteinas totales", categoria: "hematologia" },
        { id: 15, nombre: "Electroforesis de hemoglobina", categoria: "hematologia" },
        { id: 16, nombre: "Reticulocitos", categoria: "hematologia" },
        { id: 17, nombre: "Frotis de sangre periférica", categoria: "hematologia" },
        { id: 18, nombre: "Prueba de fragilidad osmótica", categoria: "hematologia" },
        { id: 19, nombre: "Prueba de Coombs directa", categoria: "hematologia" },
        { id: 20, nombre: "Prueba de Coombs indirecta", categoria: "hematologia" },
        
        // Bioquímica (30)
        { id: 21, nombre: "Perfil bioquímico básico", categoria: "bioquimica" },
        { id: 22, nombre: "Perfil bioquímico completo", categoria: "bioquimica" },
        { id: 23, nombre: "Glucosa en ayunas", categoria: "bioquimica" },
        { id: 24, nombre: "Curva de tolerancia a la glucosa", categoria: "bioquimica" },
        { id: 25, nombre: "Hemoglobina glicosilada (HbA1c)", categoria: "bioquimica" },
        { id: 26, nombre: "Perfil lipídico completo", categoria: "bioquimica" },
        { id: 27, nombre: "Colesterol total", categoria: "bioquimica" },
        { id: 28, nombre: "HDL colesterol", categoria: "bioquimica" },
        { id: 29, nombre: "LDL colesterol", categoria: "bioquimica" },
        { id: 30, nombre: "Triglicéridos", categoria: "bioquimica" },
        { id: 31, nombre: "Ácido úrico", categoria: "bioquimica" },
        { id: 32, nombre: "Urea", categoria: "bioquimica" },
        { id: 33, nombre: "Creatinina", categoria: "bioquimica" },
        { id: 34, nombre: "Depuración de creatinina", categoria: "bioquimica" },
        { id: 35, nombre: "Perfil hepático completo", categoria: "bioquimica" },
        { id: 36, nombre: "Bilirrubina total", categoria: "bioquimica" },
        { id: 37, nombre: "Bilirrubina directa", categoria: "bioquimica" },
        { id: 38, nombre: "Bilirrubina indirecta", categoria: "bioquimica" },
        { id: 39, nombre: "Transaminasas (ALT/AST)", categoria: "bioquimica" },
        { id: 40, nombre: "Fosfatasa alcalina", categoria: "bioquimica" },
        { id: 41, nombre: "GGT (Gamma glutamil transferasa)", categoria: "bioquimica" },
        { id: 42, nombre: "Amilasa", categoria: "bioquimica" },
        { id: 43, nombre: "Lipasa", categoria: "bioquimica" },
        { id: 44, nombre: "Albúmina", categoria: "bioquimica" },
        { id: 45, nombre: "Proteinas totales", categoria: "bioquimica" },
        { id: 46, nombre: "Relación albúmina/globulina", categoria: "bioquimica" },
        { id: 47, nombre: "Electrolitos séricos", categoria: "bioquimica" },
        { id: 48, nombre: "Sodio", categoria: "bioquimica" },
        { id: 49, nombre: "Potasio", categoria: "bioquimica" },
        { id: 50, nombre: "Cloro", categoria: "bioquimica" },
        
        // Hormonas (25)
        { id: 51, nombre: "Perfil tiroideo completo", categoria: "hormonas" },
        { id: 52, nombre: "TSH (Hormona estimulante de tiroides)", categoria: "hormonas" },
        { id: 53, nombre: "T4 libre", categoria: "hormonas" },
        { id: 54, nombre: "T3 libre", categoria: "hormonas" },
        { id: 55, nombre: "T4 total", categoria: "hormonas" },
        { id: 56, nombre: "T3 total", categoria: "hormonas" },
        { id: 57, nombre: "Anticuerpos anti-tiroideos", categoria: "hormonas" },
        { id: 58, nombre: "Perfil hormonal femenino", categoria: "hormonas" },
        { id: 59, nombre: "Estradiol", categoria: "hormonas" },
        { id: 60, nombre: "Progesterona", categoria: "hormonas" },
        { id: 61, nombre: "FSH (Hormona folículo estimulante)", categoria: "hormonas" },
        { id: 62, nombre: "LH (Hormona luteinizante)", categoria: "hormonas" },
        { id: 63, nombre: "Prolactina", categoria: "hormonas" },
        { id: 64, nombre: "Testosterona total", categoria: "hormonas" },
        { id: 65, nombre: "Testosterona libre", categoria: "hormonas" },
        { id: 66, nombre: "SHBG (Globulina fijadora de hormonas sexuales)", categoria: "hormonas" },
        { id: 67, nombre: "Cortisol", categoria: "hormonas" },
        { id: 68, nombre: "ACTH (Hormona adrenocorticotrópica)", categoria: "hormonas" },
        { id: 69, nombre: "DHEA-S (Sulfato de dehidroepiandrosterona)", categoria: "hormonas" },
        { id: 70, nombre: "Aldosterona", categoria: "hormonas" },
        { id: 71, nombre: "Renina", categoria: "hormonas" },
        { id: 72, nombre: "Insulina", categoria: "hormonas" },
        { id: 73, nombre: "Péptido C", categoria: "hormonas" },
        { id: 74, nombre: "Hormona de crecimiento (GH)", categoria: "hormonas" },
        { id: 75, nombre: "IGF-1 (Factor de crecimiento insulínico)", categoria: "hormonas" },
        
        // Microbiología (15)
        { id: 76, nombre: "Urocultivo con antibiograma", categoria: "microbiologia" },
        { id: 77, nombre: "Coprocultivo", categoria: "microbiologia" },
        { id: 78, nombre: "Cultivo de secreción faríngea", categoria: "microbiologia" },
        { id: 79, nombre: "Cultivo de esputo", categoria: "microbiologia" },
        { id: 80, nombre: "Cultivo de líquido cefalorraquídeo", categoria: "microbiologia" },
        { id: 81, nombre: "Cultivo de líquido sinovial", categoria: "microbiologia" },
        { id: 82, nombre: "Cultivo de herida", categoria: "microbiologia" },
        { id: 83, nombre: "Cultivo de absceso", categoria: "microbiologia" },
        { id: 84, nombre: "Cultivo de catéter", categoria: "microbiologia" },
        { id: 85, nombre: "Prueba rápida de estreptococo", categoria: "microbiologia" },
        { id: 86, nombre: "Prueba de COVID-19 PCR", categoria: "microbiologia" },
        { id: 87, nombre: "Prueba rápida de influenza", categoria: "microbiologia" },
        { id: 88, nombre: "Prueba de Helicobacter pylori", categoria: "microbiologia" },
        { id: 89, nombre: "Prueba de tuberculosis (PPD)", categoria: "microbiologia" },
        { id: 90, nombre: "Examen parasitológico en heces", categoria: "microbiologia" },
        
        // Exámenes especializados (10)
        { id: 91, nombre: "Perfil reumático completo", categoria: "especiales" },
        { id: 92, nombre: "Factor reumatoide", categoria: "especiales" },
        { id: 93, nombre: "Anticuerpos anti-CCP", categoria: "especiales" },
        { id: 94, nombre: "ANA (Anticuerpos antinucleares)", categoria: "especiales" },
        { id: 95, nombre: "Perfil de marcadores tumorales", categoria: "especiales" },
        { id: 96, nombre: "CEA (Antígeno carcinoembrionario)", categoria: "especiales" },
        { id: 97, nombre: "CA 125", categoria: "especiales" },
        { id: 98, nombre: "CA 19-9", categoria: "especiales" },
        { id: 99, nombre: "PSA (Antígeno prostático específico)", categoria: "especiales" },
        { id: 100, nombre: "Alfa-fetoproteína", categoria: "especiales" }
    ];

    // Elementos del DOM
    const analisisGrid = document.getElementById('analisis-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cotizarModal = document.getElementById('cotizar-modal');
    const closeModal = document.querySelector('.close-modal');
    const cotizarForm = document.getElementById('cotizar-form');

    // Mostrar todos los análisis al cargar
    displayAnalisis(analisisData);

    // Función para mostrar análisis
    function displayAnalisis(analisis) {
        analisisGrid.innerHTML = '';
        analisis.forEach(item => {
            const card = document.createElement('div');
            card.className = 'analisis-card';
            card.innerHTML = `
                <h3>${item.nombre}</h3>
                <p class="categoria">${item.categoria.toUpperCase()}</p>
                <button class="btn-cotizar" data-id="${item.id}" data-nombre="${item.nombre}">
                    <i class="fas fa-file-alt"></i> Solicitar Cotización
                </button>
            `;
            card.setAttribute('data-category', item.categoria);
            analisisGrid.appendChild(card);
        });

        // Event listeners para botones de cotización
        document.querySelectorAll('.btn-cotizar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nombreAnalisis = e.target.getAttribute('data-nombre');
                document.getElementById('mensaje').value = nombreAnalisis;
                openModal();
            });
        });
    }

    // Búsqueda
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredAnalisis = analisisData.filter(item => 
            item.nombre.toLowerCase().includes(searchTerm)
        );
        displayAnalisis(filteredAnalisis);
    });

    // Filtrado por categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                displayAnalisis(analisisData);
            } else {
                const filteredAnalisis = analisisData.filter(item => 
                    item.categoria === filter
                );
                displayAnalisis(filteredAnalisis);
            }
        });
    });

    // Modal de cotización
    function openModal() {
        cotizarModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        cotizarModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeModalFunc);

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === cotizarModal) {
            closeModalFunc();
        }
    });

    // Enviar formulario
    cotizarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Solicitud enviada con éxito. Nos pondremos en contacto pronto.');
                closeModalFunc();
                this.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        })
        .catch(error => {
            alert('Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.');
            console.error(error);
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});