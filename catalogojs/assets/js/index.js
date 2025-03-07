    function selectCategory(category) {
      localStorage.setItem('selectedCategory', category);
    }

    // Función para generar las tarjetas de categorías dinámicamente
    function generateCategoryCards() {
      const categoryList = document.getElementById('category-list');
      categories.forEach(category => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'text-bg-warning', 'h-100');
        cardDiv.setAttribute('onclick', `window.location.href='productos.html'; selectCategory('${category.id}')`);

        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top', 'h-100');
        cardImg.setAttribute('loading', 'lazy');
        cardImg.setAttribute('src', category.image);
        cardImg.setAttribute('alt', category.name);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('d-flex', 'align-items-center', 'justify-content-center');

        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-grid-fill');

        const title = document.createElement('h6');
        title.classList.add('card-title', 'mb-0', 'ms-1');
        title.innerText = category.name;

        // Append los elementos
        cardContentDiv.appendChild(icon);
        cardContentDiv.appendChild(title);
        cardBodyDiv.appendChild(cardContentDiv);
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);

        // Agregar la tarjeta al contenedor
        categoryList.appendChild(colDiv);
      });
    }

    // Llamar a la función para generar las tarjetas cuando el documento esté listo
    document.addEventListener('DOMContentLoaded', generateCategoryCards);
