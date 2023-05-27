// Variables globales
let filaActual = 1;
const maxFilas = 10;

// COMBINACION SECRETA ALEATORIA
// Recoge el array de colores del sessionStorage.
let colores = JSON.parse(sessionStorage.getItem('colores123456'));
// Crea la combinacion aleatoria.
let combinacionSecreta = [];
for (let i = 0; i < colores.length; i++) {
  let randomIndex = Math.floor(Math.random() * colores.length);
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
const elementosPintados = new Set();
let indiceElementoActual = 0;

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const colorSeleccionado = boton.style.backgroundColor;

    const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
    if (elementosPintados.has(elementosFila[indiceElementoActual])) {
      return;
    }

    elementosFila[indiceElementoActual].style.backgroundColor = colorSeleccionado;
    elementosPintados.add(elementosFila[indiceElementoActual]);

    indiceElementoActual++;

    if (indiceElementoActual === elementosFila.length) {
      console.log(`Se han pintado todos los elementos de la fila-${filaActual}`);
    }
  });
});

const botonBorrar = document.querySelector('.borrar');

botonBorrar.addEventListener('click', () => {
  const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
  if (elementosPintados.size > 0 && indiceElementoActual > 0) {
    const ultimoElementoPintado = elementosFila[indiceElementoActual - 1];
    ultimoElementoPintado.style.backgroundColor = '';

    elementosPintados.delete(ultimoElementoPintado);
    indiceElementoActual--;
  }
});

document.querySelector('#aceptar1').addEventListener('click', () => {
  compararCombinacion();
});

function bloquearFilaActual() {
  const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFila.forEach(elemento => {
    elemento.style.pointerEvents = 'none'; // Desactivar la interacción con los elementos de la fila actual
  });
}

function pasarSiguienteFila() {
  filaActual++;
  if (filaActual > maxFilas) {
    console.log('Has alcanzado el máximo de filas disponibles.'); // Mostrar mensaje de que se alcanzó el máximo de filas
    return;
  }

  const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFila.forEach(elemento => {
    elemento.style.pointerEvents = 'auto'; // Habilitar la interacción con los elementos de la siguiente fila
  });
}

function compararCombinacion() {
  const fila = document.querySelectorAll(`.fila-${filaActual}`); // Obtener los elementos de la fila actual
  const coloresFila = Array.from(fila).map(elemento => elemento.style.backgroundColor); // Obtener los colores de la fila actual

  const coloresSecretos = coloresSecretosHTMLElementsArray.map(elemento => elemento.style.backgroundColor); // Obtener los colores de los elementos secretos

  let coincidenColoresPosicion = 0;
  let coincidenColores = 0;

  for (let i = 0; i < coloresFila.length; i++) {
    if (coloresFila[i] === coloresSecretos[i]) {
      coincidenColoresPosicion++;
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'black'; // Pintar el elemento de dots-fila-1 en negro
    } else if (coloresSecretos.includes(coloresFila[i])) {
      coincidenColores++;
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'white'; // Pintar el elemento de dots-fila-1 en blanco
    }
  }

  console.log(`Coinciden ${coincidenColoresPosicion} colores en posición y ${coincidenColores} colores solo en color.`);

  if (coincidenColoresPosicion === coloresFila.length) {
    console.log('¡La combinación es correcta en color y posición!');
    // Redirigir a otra página aquí
  } else {
    console.log('La combinación no es correcta en color y posición.');
    bloquearFilaActual();
    pasarSiguienteFila();
  }
}





