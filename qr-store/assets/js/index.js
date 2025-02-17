document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      localStorage.setItem('selectedCategory', category);
      window.location.href = 'productos.html'; // Navegar a la página de productos
    });
  });

 // Definir todas las categorías
 const categorias = [
  { name: 'Gaseosas', image: 'assets/img/soda-group.jpg', category: 'gaseosas' },
  { name: 'Cervezas', image: 'assets/img/cerveza-group.webp', category: 'cervezas' },
  { name: 'Bebidas', image: 'assets/img/bebidas-category.avif', category: 'bebidas' },
  { name: 'Agua', image: 'assets/img/water-group.jpg', category: 'aguas' },
  { name: 'Despensa', image: 'assets/img/despensa.jpeg', category: 'despensa' },
  { name: 'Leches', image: 'assets/img/leche-category.jpg', category: 'leches' },
  { name: 'Detergentes', image: 'assets/img/detergente-category.jpg', category: 'detergentes' },
  { name: 'Higiene', image: 'assets/img/higiene-category.jpg', category: 'higiene' },
];

// Función para generar las tarjetas dinámicamente
function generateCategoryCards() {
  const categoryList = document.getElementById('category-list');
  categorias.forEach(categoria => {
    // Crear los elementos de la tarjeta
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'text-bg-warning', 'h-100');
    cardDiv.setAttribute('onclick', `window.location.href='productos.html'; selectCategory('${categoria.category}')`);

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top', 'h-100',);
    cardImg.setAttribute('loading', 'lazy');
    cardImg.setAttribute('src', categoria.image);
    cardImg.setAttribute('alt', categoria.name);

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('d-flex', 'align-items-center', 'justify-content-center');

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-grid-fill');

    const title = document.createElement('h6');
    title.classList.add('card-title', 'mb-0', 'ms-1');
    title.innerText = categoria.name;

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
