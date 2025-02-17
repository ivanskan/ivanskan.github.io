// Definir los productos de todas las categorías
const products = {
  gaseosas: [
    { name: 'Coca Cola 1L', image: 'assets/img/coca-cola-1l.jpg', precio: '4.00' },
    { name: 'Coca Cola 2L', image: 'assets/img/g-coca-2l.jpg', precio: '7.00' },
    { name: 'Coca Cola 3L', image: 'assets/img/coca-cola-3l.jpg', precio: '12.00' },
    { name: 'Inca Kola 625ml', image: 'assets/img/g-inca-gordita.jpg', precio: '3.00' },
    { name: 'Inca Kola 1L', image: 'assets/img/g-inca-1l.jpg', precio: '4.00' },
    { name: 'Inca Kola 2L', image: 'assets/img/g-inca-2l.png', precio: '12.00' },
    { name: 'Inca Kola 3L', image: 'assets/img/g-inca-3l.jpg', precio: '12.00' },
    { name: 'Guaraná 3L', image: 'assets/img/g-guarana-3l.jpg', precio: '10.00' },
    { name: 'Guaraná 350ml', image: 'assets/img/g-guarana-350ml.jpg', precio: '1.00' },
    { name: 'Big Cola 400ml', image: 'assets/img/g-big-400ml.jpg', precio: '1.00' },
    { name: 'Big Cola 3L', image: 'assets/img/g-big-3l.jpg', precio: '8.00' },
    { name: 'Pepsi 3L', image: 'assets/img/g-pepsi-3l.jpg', precio: '10.00' },
    { name: 'Kr Piña 3L', image: 'assets/img/g-kr-piña-3l.jpg', precio: '10.00' },
    { name: 'Kr Piña 400ml', image: 'assets/img/g-kr-piña-400ml.jpg', precio: '1.00' },
    { name: 'Kr Limón 400ml', image: 'assets/img/g-kr-limon-400ml.jpg', precio: '1.00' },
  ],
  cervezas: [
    { name: 'Cerveza Cristal', image: 'assets/img/c-cristal.webp', precio: '6.50' },
    { name: 'Cusqueña Negra', image: 'assets/img/c-negra.jpg', precio: '7.00' },
    { name: 'Cusqueña Trigo', image: 'assets/img/c-trigo.jpg', precio: '7.00' }
  ],
  aguas: [
    { name: 'Agua Cielo', image: 'assets/img/a-cielo.jpg', precio: '1.00' },
    { name: 'Agua Benedictino', image: 'assets/img/a-benedictino.png', precio: '1.00' },
    { name: 'Agua San Luis', image: 'assets/img/a-san-luis.jpg', precio: '1.00' }
  ],
  bebidas: [
    { name: 'Pulp 350ml', image: 'assets/img/b-pulp-350ml.jpg', precio: '1.00' },
    { name: 'Pulp 1L', image: 'assets/img/b-pulp-1l.jpg', precio: '1.00' },
    { name: 'Volt 350ml', image: 'assets/img/b-volt-350ml.jpg', precio: '2.50' },
    { name: 'Cifrut Naranja 350ml', image: 'assets/img/b-cifrut-naranja-350ml.jpg', precio: '1.00' },
    { name: 'Cifrut Granadilla 350ml', image: 'assets/img/b-cifrut-granadilla-350ml.jpg', precio: '1.00' },
    { name: 'Sporade 500ml', image: 'assets/img/b-sporade-500ml.jpg', precio: '2.50' },
    { name: 'Powerade 600ml', image: 'assets/img/b-powerade-600ml.jpg', precio: '2.50' },
    { name: 'Frugos del valle 500ml', image: 'assets/img/b-del-valle-500ml.jpg', precio: '2.00' },
    { name: 'Frugos del valle 1.5L', image: 'assets/img/b-del-valle-1.5l.jpg', precio: '4.50' },
    { name: 'Frugos del valle 3L', image: 'assets/img/b-del-valle-3l.jpg', precio: '7.50' },
  ],
  leches: [
    { name: 'Leche Gloria', image: 'assets/img/l-gloria.jpg', precio: '5.00' },
    { name: 'Leche Ideal', image: 'assets/img/l-ideal.png', precio: '3.00' },
    { name: 'Leche Gloria 200ml', image: 'assets/img/l-gloria-xs.jpg', precio: '2.50' }
  ],
  detergentes: [
    { name: 'Ace', image: 'assets/img/d-ace.jpg', precio: '5.00' },
    { name: 'Opal', image: 'assets/img/d-opal.jpg', precio: '3.00' },
    { name: 'Trome', image: 'assets/img/d-trome.jpg', precio: '1.50' },
    { name: 'Patito', image: 'assets/img/d-patito.jpg', precio: '1.50' }
  ]
};

// Obtener elementos del DOM
const categoryTitle = document.getElementById('category-title');
const categorySelect = document.getElementById('category-select');
const productContainer = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const clearIcon = document.getElementById('clear-icon');

// Mostrar productos según la categoría seleccionada
function displayProducts(productList) {
  productContainer.innerHTML = '';  // Limpiar los productos existentes
  productList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-4', 'p-1', 'p-md-2', 'product-card');
    productCard.innerHTML = `
      <div class="card text-bg-warning h-100">
        <img src="${product.image}" class="card-img-top h-100" loading="lazy" alt="${product.name}">
        <div class="card-body px-1 text-center pb-0 mb-0">
          <span class="card-title d-block mb-0">${product.name}</span>
          <small class="mb-0">Precio: <span class="fw-bold">S/${product.precio}</small></p>
        </div>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Función para mostrar todos los productos
function displayAllProducts() {
  const allProducts = Object.values(products).flat();
  displayProducts(allProducts);
}

// Función para mostrar productos basados en la categoría
function displayCategoryProducts() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  if (selectedCategory) {
    categoryTitle.innerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    categorySelect.value = selectedCategory; // Establecer el valor del dropdown
    displayProducts(products[selectedCategory]);
  } else {
    categoryTitle.innerText = 'Todos los Productos';
    displayAllProducts();
  }
}

// Manejo del filtro de búsqueda
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const productName = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = productName.includes(query) ? 'flex' : 'none';
  });
});


// Función para limpiar la búsqueda al hacer clic en el ícono
clearIcon.addEventListener('click', () => {
  searchInput.value = '';  // Limpiar el valor del input de búsqueda
  displayCategoryProducts();  // Volver a mostrar los productos de la categoría seleccionada o todos los productos
});

// Actualizar productos al cambiar la categoría en el dropdown
categorySelect.addEventListener('change', function() {
  const category = this.value;
  localStorage.setItem('selectedCategory', category || '');  // Guardar la categoría seleccionada
  displayCategoryProducts();
});

// Inicializar el estado de la categoría y mostrar los productos al cargar la página
window.addEventListener('DOMContentLoaded', displayCategoryProducts);

// Mostrar todos los productos al hacer clic en el botón
document.getElementById('btnAllProducts').addEventListener('click', () => {
  localStorage.removeItem('selectedCategory');  // Eliminar la categoría seleccionada
  categorySelect.value = '';  // Resetear el dropdown
  displayAllProducts();  // Mostrar todos los productos
  categoryTitle.innerText = 'Todos los Productos';
});
