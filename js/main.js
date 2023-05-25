// Recibimos el array de colores del sessionStorage, esto debería devolver solo un array con los colores
let colores = JSON.parse(sessionStorage.getItem('colores123456'));
// Aquí creas la combinacion secreta.
let combinacionSecreta = [];
for(let i = 0; i < colores.length; i++) {
  let randomIndex = Math.floor( Math.random() * colores.length);
  combinacionSecreta.push(colores[randomIndex]);
}

// Esto son todos los elementos 'span' de '.combsecreta'
let coloresSecretosHTMLElements = document.querySelectorAll('.combsecreta .color-secreto');
// Lo pasamos de NodeList a Array
let coloresSecretosHTMLElementsArray = Array.from(coloresSecretosHTMLElements);
// Cambia el color de los elementos de la combinación secreta
coloresSecretosHTMLElementsArray.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = combinacionSecreta[index];
});

// Esto son cada uno de los elementos HTML de los colores seleccionados
const coloresSeleccionados = document.querySelectorAll(".color-seleccionado");
// Cambia el color de los elementos de los botones
coloresSeleccionados.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = colores[index];
});


