/* ========== INICIO DE CÓDIGO NUEVO ========== */
// Funcionalidad de cotización
const quoteBtn = document.getElementById('quoteBtn');
let selectedExams = [];

// Crear modal de cotización
const quoteModal = document.createElement('div');
quoteModal.className = 'quote-modal';
quoteModal.innerHTML = `
    <div class="quote-modal-content">
        <span class="quote-modal-close">&times;</span>
        <h2><i class="fas fa-file-invoice-dollar"></i> Cotización de Exámenes</h2>
        <div class="quote-items" id="quoteItems"></div>
        <div class="quote-total">Total: <span id="quoteTotal">$0</span></div>
        <div class="quote-actions">
            <button class="close-btn">Cerrar</button>
            <button class="print-btn"><i class="fas fa-print"></i> Imprimir</button>
        </div>
    </div>
`;
document.body.appendChild(quoteModal);

// Toggle selección de exámenes
examsContainer.addEventListener('click', function(e) {
    const examCard = e.target.closest('.exam-card');
    if (!examCard) return;
    
    examCard.classList.toggle('selected');
    const examName = examCard.querySelector('.card-header h3').textContent.trim();
    const examCode = examCard.querySelector('.exam-code').textContent;
    
    if (examCard.classList.contains('selected')) {
        // Agregar a selección
        if (!selectedExams.some(exam => exam.code === examCode)) {
            selectedExams.push({
                name: examName.replace(examCode, '').trim(),
                code: examCode,
                price: getRandomPrice()
            });
        }
    } else {
        // Quitar de selección
        selectedExams = selectedExams.filter(exam => exam.code !== examCode);
    }
    
    updateQuoteButton();
});

// Generar precio aleatorio (simulación)
function getRandomPrice() {
    return Math.floor(Math.random() * 200) + 50; // Entre $50 y $250
}

// Actualizar estado del botón de cotización
function updateQuoteButton() {
    quoteBtn.disabled = selectedExams.length === 0;
    quoteBtn.innerHTML = `<i class="fas fa-file-invoice-dollar"></i> Cotizar (${selectedExams.length})`;
}

// Mostrar modal de cotización
quoteBtn.addEventListener('click', function() {
    const quoteItems = document.getElementById('quoteItems');
    const quoteTotal = document.getElementById('quoteTotal');
    
    quoteItems.innerHTML = selectedExams.map(exam => `
        <div class="quote-item">
            <div>
                <strong>${exam.name}</strong>
                <div class="text-muted">${exam.code}</div>
            </div>
            <div>$${exam.price}</div>
        </div>
    `).join('');
    
    const total = selectedExams.reduce((sum, exam) => sum + exam.price, 0);
    quoteTotal.textContent = `$${total}`;
    
    quoteModal.style.display = 'flex';
});

// Cerrar modal
quoteModal.querySelector('.quote-modal-close').addEventListener('click', function() {
    quoteModal.style.display = 'none';
});

quoteModal.querySelector('.close-btn').addEventListener('click', function() {
    quoteModal.style.display = 'none';
});

// Imprimir cotización
quoteModal.querySelector('.print-btn').addEventListener('click', function() {
    window.print();
});

// Cerrar al hacer clic fuera del modal
quoteModal.addEventListener('click', function(e) {
    if (e.target === quoteModal) {
        quoteModal.style.display = 'none';
    }
});

// Inicializar botón deshabilitado
updateQuoteButton();
/* ========== FIN DE CÓDIGO NUEVO ========== */


document.addEventListener('DOMContentLoaded', function() {
    // Datos de especialidades médicas ampliadas
    const specialties = [
        "Medicina General",
        "Cardiología",
        "Endocrinología",
        "Gastroenterología",
        "Hematología",
        "Infectología",
        "Nefrología",
        "Neurología",
        "Oncología",
        "Pediatría",
        "Neumología",
        "Reumatología",
        "Ginecología",
        "Urología",
        "Cirugía General",
        "Dermatología",
        "Alergología",
        "Inmunología",
        "Rehabilitación",
        "Medicina Interna",
        "Geriatría",
        "Nutriología",
        "Psiquiatría",
        "Traumatología",
        "Oftalmología",
        "Otorrinolaringología"
    ];

    // Categorías de laboratorio
    const categories = [
        { id: "hematologia", name: "Hematología" },
        { id: "bioquimica", name: "Bioquímica Clínica" },
        { id: "microbiologia", name: "Microbiología" },
        { id: "inmunologia", name: "Inmunología" },
        { id: "hormonas", name: "Hormonas" },
        { id: "orina", name: "Análisis de Orina" },
        { id: "heces", name: "Análisis de Heces" },
        { id: "molecular", name: "Biología Molecular" },
        { id: "toxicologia", name: "Toxicología" },
        { id: "genetica", name: "Genética" },
        { id: "coagulacion", name: "Coagulación" },
        { id: "citologia", name: "Citología" },
        { id: "parasitologia", name: "Parasitología" },
        { id: "serologia", name: "Serología" }
    ];

    // Departamentos de laboratorio
    const departments = [
        "Hematología",
        "Bioquímica",
        "Microbiología",
        "Inmunología",
        "Biología Molecular",
        "Patología",
        "Citogenética",
        "Banco de Sangre",
        "Urgencias",
        "Endocrinología"
    ];

    // Datos completos de exámenes de laboratorio
    const exams = [
        // Hematología
        { 
            name: "Hemograma completo", 
            description: "Evaluación cuantitativa y cualitativa de los elementos formes de la sangre.", 
            specialty: ["Medicina General", "Hematología", "Pediatría", "Oncología"], 
            category: "hematologia",
            department: "Hematología",
            code: "HEMO",
            urgency: "routine",
            synonyms: ["CSC", "Conteo sanguíneo completo"]
        },
        { 
            name: "Recuento de plaquetas", 
            description: "Determinación del número de plaquetas por unidad de volumen de sangre.", 
            specialty: ["Hematología", "Medicina General", "Cirugía General"], 
            category: "hematologia",
            department: "Hematología",
            code: "PLAQ",
            urgency: "urgent"
        },
        { 
            name: "Velocidad de sedimentación globular (VSG)", 
            description: "Medida no específica de inflamación basada en la tasa de sedimentación de eritrocitos.", 
            specialty: ["Reumatología", "Medicina General", "Infectología"], 
            category: "hematologia",
            department: "Hematología",
            code: "VSG",
            urgency: "routine"
        },
        { 
            name: "Frotis de sangre periférica", 
            description: "Examen microscópico de células sanguíneas para evaluar morfología.", 
            specialty: ["Hematología", "Oncología"], 
            category: "hematologia",
            department: "Hematología",
            code: "FSP",
            urgency: "special"
        },
        
        // Bioquímica
        { 
            name: "Glucosa en sangre", 
            description: "Medición de concentración de glucosa en plasma sanguíneo.", 
            specialty: ["Endocrinología", "Medicina General", "Pediatría"], 
            category: "bioquimica",
            department: "Bioquímica",
            code: "GLU",
            urgency: "routine"
        },
        { 
            name: "Perfil lipídico", 
            description: "Conjunto de pruebas para evaluar riesgo cardiovascular (colesterol total, HDL, LDL, triglicéridos).", 
            specialty: ["Cardiología", "Endocrinología", "Medicina General"], 
            category: "bioquimica",
            department: "Bioquímica",
            code: "LIPID",
            urgency: "routine"
        },
        { 
            name: "Urea y creatinina", 
            description: "Evaluación de función renal mediante medición de productos de desecho metabólico.", 
            specialty: ["Nefrología", "Medicina General", "Urología"], 
            category: "bioquimica",
            department: "Bioquímica",
            code: "URCR",
            urgency: "urgent"
        },
        { 
            name: "Perfil hepático", 
            description: "Conjunto de pruebas para evaluar función hepática (AST, ALT, bilirrubinas, proteínas).", 
            specialty: ["Gastroenterología", "Medicina General"], 
            category: "bioquimica",
            department: "Bioquímica",
            code: "HEPAT",
            urgency: "routine"
        },
        
        // Microbiología
        { 
            name: "Urocultivo", 
            description: "Cultivo microbiológico para identificación de bacterias en orina.", 
            specialty: ["Urología", "Ginecología", "Medicina General", "Nefrología"], 
            category: "microbiologia",
            department: "Microbiología",
            code: "UROC",
            urgency: "routine"
        },
        { 
            name: "Coprocultivo", 
            description: "Cultivo microbiológico para identificación de patógenos intestinales.", 
            specialty: ["Gastroenterología", "Medicina General", "Pediatría", "Infectología"], 
            category: "microbiologia",
            department: "Microbiología",
            code: "COPR",
            urgency: "routine"
        },
        { 
            name: "Hemocultivo", 
            description: "Cultivo de sangre para detección de bacteriemia o fungemia.", 
            specialty: ["Infectología", "Medicina General", "Oncología"], 
            category: "microbiologia",
            department: "Microbiología",
            code: "HEMOC",
            urgency: "urgent"
        },
        
        // Inmunología
        { 
            name: "VIH (ELISA)", 
            description: "Detección de anticuerpos contra el virus de inmunodeficiencia humana.", 
            specialty: ["Infectología", "Medicina General"], 
            category: "inmunologia",
            department: "Inmunología",
            code: "VIH",
            urgency: "routine"
        },
        { 
            name: "Prueba rápida de dengue", 
            description: "Detección de antígenos NS1 y anticuerpos IgM/IgG contra dengue.", 
            specialty: ["Infectología", "Medicina General", "Pediatría"], 
            category: "inmunologia",
            department: "Inmunología",
            code: "DENG",
            urgency: "urgent"
        },
        
        // Hormonas
        { 
            name: "TSH", 
            description: "Hormona estimulante de la tiroides para evaluación de función tiroidea.", 
            specialty: ["Endocrinología", "Medicina General"], 
            category: "hormonas",
            department: "Endocrinología",
            code: "TSH",
            urgency: "routine"
        },
        { 
            name: "T4 libre", 
            description: "Tiroxina libre, hormona tiroidea activa.", 
            specialty: ["Endocrinología"], 
            category: "hormonas",
            department: "Endocrinología",
            code: "T4L",
            urgency: "routine"
        },
        { 
            name: "Cortisol", 
            description: "Hormona esteroidea producida por la glándula suprarrenal.", 
            specialty: ["Endocrinología", "Medicina General"], 
            category: "hormonas",
            department: "Endocrinología",
            code: "CORT",
            urgency: "routine"
        },
        
        // Orina
        { 
            name: "Examen general de orina", 
            description: "Análisis físico, químico y microscópico de orina.", 
            specialty: ["Medicina General", "Nefrología", "Urología", "Ginecología"], 
            category: "orina",
            department: "Bioquímica",
            code: "EGO",
            urgency: "routine"
        },
        { 
            name: "Proteinuria en 24 horas", 
            description: "Cuantificación de proteínas excretadas en orina durante 24 horas.", 
            specialty: ["Nefrología"], 
            category: "orina",
            department: "Bioquímica",
            code: "PROT24",
            urgency: "routine"
        },
        
        // Heces
        { 
            name: "Examen parasitológico de heces", 
            description: "Detección de parásitos intestinales mediante examen microscópico.", 
            specialty: ["Gastroenterología", "Medicina General", "Pediatría", "Infectología"], 
            category: "heces",
            department: "Parasitología",
            code: "EPH",
            urgency: "routine"
        },
        { 
            name: "Sangre oculta en heces", 
            description: "Detección de hemoglobina no visible en materia fecal.", 
            specialty: ["Gastroenterología", "Medicina General"], 
            category: "heces",
            department: "Bioquímica",
            code: "SOH",
            urgency: "routine"
        },
        
        // Biología Molecular
        { 
            name: "PCR para VPH", 
            description: "Detección de ADN de virus del papiloma humano mediante reacción en cadena de polimerasa.", 
            specialty: ["Ginecología"], 
            category: "molecular",
            department: "Biología Molecular",
            code: "VPH",
            urgency: "special"
        },
        { 
            name: "PCR para COVID-19", 
            description: "Detección de ARN del virus SARS-CoV-2 mediante RT-PCR.", 
            specialty: ["Infectología", "Medicina General", "Neumología"], 
            category: "molecular",
            department: "Biología Molecular",
            code: "COVID",
            urgency: "urgent"
        },
        
        // Toxicología
        { 
            name: "Drogas de abuso en orina", 
            description: "Detección cualitativa de drogas psicoactivas en muestra de orina.", 
            specialty: ["Psiquiatría", "Medicina General"], 
            category: "toxicologia",
            department: "Toxicología",
            code: "DROG",
            urgency: "routine"
        },
        
        // Genética
        { 
            name: "Cariotipo", 
            description: "Análisis cromosómico para detectar anomalías genéticas.", 
            specialty: ["Genética", "Ginecología", "Pediatría"], 
            category: "genetica",
            department: "Citogenética",
            code: "KARYO",
            urgency: "special"
        }
    ];

    // Elementos del DOM
    const specialtyFilter = document.getElementById('specialtyFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    const urgencyFilter = document.getElementById('urgencyFilter');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const advancedFiltersToggle = document.getElementById('advancedFiltersToggle');
    const advancedFilters = document.getElementById('advancedFilters');
    const examsContainer = document.getElementById('examsContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav ul');
    const notification = document.getElementById('notification');

    // Inicializar filtros
    function initializeFilters() {
        // Llenar filtro de especialidades
        specialties.sort().forEach(specialty => {
            const option = document.createElement('option');
            option.value = specialty;
            option.textContent = specialty;
            specialtyFilter.appendChild(option);
        });

        // Llenar filtro de categorías
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });

        // Llenar filtro de departamentos
        departments.sort().forEach(department => {
            const option = document.createElement('option');
            option.value = department;
            option.textContent = department;
            departmentFilter.appendChild(option);
        });
    }

    // Mostrar notificación
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = 'notification show';
        
        // Establecer color según tipo
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-color)';
        } else if (type === 'warning') {
            notification.style.backgroundColor = 'var(--warning-color)';
        } else if (type === 'error') {
            notification.style.backgroundColor = 'var(--danger-color)';
        }
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Renderizar exámenes
    function renderExams(filteredExams = exams) {
        examsContainer.innerHTML = '';
        
        if (filteredExams.length === 0) {
            noResults.style.display = 'block';
            examsContainer.style.display = 'none';
            resultsCount.textContent = '0 resultados';
            return;
        }
        
        noResults.style.display = 'none';
        examsContainer.style.display = 'grid';
        resultsCount.textContent = `${filteredExams.length} ${filteredExams.length === 1 ? 'resultado' : 'resultados'}`;
        
        filteredExams.forEach(exam => {
            const examCard = document.createElement('div');
            examCard.className = 'exam-card';
            
            // Obtener nombre de categoría
            const categoryObj = categories.find(cat => cat.id === exam.category);
            const categoryName = categoryObj ? categoryObj.name : exam.category;
            
            examCard.innerHTML = `
                <div class="card-header">
                    <h3>${exam.name} <span class="exam-code">${exam.code}</span></h3>
                    <span class="exam-department">${exam.department}</span>
                </div>
                <div class="card-body">
                    <p class="exam-description">${exam.description}</p>
                    <div class="exam-details">
                        <div class="exam-meta">
                            <span title="Categoría"><i class="fas fa-tag"></i> ${categoryName}</span>
                            <span title="Tiempo de entrega"><i class="fas fa-clock"></i> ${getUrgencyText(exam.urgency)}</span>
                        </div>
                        <div class="exam-specialties">
                            <h4><i class="fas fa-user-md"></i> Especialidades que solicitan:</h4>
                            <div class="specialty-list">
                                ${exam.specialty.map(spec => `<span class="specialty-badge">${spec}</span>`).join('')}
                            </div>
                        </div>
                        <button class="quote-btn" data-exam-code="${exam.code}" data-exam-name="${exam.name}">
                            <i class="fas fa-file-invoice-dollar"></i> Cotizar
                        </button>
                    </div>
                </div>
            `;
            
            examsContainer.appendChild(examCard);
        });

        // Agregar event listeners a los botones de cotización
        document.querySelectorAll('.quote-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const examName = this.getAttribute('data-exam-name');
                const examCode = this.getAttribute('data-exam-code');
                showNotification(`Cotización solicitada para ${examName} (${examCode})`, 'success');
                
                // Aquí puedes agregar la lógica para manejar la cotización
                // Por ejemplo: abrir un modal, enviar a otra página, etc.
            });
        });
    }

    // Obtener texto de urgencia
    function getUrgencyText(urgency) {
        const urgencyMap = {
            "urgent": "Urgente (≤24h)",
            "routine": "Rutinario (24-48h)",
            "special": "Especial (≥72h)"
        };
        return urgencyMap[urgency] || urgency;
    }

    // Filtrar exámenes
    function filterExams() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpecialty = specialtyFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedDepartment = departmentFilter.value;
        const selectedUrgency = urgencyFilter.value;
        
        const filtered = exams.filter(exam => {
            // Filtro por búsqueda
            const matchesSearch = 
                exam.name.toLowerCase().includes(searchTerm) || 
                exam.description.toLowerCase().includes(searchTerm) ||
                exam.code.toLowerCase().includes(searchTerm) ||
                (exam.synonyms && exam.synonyms.some(syn => syn.toLowerCase().includes(searchTerm)));
            
            // Filtro por especialidad
            const matchesSpecialty = selectedSpecialty === 'all' || 
                                  exam.specialty.includes(selectedSpecialty);
            
            // Filtro por categoría
            const matchesCategory = selectedCategory === 'all' || 
                                  exam.category === selectedCategory;
            
            // Filtro por departamento
            const matchesDepartment = selectedDepartment === 'all' || 
                                    exam.department === selectedDepartment;
            
            // Filtro por urgencia
            const matchesUrgency = selectedUrgency === 'all' || 
                                 exam.urgency === selectedUrgency;
            
            return matchesSearch && matchesSpecialty && matchesCategory && 
                  matchesDepartment && matchesUrgency;
        });
        
        // Actualizar título de resultados
        updateResultsTitle(selectedSpecialty, selectedCategory, selectedDepartment);
        
        renderExams(filtered);
    }

    // Actualizar título de resultados
    function updateResultsTitle(specialty, category, department) {
        let title = "Todos los exámenes";
        
        if (specialty !== 'all' || category !== 'all' || department !== 'all') {
            title = "Exámenes filtrados";
            
            const filters = [];
            if (specialty !== 'all') filters.push(`Especialidad: ${specialty}`);
            
            if (category !== 'all') {
                const categoryObj = categories.find(cat => cat.id === category);
                filters.push(`Categoría: ${categoryObj ? categoryObj.name : category}`);
            }
            
            if (department !== 'all') filters.push(`Departamento: ${department}`);
            
            title += ` (${filters.join(' • ')})`;
        }
        
        resultsTitle.textContent = title;
    }

    // Cambiar vista entre grid y lista
    function setupViewToggle() {
        gridViewBtn.addEventListener('click', function() {
            examsContainer.classList.remove('list-view');
            examsContainer.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            localStorage.setItem('viewPreference', 'grid');
        });
        
        listViewBtn.addEventListener('click', function() {
            examsContainer.classList.remove('grid-view');
            examsContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            localStorage.setItem('viewPreference', 'list');
        });
        
        // Cargar preferencia de vista
        const savedView = localStorage.getItem('viewPreference') || 'grid';
        if (savedView === 'list') {
            listViewBtn.click();
        } else {
            gridViewBtn.click();
        }
    }

    // Mostrar/ocultar filtros avanzados
    advancedFiltersToggle.addEventListener('click', function() {
        advancedFilters.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-sliders-h');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Menú móvil
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Event listeners para filtros
    searchInput.addEventListener('input', filterExams);
    searchBtn.addEventListener('click', filterExams);
    specialtyFilter.addEventListener('change', filterExams);
    categoryFilter.addEventListener('change', filterExams);
    departmentFilter.addEventListener('change', filterExams);
    urgencyFilter.addEventListener('change', filterExams);

    // Inicializar
    initializeFilters();
    setupViewToggle();
    renderExams();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('Bienvenido al catálogo de exámenes de laboratorio', 'success');
    }, 500);
});