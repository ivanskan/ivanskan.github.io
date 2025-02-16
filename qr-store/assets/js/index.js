document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      localStorage.setItem('selectedCategory', category);
      window.location.href = 'productos.html'; // Navegar a la página de productos
    });
  });
  