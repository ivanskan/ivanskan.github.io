// Obtener elementos del DOM
const categoryTitle = document.getElementById('category-title');
const categorySelect = document.getElementById('category-select');
const productContainer = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const clearIcon = document.getElementById('clear-icon');
const btnNormal = document.getElementById('viewNormal');
const btnCompresed = document.getElementById('viewCompressed');
const btnAllProducts = document.getElementById('btnAllProducts');  // Agregar el botón "Ver Todos los Productos"
let searchQuery = '';

// Variable para mantener el estado de la vista
let isCompressedView = false;

// Función para generar las tarjetas en vista normal
function generateNormalCard(product) {
  productContainer.classList.remove('row-cols-1');
  productContainer.classList.add('row-cols-3');
  return `
    <div class="card text-bg-warning h-100">
      <img src="${product.image}" class="card-img-top h-100" loading="lazy" alt="${product.name}">
      <div class="card-body px-1 text-center pb-0 mb-0">
        <span class="card-title d-block mb-0">${product.name}</span>
        <small class="mb-0">Precio: <span class="fw-bold">S/${product.precio}</span></small>
      </div>
    </div>
  `;
}

// Función para generar las tarjetas en vista comprimida
function generateCompressedCard(product) {
  productContainer.classList.remove('row-cols-3');
  productContainer.classList.add('row-cols-1');
  return `
    <div class="card text-bg-warning w-100 px-2">
      <div class="row">
        <div class="col-2 col-md-1 ps-1 d-flex justify-content-center align-items-center">
          <img src="${product.image}" class="img-comp w-100" loading="lazy" alt="${product.name}">
        </div>
        <div class="card-body py-0 d-flex align-items-center col-10 col-md-11">
          <h6 class="card-title w-75 mb-0">${product.name}</h6>
          <p class="card-text w-25 text-end"><small class="fw-bold">S/${product.precio}</small></p>
        </div>
      </div>
    </div>
  `;
}

// Función para mostrar los productos en el contenedor de la vista normal o comprimida
function displayProducts(productList, isCompressed = false) {
  productContainer.innerHTML = '';  // Limpiar los productos existentes
  productList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col', 'p-1', 'p-md-2', 'mt-0', 'product-card');
    productCard.innerHTML = isCompressed
      ? generateCompressedCard(product)  // Vista comprimida
      : generateNormalCard(product);    // Vista normal
    productContainer.appendChild(productCard);
  });
}

// Cambiar la vista cuando se presionen los botones
btnNormal.addEventListener('click', () => {
  isCompressedView = false;  // Cambiar a vista normal
  const selectedCategory = localStorage.getItem('selectedCategory');
  const allProducts = selectedCategory ? products.filter(p => p.category == selectedCategory) : products;
  displayProducts(filterProductsBySearch(allProducts), false);  // Mostrar en vista normal, aplicando el filtro si hay
  btnNormal.classList.remove('btn-secondary');
  btnNormal.classList.add('btn-primary');
  btnCompresed.classList.remove('btn-primary');
  btnCompresed.classList.add('btn-secondary');
});

btnCompresed.addEventListener('click', () => {
  isCompressedView = true;  // Cambiar a vista comprimida
  const selectedCategory = localStorage.getItem('selectedCategory');
  const allProducts = selectedCategory ? products.filter(p => p.category == selectedCategory) : products;
  displayProducts(filterProductsBySearch(allProducts), true);  // Mostrar en vista comprimida, aplicando el filtro si hay
  btnCompresed.classList.remove('btn-secondary');
  btnCompresed.classList.add('btn-primary');
  btnNormal.classList.remove('btn-primary');
  btnNormal.classList.add('btn-secondary');
});

// Función para filtrar los productos según el texto de búsqueda
function filterProductsBySearch(productList) {
  const query = searchInput.value.toLowerCase();
  return productList.filter(product => product.name.toLowerCase().includes(query));
}

// Función para mostrar los productos de la categoría seleccionada
function displayCategoryProducts() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  if (selectedCategory) {
    const categoryProducts = products.filter(p => p.category == selectedCategory);
    categoryTitle.innerText = categories.find(c => c.id == selectedCategory).name;
    categorySelect.value = selectedCategory; // Establecer el valor del dropdown
    displayProducts(filterProductsBySearch(categoryProducts), isCompressedView);  // Mostrar productos según la vista seleccionada y aplicar el filtro
  } else {
    categoryTitle.innerText = 'Todos los Productos';
    displayAllProducts();
  }
}

// Actualizar productos al cambiar la categoría en el dropdown
categorySelect.addEventListener('change', function() {
  const category = this.value;
  localStorage.setItem('selectedCategory', category || '');  // Guardar la categoría seleccionada
  searchInput.value = '';  // Vaciar el input de búsqueda al cambiar de categoría
  displayCategoryProducts();  // Mostrar los productos de la categoría seleccionada
});

// Función para mostrar todos los productos
function displayAllProducts() {
  displayProducts(filterProductsBySearch(products), isCompressedView);  // Mantener la vista seleccionada y aplicar el filtro
}

// Función para limpiar la búsqueda al hacer clic en el ícono
clearIcon.addEventListener('click', () => {
  searchInput.value = '';  // Limpiar el valor del input de búsqueda
  displayCategoryProducts();  // Volver a mostrar los productos de la categoría seleccionada o todos los productos
});

// Llenar el select de categorías dinámicamente
function populateCategorySelect() {
  const categorySelect = document.getElementById('category-select');
  
  // Limpiar las opciones existentes, en caso de que ya haya alguna
  categorySelect.innerHTML = '<option value="">Seleccionar Categoría</option>';

  // Iterar sobre las categorías y agregarlas como opciones
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id; // id de la categoría (por ejemplo, "Gaseosas")
    option.textContent = category.name; // nombre de la categoría (por ejemplo, "Gaseosas")
    categorySelect.appendChild(option);
  });
}

// Cargar las categorías al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  populateCategorySelect(); // Llenar el select de categorías
  displayCategoryProducts(); // Mostrar los productos de la categoría seleccionada o todos
});

// Función para manejar el filtro de búsqueda
searchInput.addEventListener('input', function() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  
  // Filtrar los productos de la categoría seleccionada si hay un texto en el input
  const productsToFilter = selectedCategory ? products.filter(p => p.category == selectedCategory) : products;
  
  const filteredProducts = filterProductsBySearch(productsToFilter); // Filtrar por nombre del producto
  displayProducts(filteredProducts, isCompressedView); // Mostrar los productos filtrados
});

// **Nuevo Código: Funcionalidad para "Ver Todos los Productos"**
btnAllProducts.addEventListener('click', () => {
  localStorage.removeItem('selectedCategory');  // Eliminar la categoría seleccionada
  categorySelect.value = '';  // Resetear el dropdown
  searchInput.value = '';  // Limpiar el valor del input de búsqueda
  displayAllProducts();  // Mostrar todos los productos sin filtro de categoría
  categoryTitle.innerText = 'Todos los Productos'; // Título correcto
});
