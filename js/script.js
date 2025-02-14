let termsData = [];

const itemsPerPage = 5;
let currentPage = 1;

fetch('texts/terms.json')
    .then(response => response.json())
    .then(data => {
        termsData = data.terms;
        renderTable(currentPage);
    })
    .catch(error => console.error('Error al cargar los datos:', error));


function renderTable(page) {
    const tableBody = document.getElementById('tableBody');
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
                <td><img src="${term.image}" class="img-fluid" style="width: 300px; height: 120px;"></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(termsData.length / itemsPerPage);

    pagination.innerHTML = '';

    const maxVisiblePages = 5; // max pages number
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // previous button
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) prevLi.classList.add('disabled');
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Anterior" onclick="changePage(${currentPage - 1})">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    pagination.appendChild(prevLi);

    // number of pages
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) li.classList.add('active');
        li.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        `;
        pagination.appendChild(li);
    }

    // next button
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    if (currentPage === totalPages) nextLi.classList.add('disabled');
    nextLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Siguiente" onclick="changePage(${currentPage + 1})">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    pagination.appendChild(nextLi);
}


function changePage(page) {
    const totalPages = Math.ceil(termsData.length / itemsPerPage);

    console.log(`Intentando ir a la página: ${page}`);
    console.log(`Páginas totales: ${totalPages}`);

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable(currentPage);
    }
}
