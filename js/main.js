// COMBINACION SECRETA ALEATORIA
// Recoge el array de colores del sessionStorage.
let colores = JSON.parse(sessionStorage.getItem('colores123456'));
// Crea la combinacion aleatoria.
let combinacionSecreta = [];
for(let i = 0; i < colores.length; i++) {
  let randomIndex = Math.floor( Math.random() * colores.length);
  combinacionSecreta.push(colores[randomIndex]);
}
// BOTONES CON LOS COLORES
// Esto son todos los elementos span de .combsecreta
let coloresSecretosHTMLElements = document.querySelectorAll('.combsecreta .color-secreto');
// Lo pasamos de NodeList a Array
let coloresSecretosHTMLElementsArray = Array.from(coloresSecretosHTMLElements);
// Cambia el color de los elementos de la combinación secreta
coloresSecretosHTMLElementsArray.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = combinacionSecreta[index];
});

// Esto son cada uno de los elementos HTML de los colores seleccionados.
const coloresSeleccionados = document.querySelectorAll(".color-seleccionado");
// Cambia el color de los elementos de los botones
coloresSeleccionados.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = colores[index];
});
// BOTON BORRAR
// Funcion del boton borrar.
const botones = document.querySelectorAll('.color-seleccionado');
const elementosFila1 = document.querySelectorAll('.fila-1');
const elementosPintados = new Set();
let indiceElementoActual = 0;

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const colorSeleccionado = boton.style.backgroundColor;

    if (elementosPintados.has(elementosFila1[indiceElementoActual])) {
      return;
    }

    elementosFila1[indiceElementoActual].style.backgroundColor = colorSeleccionado;
    elementosPintados.add(elementosFila1[indiceElementoActual]);

    indiceElementoActual++;

    if (indiceElementoActual === elementosFila1.length) {
      console.log('Se han pintado todos los elementos de fila-1');
    }
  });
});

const botonBorrar = document.querySelector('.borrar');

botonBorrar.addEventListener('click', () => {
  if (elementosPintados.size > 0) {
    const ultimoElementoPintado = elementosFila1[indiceElementoActual - 1];
    ultimoElementoPintado.style.backgroundColor = '';

    elementosPintados.delete(ultimoElementoPintado);
    indiceElementoActual--;
  }
});




