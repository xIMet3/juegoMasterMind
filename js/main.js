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

const botones = document.querySelectorAll('.color-seleccionado');
const elementosFila1 = document.querySelectorAll('.fila-1');
const elementosPintados = new Set();
let indiceElementoActual = 0;

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const colorSeleccionado = boton.style.backgroundColor;

    // Verificar si el elemento actual ya ha sido pintado
    if (elementosPintados.has(elementosFila1[indiceElementoActual])) {
      return; // Salir de la función si el elemento ya ha sido pintado
    }

    // Pintar el elemento actual con el color seleccionado
    elementosFila1[indiceElementoActual].style.backgroundColor = colorSeleccionado;

    // Agregar el elemento actual al conjunto de elementos pintados
    elementosPintados.add(elementosFila1[indiceElementoActual]);

    // Incrementar el índice del elemento actual
    indiceElementoActual++;

    // Verificar si se ha pintado todos los elementos
    if (indiceElementoActual === elementosFila1.length) {
      // Aquí puedes realizar alguna acción adicional si se han pintado todos los elementos
      console.log('Se han pintado todos los elementos de fila-1');
    }
  });
});



