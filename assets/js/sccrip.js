document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM.  Se seleccionan todos los elementos con la clase 'nav-link' y se obtienen los elementos con los IDs 'home-content' y 'project-container'.
    const navLinks = document.querySelectorAll('.nav-link');
    const homeContent = document.getElementById('home-content');
    const projectContainer = document.getElementById('project-container');
    
    // Referencias a elementos del slider. Se seleccionan los slides, los puntos, los botones de navegación y los botones de proyecto.
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const projectButtons = document.querySelectorAll('.slide-btn');
    
    // Variable para controlar el slide actual.
    let currentSlide = 0;
    // Número total de slides.
    const totalSlides = dots.length;
    
    // Función para navegar entre las páginas (inicio y proyectos).
    function navigateTo(page) {
        // Remover la clase 'active' de todos los enlaces de navegación.
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Agregar la clase 'active' al enlace correspondiente a la página seleccionada.
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Mostrar u ocultar el contenido según la página seleccionada.
        if (page === 'home') {
            homeContent.style.display = 'flex';
            projectContainer.style.display = 'none';
            projectContainer.src = ''; // Limpiar la fuente del iframe
        } else {
            homeContent.style.display = 'none';
            projectContainer.style.display = 'block';
            
            // Cargar el contenido del proyecto seleccionado desde la carpeta 'semanas'.
            // La estructura de carpetas se asume como: /proyectos/semanaX/index.html
            projectContainer.src = `./semanas/${page}/index.html`;
        }
    }
    
    // Función para mostrar un slide específico en el slider.
    function showSlide(index) {
        // Ajustar el índice para que se mantenga dentro del rango válido.
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        // Mover el slider usando transformaciones CSS.
        slides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
        
        // Actualizar la clase 'active' en los puntos del slider.
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Agregar eventos de clic a los puntos del slider para cambiar de slide.
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Agregar eventos de clic a los botones de navegación del slider (anterior y siguiente).
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Agregar eventos de clic a los botones de proyecto en el slider para navegar a la página del proyecto.
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectPage = this.dataset.project;
            navigateTo(projectPage);
        });
    });
    
    // Agregar eventos de clic a los enlaces de navegación para cambiar de página.
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
    
    // Navegar a la página de inicio al cargar la página.
    navigateTo('home');
});
