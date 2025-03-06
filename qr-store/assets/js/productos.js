// Definir los productos de todas las categorías
const products = {
  Gaseosas: [
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
  Cervezas: [
    { name: 'Cerveza Cristal', image: 'assets/img/c-cristal.webp', precio: '6.50' },
    { name: 'Cusqueña Negra', image: 'assets/img/c-negra.jpg', precio: '7.00' },
    { name: 'Cusqueña Trigo', image: 'assets/img/c-trigo.jpg', precio: '7.00' }
  ],
  Aguas: [
    { name: 'Agua Cielo 500ml', image: 'assets/img/a-cielo.jpg', precio: '1.00' },
    { name: 'Agua Benedictino 1L', image: 'assets/img/a-benedictino.png', precio: '1.00' },
    { name: 'Agua San Carlos 500ml', image: 'assets/img/a-san-luis.jpg', precio: '1.00' },
    { name: 'Agua Benedictino 3L', image: 'assets/img/a-benedictino-3l.jpg', precio: '5.00' },
  ],
  Yogures: [
    { name: 'Yogurt Gloria Fresa 1L', image: 'assets/img/y-gloria-fresa-1l.jpg', precio: '5.00' },
    { name: 'Yogurt Gloria Vainilla 1L', image: 'assets/img/y-gloria-vainilla-1l.jpg', precio: '5.00' },
    { name: 'Yogurt Gloria Durazno 1L', image: 'assets/img/y-gloria-durazno-1l.jpg', precio: '5.00' },
    { name: 'Yogurt Gloria Fresa 200ml', image: 'assets/img/y-gloria-fresa-200ml.jpg', precio: '2.50' },
    { name: 'Yogurt Gloria Durazno 200ml', image: 'assets/img/y-gloria-durazno-200ml.jpg', precio: '2.50' },
    { name: 'Yogurt Gloria Lucuma 200ml', image: 'assets/img/y-gloria-lucuma-200ml.jpg', precio: '2.50' },
  ],
  Bebidas: [
    { name: 'Pulp 350ml', image: 'assets/img/b-pulp-350ml.jpg', precio: '1.00' },
    { name: 'Pulp 1L', image: 'assets/img/b-pulp-1l.jpg', precio: '1.00' },
    { name: 'Volt 350ml', image: 'assets/img/b-volt-350ml.jpg', precio: '2.50' },
    { name: 'Cifrut Naranja 350ml', image: 'assets/img/b-cifrut-naranja-350ml.jpg', precio: '1.00' },
    { name: 'Cifrut Granadilla 350ml', image: 'assets/img/b-cifrut-granadilla-350ml.jpg', precio: '1.00' },
    { name: 'Sporade 500ml', image: 'assets/img/b-sporade-500ml.jpg', precio: '2.50' },
    { name: 'Powerade Multifrutas 600ml', image: 'assets/img/b-powerade-multifrutas-600ml.jpg', precio: '2.50',  estado: 0 },
    { name: 'Powerade Maracuyá 600ml', image: 'assets/img/b-powerade-maracuya-600ml.jpg', precio: '2.50' },
    { name: 'Frugos del valle 500ml', image: 'assets/img/b-del-valle-500ml.jpg', precio: '2.00' },
    { name: 'Frugos del valle 1.5L', image: 'assets/img/b-del-valle-1.5l.jpg', precio: '4.50' },
    { name: 'Frugos del valle 3L', image: 'assets/img/b-del-valle-3l.jpg', precio: '7.50' },
  ],
  Leches: [
    { name: 'Leche Gloria', image: 'assets/img/l-gloria.jpg', precio: '5.00' },
    { name: 'Leche Ideal', image: 'assets/img/l-ideal.png', precio: '3.00' },
    { name: 'Leche Gloria 200ml', image: 'assets/img/l-gloria-xs.jpg', precio: '2.50' }
  ],
  Detergentes: [
    { name: 'Ace', image: 'assets/img/d-ace.jpg', precio: '5.00' },
    { name: 'Opal', image: 'assets/img/d-opal.jpg', precio: '3.00' },
    { name: 'Trome', image: 'assets/img/d-trome.jpg', precio: '1.50' },
    { name: 'Patito', image: 'assets/img/d-patito.jpg', precio: '1.50' }
  ],  
  Despensa: [
    { name: 'Aceite Primor 900ml', image: 'assets/img/dp-aceite-primor-900ml.jpg', precio: '8.00' },
    { name: 'Aceite Primor 200ml', image: 'assets/img/dp-aceite-primor-200ml.jpg', precio: '2.50' },
    { name: 'Cocoa Winters', image: 'assets/img/dp-cocoa-winters.jpg', precio: '1.0' },
    { name: 'Manty', image: 'assets/img/dp-manty.jpg', precio: '2.50' },
    { name: 'Altomayo', image: 'assets/img/dp-altomayo.jpg', precio: '2.50' },
    { name: 'Sal Marina', image: 'assets/img/dp-sal-marina.jpg', precio: '1.50' },
    { name: 'Ajinomen', image: 'assets/img/dp-ajinomen.jpg', precio: '1.50' },
    { name: 'Azucar Rubia 1Kg', image: 'assets/img/dp-azucar-rubia.jpg', precio: '3.50' },
    { name: 'Arroz  D\'Leite 1Kg', image: 'assets/img/dp-arroz-d-leite.jpg', precio: '3.50' },
  ],
  Higiene: [
    { name: 'Papel Higiénico Noble', image: 'assets/img/h-noble.jpg', precio: '1.50' },
    { name: 'Papel Higiénico Suave', image: 'assets/img/h-suave.jpg', precio: '1.50' },
    { name: 'Pasta Dental Kolynos', image: 'assets/img/h-kolynos.jpg', precio: '2.50' },
    { name: 'Pasta Dental Dento', image: 'assets/img/h-dento.jpg', precio: '2.50' },
    { name: 'Champú head & Shoulders', image: 'assets/img/h-champu-hs.webp', precio: '2.50' },
  ]
};

// Obtener elementos del DOM
const categoryTitle = document.getElementById('category-title');
const categorySelect = document.getElementById('category-select');
const productContainer = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const clearIcon = document.getElementById('clear-icon');
const btnNormal = document.getElementById('viewNormal');
const btnCompresed = document.getElementById('viewCompressed');
let searchQuery = '';

// Variable para mantener el estado de la vista
let isCompressedView = false;

// Función para generar las tarjetas en vista normal
function generateNormalCard(product) {
  productContainer.classList.remove('row-cols-1');
  productContainer.classList.add('row-cols-3');
  // const vis = product.estado == 0 ? 'product-status' : '';
  // <div class="${vis}"></div>
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
  // const vis = product.estado == 0 ? 'product-status1' : '';
  // <div class="${vis} row"></div>
  return `
    <div class="card text-bg-warning w-100 px-2">
     <div  class="row">
     
      <div  class="col-2 ps-1 d-flex justify-content-center align-items-center">
        <img src="${product.image}" class="img-comp w-100" loading="lazy" alt="${product.name}">
      </div>
      <div class="card-body py-0 d-flex align-items-center col-10">
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
  const allProducts = selectedCategory ? products[selectedCategory] : Object.values(products).flat();
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );  // Filtrar productos por búsqueda
  displayProducts(filteredProducts, false);  // Mostrar en vista normal
  btnNormal.classList.remove('btn-secondary');
  btnNormal.classList.add('btn-primary');
  btnCompresed.classList.remove('btn-primary');
  btnCompresed.classList.add('btn-secondary');
});

btnCompresed.addEventListener('click', () => {
  isCompressedView = true;  // Cambiar a vista comprimida
  const selectedCategory = localStorage.getItem('selectedCategory');
  const allProducts = selectedCategory ? products[selectedCategory] : Object.values(products).flat();
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );  // Filtrar productos por búsqueda
  displayProducts(filteredProducts, true);  // Mostrar en vista comprimida
  btnCompresed.classList.remove('btn-secondary');
  btnCompresed.classList.add('btn-primary');
  btnNormal.classList.remove('btn-primary');
  btnNormal.classList.add('btn-secondary');
});

// // Cambiar la vista cuando se presionen los botones
// btnNormal.addEventListener('click', () => {
//   isCompressedView = false;  // Cambiar a vista normal
//   const selectedCategory = localStorage.getItem('selectedCategory');
//   const allProducts = selectedCategory ? products[selectedCategory] : Object.values(products).flat();
//   displayProducts(allProducts, false);  // Mostrar en vista normal
//   // searchInput.value = '';  // Limpiar el valor del input de búsqueda
//   btnNormal.classList.remove('btn-secondary');
//   btnNormal.classList.add('btn-primary');
//   btnCompresed.classList.remove('btn-primary');
//   btnCompresed.classList.add('btn-secondary');
// });

// btnCompresed.addEventListener('click', () => {
//   isCompressedView = true;  // Cambiar a vista comprimida
//   const selectedCategory = localStorage.getItem('selectedCategory');
//   const allProducts = selectedCategory ? products[selectedCategory] : Object.values(products).flat();
//   displayProducts(allProducts, true);  // Mostrar en vista comprimida
//   // searchInput.value = '';  // Limpiar el valor del input de búsqueda
//   btnCompresed.classList.remove('btn-secondary');
//   btnCompresed.classList.add('btn-primary');
//   btnNormal.classList.remove('btn-primary');
//   btnNormal.classList.add('btn-secondary');
// });

// Función para mostrar productos basados en la categoría seleccionada
function displayCategoryProducts() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  if (selectedCategory) {
    // categoryTitle.innerText = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    categoryTitle.innerText = selectedCategory;
    categorySelect.value = selectedCategory; // Establecer el valor del dropdown
    const categoryProducts = products[selectedCategory];
    displayProducts(categoryProducts, isCompressedView);  // Mostrar productos según la vista seleccionada
  } else {
    categoryTitle.innerText = 'Todos los Productos';
    displayAllProducts();
  }
}

// Función para mostrar todos los productos
function displayAllProducts() {
  const allProducts = Object.values(products).flat();
  displayProducts(allProducts, isCompressedView);  // Mantener la vista seleccionada
}

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
  searchInput.value = '';
  categoryTitle.innerText = 'Todos los Productos';
});

// Función para manejar el filtro de búsqueda
// searchInput.addEventListener('input', function() {
//   const query = this.value.toLowerCase();
//   document.querySelectorAll('.product-card').forEach(card => {
//     const productName = card.querySelector('.card-title').textContent.toLowerCase();
//     card.style.display = productName.includes(query) ? 'flex' : 'none';
//   });
// });

searchInput.addEventListener('input', function() {
  searchQuery = this.value.toLowerCase();  // Guardar la consulta de búsqueda
  filterAndDisplayProducts();  // Aplicar el filtro después de cada búsqueda
});

function filterAndDisplayProducts() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  const allProducts = selectedCategory ? products[selectedCategory] : Object.values(products).flat();
  // Filtrar productos por nombre, según el valor de búsqueda
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery)
  );
  // Mostrar los productos filtrados en la vista seleccionada
  displayProducts(filteredProducts, isCompressedView);
}



// Detectamos cuando se presiona "Enter" o el botón "Ir"
searchInput.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    // Si el usuario presiona "Enter", se cierra el teclado
    this.blur(); // Cierra el teclado
  }
});

// Función para limpiar la búsqueda al hacer clic en el ícono
clearIcon.addEventListener('click', () => {
  searchInput.value = '';  // Limpiar el valor del input de búsqueda
  displayCategoryProducts();  // Volver a mostrar los productos de la categoría seleccionada o todos los productos
});
