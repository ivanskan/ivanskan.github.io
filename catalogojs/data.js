const categories = [
  { id: 1, name: "Gaseosas", image: 'assets/img/soda-group.jpg' },
  { id: 2, name: "Cervezas", image: 'assets/img/cerveza-group.webp' },
  { id: 3, name: "Aguas", image: 'assets/img/water-group.jpg' },
  { id: 4, name: "Yogures", image: 'assets/img/yogurt-category.jpg' },
  { id: 5, name: "Bebidas", image: 'assets/img/bebidas-category.avif' },
  { id: 6, name: "Leches", image: 'assets/img/despensa.jpeg' },
  { id: 7, name: "Detergentes", image: 'assets/img/leche-category.jpg' },
  { id: 8, name: "Despensa", image: 'assets/img/detergente-category.jpg' },
  { id: 9, name: "Higiene", image: 'assets/img/higiene-category.jpg' }
];

const products = [
    { name: 'Coca Cola 1L', image: 'assets/img/coca-cola-1l.jpg', precio: '4.00', category: 1 },
    { name: 'Coca Cola 2L', image: 'assets/img/g-coca-2l.jpg', precio: '7.00', category: 1 },
    { name: 'Coca Cola 3L', image: 'assets/img/coca-cola-3l.jpg', precio: '12.00', category: 1 },
    { name: 'Inca Kola 625ml', image: 'assets/img/g-inca-gordita.jpg', precio: '3.00', category: 1 },
    { name: 'Inca Kola 1L', image: 'assets/img/g-inca-1l.jpg', precio: '4.00', category: 1 },
    { name: 'Inca Kola 2L', image: 'assets/img/g-inca-2l.png', precio: '12.00', category: 1 },
    { name: 'Inca Kola 3L', image: 'assets/img/g-inca-3l.jpg', precio: '12.00', category: 1 },
    { name: 'Guaraná 3L', image: 'assets/img/g-guarana-3l.jpg', precio: '10.00', category: 1 },
    { name: 'Guaraná 350ml', image: 'assets/img/g-guarana-350ml.jpg', precio: '1.00', category: 1 },
    { name: 'Big Cola 400ml', image: 'assets/img/g-big-400ml.jpg', precio: '1.00', category: 1 },
    { name: 'Big Cola 3L', image: 'assets/img/g-big-3l.jpg', precio: '8.00', category: 1 },
    { name: 'Pepsi 3L', image: 'assets/img/g-pepsi-3l.jpg', precio: '10.00', category: 1 },
    { name: 'Kr Piña 3L', image: 'assets/img/g-kr-piña-3l.jpg', precio: '10.00', category: 1 },
    { name: 'Kr Piña 400ml', image: 'assets/img/g-kr-piña-400ml.jpg', precio: '1.00', category: 1 },
    { name: 'Kr Limón 400ml', image: 'assets/img/g-kr-limon-400ml.jpg', precio: '1.00', category: 1 },
  
    { name: 'Cerveza Cristal', image: 'assets/img/c-cristal.webp', precio: '6.50', category: 2 },
    { name: 'Cusqueña Negra', image: 'assets/img/c-negra.jpg', precio: '7.00', category: 2 },
    { name: 'Cusqueña Trigo', image: 'assets/img/c-trigo.jpg', precio: '7.00', category: 2 },

    { name: 'Agua Cielo 500ml', image: 'assets/img/a-cielo.jpg', precio: '1.00', category: 3},
    { name: 'Agua Benedictino 1L', image: 'assets/img/a-benedictino.png', precio: '1.00', category: 3 },
    { name: 'Agua San Carlos 500ml', image: 'assets/img/a-san-luis.jpg', precio: '1.00', category: 3 },
    { name: 'Agua Benedictino 3L', image: 'assets/img/a-benedictino-3l.jpg', precio: '5.00', category: 3 },

    { name: 'Yogurt Gloria Fresa 1L', image: 'assets/img/y-gloria-fresa-1l.jpg', precio: '5.00', category: 4 },
    { name: 'Yogurt Gloria Vainilla 1L', image: 'assets/img/y-gloria-vainilla-1l.jpg', precio: '5.00', category: 4 },
    { name: 'Yogurt Gloria Durazno 1L', image: 'assets/img/y-gloria-durazno-1l.jpg', precio: '5.00', category: 4 },
    { name: 'Yogurt Gloria Fresa 200ml', image: 'assets/img/y-gloria-fresa-200ml.jpg', precio: '2.50', category: 4 },
    { name: 'Yogurt Gloria Durazno 200ml', image: 'assets/img/y-gloria-durazno-200ml.jpg', precio: '2.50', category: 4 },
    { name: 'Yogurt Gloria Lucuma 200ml', image: 'assets/img/y-gloria-lucuma-200ml.jpg', precio: '2.50', category: 4 },

    { name: 'Pulp 350ml', image: 'assets/img/b-pulp-350ml.jpg', precio: '1.00', category: 5 },
    { name: 'Pulp 1L', image: 'assets/img/b-pulp-1l.jpg', precio: '1.00', category: 5 },
    { name: 'Volt 350ml', image: 'assets/img/b-volt-350ml.jpg', precio: '2.50', category: 5 },
    { name: 'Cifrut Naranja 350ml', image: 'assets/img/b-cifrut-naranja-350ml.jpg', precio: '1.00', category: 5 },
    { name: 'Cifrut Granadilla 350ml', image: 'assets/img/b-cifrut-granadilla-350ml.jpg', precio: '1.00', category: 5 },
    { name: 'Sporade 500ml', image: 'assets/img/b-sporade-500ml.jpg', precio: '2.50', category: 5 },
    { name: 'Powerade Multifrutas 600ml', image: 'assets/img/b-powerade-multifrutas-600ml.jpg', precio: '2.50', category: 5,  estado: 0 },
    { name: 'Powerade Maracuyá 600ml', image: 'assets/img/b-powerade-maracuya-600ml.jpg', precio: '2.50', category: 5 },
    { name: 'Frugos del valle 500ml', image: 'assets/img/b-del-valle-500ml.jpg', precio: '2.00', category: 5 },
    { name: 'Frugos del valle 1.5L', image: 'assets/img/b-del-valle-1.5l.jpg', precio: '4.50', category: 5 },
    { name: 'Frugos del valle 3L', image: 'assets/img/b-del-valle-3l.jpg', precio: '7.50', category: 5 },

    { name: 'Leche Gloria', image: 'assets/img/l-gloria.jpg', precio: '5.00', category: 6 },
    { name: 'Leche Ideal', image: 'assets/img/l-ideal.png', precio: '3.00', category: 6 },
    { name: 'Leche Gloria 200ml', image: 'assets/img/l-gloria-xs.jpg', precio: '2.50', category: 6 },
 
    { name: 'Ace', image: 'assets/img/d-ace.jpg', precio: '5.00', category: 7 },
    { name: 'Opal', image: 'assets/img/d-opal.jpg', precio: '3.00', category: 7 },
    { name: 'Trome', image: 'assets/img/d-trome.jpg', precio: '1.50', category: 7 },
    { name: 'Patito', image: 'assets/img/d-patito.jpg', precio: '1.50', category: 7 },

    { name: 'Aceite Primor 900ml', image: 'assets/img/dp-aceite-primor-900ml.jpg', precio: '8.00', category: 8 },
    { name: 'Aceite Primor 200ml', image: 'assets/img/dp-aceite-primor-200ml.jpg', precio: '2.50', category: 8 },
    { name: 'Cocoa Winters', image: 'assets/img/dp-cocoa-winters.jpg', precio: '1.0', category: 8 },
    { name: 'Manty', image: 'assets/img/dp-manty.jpg', precio: '2.50', category: 8 },
    { name: 'Altomayo', image: 'assets/img/dp-altomayo.jpg', precio: '2.50', category: 8 },
    { name: 'Sal Marina', image: 'assets/img/dp-sal-marina.jpg', precio: '1.50', category: 8 },
    { name: 'Ajinomen', image: 'assets/img/dp-ajinomen.jpg', precio: '1.50', category: 8 },
    { name: 'Azucar Rubia 1Kg', image: 'assets/img/dp-azucar-rubia.jpg', precio: '3.50', category: 8 },
    { name: 'Arroz  D\'Leite 1Kg', image: 'assets/img/dp-arroz-d-leite.jpg', precio: '3.50', category: 8 },

    { name: 'Papel Higiénico Noble', image: 'assets/img/h-noble.jpg', precio: '1.50', category: 9 },
    { name: 'Papel Higiénico Suave', image: 'assets/img/h-suave.jpg', precio: '1.50', category: 9 },
    { name: 'Pasta Dental Kolynos', image: 'assets/img/h-kolynos.jpg', precio: '2.50', category: 9 },
    { name: 'Pasta Dental Dento', image: 'assets/img/h-dento.jpg', precio: '2.50', category: 9 },
    { name: 'Champú head & Shoulders', image: 'assets/img/h-champu-hs.webp', precio: '2.50', category: 9 },
  ];