// Simulación de productos para cada categoría
const products = {
  gaseosas: [
    { name: 'Coca Cola 1L', image: 'assets/img/coca-cola-1l.jpg', precio: '4.00' },
    { name: 'Inca Kola 3L', image: 'assets/img/inca-kola-3lts.jpg', precio: '12.00' },
    { name: 'Coca Cola 3L', image: 'assets/img/coca-cola-3l.jpg', precio: '12.00' }
  ],
  cervezas: [
    { name: 'Cerveza Cristal', image: 'assets/img/c-cristal.webp', precio: '6.50' },
    { name: 'Cusqueña Negra', image: 'assets/img/c-negra.jpg', precio: '7.00'},
    { name: 'Cusqueña Trigo', image: 'assets/img/c-trigo.jpg', precio: '7.00'}
  ],
  agua: [
    { name: 'Agua Cielo', image: 'assets/img/a-cielo.jpg', precio: '1.00'},
    { name: 'Agua Benedictino', image: 'assets/img/a-benedictino.png', precio: '1.00'},
    { name: 'Agua San Luis', image: 'assets/img/a-san-luis.jpg', precio: '1.00'}
  ]
};
  
  // Obtener la categoría seleccionada o mostrar todos los productos
  const selectedCategory = localStorage.getItem('selectedCategory');
  
  // Mostrar título de la categoría o "Todos los productos"
  const categoryTitle = document.getElementById('category-title');
  const categorySelect = document.getElementById('category-select');
  
  if (selectedCategory) {
    categoryTitle.innerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    displayProducts(products[selectedCategory]);  // Mostrar productos de la categoría seleccionada
  } else {
    categoryTitle.innerText = 'Todos los Productos';
    displayAllProducts();  // Mostrar todos los productos
  }
  
  // Función para mostrar los productos de una categoría
  function displayProducts(productList) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';  // Limpiar los productos existentes
  
    productList.forEach(product => {
      const flexContainer = document.createElement('div');  // Nuevo contenedor para `d-flex`
      const productCard = document.createElement('div');

      flexContainer.classList.add('d-flex');
      productCard.classList.add('col-4', 'p-1', 'p-md-2');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <div class="card text-bg-warning h-100">
          <img src="${product.image}" class="card-img-top h-100" alt="${product.name}">
          <div class="card-body px-1 text-center pb-0 mb-0">
            <span class="card-title d-block mb-0">${product.name}</span>
            <small class="mb-0">Precio: <span class="fw-bold">S/${product.precio}</small></p>
          </div>
        </div>
      `;
      productContainer.appendChild(productCard);
    });
  }
  
  // Función para mostrar todos los productos de todas las categorías
  function displayAllProducts() {
    const allProducts = Object.values(products).flat();  // Aplanar el objeto de productos para obtener todos
    displayProducts(allProducts);
  }
  
  // Filtro de productos
  document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const productName = card.querySelector('.card-title').textContent.toLowerCase();
      if (productName.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
  // Mostrar todos los productos al hacer clic en el botón
  document.getElementById('btnAllProducts').addEventListener('click', () => {
    localStorage.removeItem('selectedCategory');  // Eliminar la categoría seleccionada
    displayAllProducts();  // Mostrar todos los productos
    categoryTitle.innerText = 'Todos los Productos';  // Cambiar el título
      // Resetear el valor del dropdown al valor inicial (sin selección)
    categorySelect.value = '';  // Resetea el dropdown a su estado inicial
  });
  
  // Cambiar productos según la categoría seleccionada en el dropdown
  categorySelect.addEventListener('change', function() {
    const category = this.value;
    if (category) {
      displayProducts(products[category]);
      categoryTitle.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
    } else {
      displayAllProducts();  // Si no se selecciona una categoría, mostrar todos los productos
      categoryTitle.innerText = 'Todos los Productos';
    }
  });

const input = document.getElementById('search-input');
const clearIcon = document.getElementById('clear-icon');

// Función para mostrar los productos de acuerdo con la categoría seleccionada
function displayProductsBasedOnCategory() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  
  if (selectedCategory) {
    // Mostrar productos de la categoría seleccionada
    displayProducts(products[selectedCategory]);
    categoryTitle.innerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
  } else {
    // Mostrar todos los productos si no hay categoría seleccionada
    displayAllProducts();
    categoryTitle.innerText = 'Todos los Productos';
  }
}

// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.getElementById('category-select');
  const selectedCategory = localStorage.getItem('selectedCategory');

  // Si hay una categoría seleccionada, actualizar el dropdown
  if (selectedCategory) {
    categorySelect.value = selectedCategory;
    categoryTitle.innerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    displayProducts(products[selectedCategory]);  // Mostrar los productos de la categoría seleccionada
  } else {
    categoryTitle.innerText = 'Todos los Productos';
    displayAllProducts();  // Mostrar todos los productos si no hay categoría seleccionada
  }
});