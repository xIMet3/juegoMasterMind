// Generar números aleatorios entre 0 y 4 para representar los colores
function getRandomColor() {
  const colors = ['red', 'yellow', 'green', 'blue', 'black', 'orange'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Obtener referencias a los elementos del DOM
const rows = document.querySelectorAll('.grid .dots');
const submitButton = document.querySelector('.submit');
const deleteButton = document.querySelector('.delete');
const codeSpans = document.querySelectorAll('.combsecreta span');
const header = document.querySelector('.header');

let counter = 1;
let counter2 = 1;
let won = false;

class Row {
  constructor() {
    this.turn = false;
    this.spaces = [];
  }
}

// Crear instancias de filas
const rowsArray = [];
for (let i = 0; i < rows.length; i++) {
  rowsArray.push(new Row());
}

// Generar colores aleatorios para la combinación secreta
const code = [];
for (let i = 0; i < 4; i++) {
  code.push(getRandomColor());
}

// Establecer colores de la combinación secreta en el DOM
for (let i = 0; i < codeSpans.length; i++) {
  codeSpans[i].style.backgroundColor = code[i];
}

// Función para comprobar la fila
function checkRow(arr, row, next, prev) {
  // Comprobar si la respuesta es igual al código
  if (arr.join('') === code.join('')) {
    won = true;
    header.textContent = "Has descifrado el código";
    header.style.color = 'green';
    for (let i = 0; i < arr.length; i++) {
      rows[row].querySelector(`.one${i + 1}`).style.backgroundColor = 'black';
    }
  } else {
    const codeCopy = [...code];
    const remaining = [];
    
    // Comprobar los colores correctos en la posición correcta (color negro)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === code[i]) {
        rows[row].querySelector(`.one${counter2}`).style.backgroundColor = 'black';
        codeCopy.splice(i, 1, '');
        remaining.push('empty');
        counter2 += 1;
      } else {
        remaining.push(arr[i]);
      }
    }

    // Comprobar los colores correctos en la posición incorrecta (color blanco)
    for (let i = 0; i < arr.length; i++) {
      if (codeCopy.includes(remaining[i])) {
        codeCopy.splice(codeCopy.indexOf(remaining[i]), 1, 'blank');
        rows[row].querySelector(`.one${counter2}`).style.backgroundColor = 'white';
        counter2 += 1;
      }
    }

    // Restablecer contadores y cambiar de turno
    counter = 1;
    counter2 = 1;
    next.turn = true;
    prev.turn = false;
  }
}

// Evento para añadir colores a la fila actual
function addColor(e) {
  const clickedItem = e.target;
  const rowIndex = parseInt(clickedItem.parentNode.parentNode.className.match(/\d+/)[0]) - 1;
  const currentRow = rowsArray[rowIndex];

  if (currentRow.turn && currentRow.spaces.length < 4) {
    currentRow.spaces.push(clickedItem.className);
    clickedItem.style.backgroundColor = clickedItem.className;
   .
