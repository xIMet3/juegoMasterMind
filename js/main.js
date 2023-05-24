// Recibimos el array de colores del sessionStorage, esto debería devolver solo un array con los color
let colores = JSON.parse(sessionStorage.getItem('selectedColors'));
console.log(colores);

// Esto se puede borrar cuando devuelva solo el array de colores
let coloresArray = colores.map((color) => {
  return color.color;
});
// Aquí creas la combinacion secreta.
let combinacionSecreta = [];
for(let i = 0; i < coloresArray.length; i++) {
  let randomIndex = Math.floor( Math.random() * coloresArray.length);
  combinacionSecreta.push(coloresArray[randomIndex]);
}
// Este imprime el array de los colores disponibles
console.log("coloresArray", coloresArray);
// Esto imprime el array de la combinacion secreta
console.log("combinacionSecreta", combinacionSecreta);
// Esto son todos los elemetons 'span' de '.combsecreta'
let coloresSecretosHTMLElements = document.querySelectorAll('.combsecreta .color-secreto');
// Lo pasa desde NodeList a Array
let coloresSecretosHTMLElementsArray = Array.from(coloresSecretosHTMLElements);
// imprime un array con los elementos HTML de los colores secretos
console.log(coloresSecretosHTMLElementsArray);
// Cambia el color de los elementos de la combinacion secreta
coloresSecretosHTMLElementsArray.map((spanColor, contador) => {
  spanColor.style.backgroundColor = coloresArray[contador];
})
// Esto son cada uno de los elementos HTML de los colores seleccionados
const coloresSeleccionados = document.querySelectorAll(".color-seleccionado");
// Lo pasa desde NodeList a Array
const coloresSeleccionadosArray = Array.from(coloresSeleccionados);
// Cambia el color de los elementos de los botones
coloresSeleccionadosArray.map((spanColor, contador) => {
  spanColor.style.backgroundColor = coloresArray[contador];
})