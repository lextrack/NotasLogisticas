let termsData = [];

const itemsPerPage = 5;
let currentPage = 1;

// CARGA DE DATOS DEL GLOSARIO
fetch('texts/terms.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        termsData = data.terms;
        renderTable(currentPage);
        initializeLazyLoading();
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        <strong>Error al cargar los términos. Por favor, recarga la página.</strong>
                    </td>
                </tr>
            `;
        }
    });

// RENDERIZAR TABLA DEL GLOSARIO
function renderTable(page) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    tableBody.innerHTML = '';

    const pageTerms = termsData.slice(startIndex, endIndex);
    pageTerms.forEach(term => {
        const row = `
            <tr>
                <th scope="row">${term.id}</th>
                <td><strong>${term.name}</strong></td>
                <td>${term.description}</td>
                <td>
                    <img 
                        data-src="${term.image}" 
                        class="img-fluid lazy-image" 
                        style="width: 300px; height: 120px; background-color: #1a1a1a;"
                        alt="${term.name}">
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    renderPagination();
    initializeLazyLoading();
}

// RENDERIZAR PAGINACIÓN
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(termsData.length / itemsPerPage);

    pagination.innerHTML = '';

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botón anterior
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) prevLi.classList.add('disabled');
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Anterior" onclick="changePage(${currentPage - 1}); return false;">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    pagination.appendChild(prevLi);

    // Números de página
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) li.classList.add('active');
        li.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
        `;
        pagination.appendChild(li);
    }

    // Botón siguiente
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    if (currentPage === totalPages) nextLi.classList.add('disabled');
    nextLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Siguiente" onclick="changePage(${currentPage + 1}); return false;">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    pagination.appendChild(nextLi);
}

function changePage(page) {
    const totalPages = Math.ceil(termsData.length / itemsPerPage);

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable(currentPage);
        
        // Scroll suave hacia arriba al cambiar de página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    return false;
}

// LAZY LOADING DE IMÁGENES
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy-image');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antiguos
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        });
    }
}

// BOTÓN VOLVER ARRIBA
function initScrollToTopButton() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollBtn) return;

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Funcionalidad del botón
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    initScrollToTopButton();
    
    if (document.getElementById('glossaryTable')) {
        initializeLazyLoading();
    }
});

// MANEJO DE ERRORES GLOBAL
window.addEventListener('error', (event) => {
    console.error('Error detectado:', event.error);
});

// OPTIMIZACIÓN: Debounce para scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}