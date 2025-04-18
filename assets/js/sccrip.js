document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const navLinks = document.querySelectorAll('.nav-link');
    const homeContent = document.getElementById('home-content');
    const projectContainer = document.getElementById('project-container');
    
    // Referencias para el slider
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const projectButtons = document.querySelectorAll('.slide-btn');
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    
    // Función para cambiar entre páginas
    function navigateTo(page) {
        // Actualizar clases activas
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Mostrar/ocultar contenido según la selección
        if (page === 'home') {
            homeContent.style.display = 'flex';
            projectContainer.style.display = 'none';
            projectContainer.src = '';
        } else {
            homeContent.style.display = 'none';
            projectContainer.style.display = 'block';
            
            // Cargar el proyecto seleccionado
            // La estructura de carpetas debería ser: /proyectos/semanaX/index.html
            projectContainer.src = `./semanas/${page}/index.html`;
        }
    }
    
    // Función para mostrar un slide específico
    function showSlide(index) {
        // Validar índice
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        // Mover el slider
        slides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
        
        // Actualizar los dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Eventos para los dots del slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Eventos para las flechas del slider
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Eventos para los botones de proyecto en el slider
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectPage = this.dataset.project;
            navigateTo(projectPage);
        });
    });
    
    // Agregar evento de clic a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
    
    // Iniciar en la página de inicio
    navigateTo('home');
});