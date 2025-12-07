let termsData = [];
let filteredTerms = [];
let isSearching = false;

const itemsPerPage = 5;
let currentPage = 1;

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

function renderTable(page) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const dataToShow = isSearching ? filteredTerms : termsData;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    tableBody.innerHTML = '';

    if (dataToShow.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-warning py-5">
                    <strong>No se encontraron resultados para tu búsqueda</strong>
                </td>
            </tr>
        `;
        const pagination = document.getElementById('pagination');
        if (pagination) pagination.innerHTML = '';
        return;
    }

    const pageTerms = dataToShow.slice(startIndex, endIndex);
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

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const dataToShow = isSearching ? filteredTerms : termsData;
    const totalPages = Math.ceil(dataToShow.length / itemsPerPage);

    pagination.innerHTML = '';

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) prevLi.classList.add('disabled');
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Anterior" onclick="changePage(${currentPage - 1}); return false;">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    pagination.appendChild(prevLi);

    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) li.classList.add('active');
        li.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
        `;
        pagination.appendChild(li);
    }

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
    const dataToShow = isSearching ? filteredTerms : termsData;
    const totalPages = Math.ceil(dataToShow.length / itemsPerPage);

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable(currentPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return false;
}

function searchTerms(query) {
    const searchResults = document.getElementById('searchResults');

    if (!query || query.trim() === '') {
        isSearching = false;
        filteredTerms = [];
        currentPage = 1;
        renderTable(currentPage);
        if (searchResults) searchResults.textContent = '';
        return;
    }

    isSearching = true;
    const searchQuery = query.toLowerCase().trim();

    filteredTerms = termsData.filter(term => {
        return term.name.toLowerCase().includes(searchQuery) ||
               term.description.toLowerCase().includes(searchQuery);
    });

    currentPage = 1;
    renderTable(currentPage);

    if (searchResults) {
        if (filteredTerms.length === 0) {
            searchResults.textContent = 'No se encontraron resultados';
        } else if (filteredTerms.length === 1) {
            searchResults.textContent = '1 resultado encontrado';
        } else {
            searchResults.textContent = `${filteredTerms.length} resultados encontrados`;
        }
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.textContent = '';

    isSearching = false;
    filteredTerms = [];
    currentPage = 1;
    renderTable(currentPage);
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
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
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        });
    }
}

function initScrollToTopButton() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollToTopButton();

    if (document.getElementById('glossaryTable')) {
        initializeLazyLoading();

        const searchInput = document.getElementById('searchInput');
        const clearButton = document.getElementById('clearSearch');

        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                searchTerms(e.target.value);
            }, 300));

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchTerms(e.target.value);
                }
            });
        }

        if (clearButton) {
            clearButton.addEventListener('click', clearSearch);
        }
    }
});

window.addEventListener('error', (event) => {
    console.error('Error detectado:', event.error);
});

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