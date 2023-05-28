// Filas
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
// Se pasa de NodeList a Array
let coloresSecretosHTMLElementsArray = Array.from(coloresSecretosHTMLElements);
// Cambia el color de los elementos de la combinación secreta
coloresSecretosHTMLElementsArray.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = combinacionSecreta[index];
});

// Esto son cada uno de los elementos HTML de los colores seleccionados
const coloresSeleccionados = document.querySelectorAll(".color-seleccionado");
// Cambia el color de los botones
coloresSeleccionados.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = colores[index];
});

// BOTON BORRAR
// Funcion del boton borrar
const botones = document.querySelectorAll('.color-seleccionado');
let elementosFilaActual = document.querySelectorAll(`.fila-${filaActual}`);
const elementosPintados = new Set();
let indiceElementoActual = 0;

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const colorSeleccionado = boton.style.backgroundColor;

    if (elementosPintados.has(elementosFilaActual[indiceElementoActual])) {
      return;
    }

    elementosFilaActual[indiceElementoActual].style.backgroundColor = colorSeleccionado;
    elementosPintados.add(elementosFilaActual[indiceElementoActual]);

    indiceElementoActual++;

    if (indiceElementoActual === elementosFilaActual.length) {
      console.log(`Se han pintado todos los elementos de fila-${filaActual}`);
    }
  });
});

const botonBorrar = document.querySelector('.borrar');

botonBorrar.addEventListener('click', () => {
  if (elementosPintados.size > 0) {
    const ultimoElementoPintado = elementosFilaActual[indiceElementoActual - 1];
    ultimoElementoPintado.style.backgroundColor = '';

    elementosPintados.delete(ultimoElementoPintado);
    indiceElementoActual--;
  }
});

// BOTON ACEPTAR (CHECK)
// Al pulsar el boton aceptar comprueba si la combinacion proporcionada es igual a la combinacion
// secreta aleatoria, si es asi redirige a la pagina de 'winner' y de no ser asi bloquea la fila y
// pasa a la siguiente fila, si se acaban las filas sin haber acertado la combinacion redirige a la
// pagina 'loser'
document.querySelector('#aceptar1').addEventListener('click', () => {
  if (indiceElementoActual === elementosFilaActual.length) {
    compararCombinacion();
    bloquearFilaActual();
    pasarSiguienteFila();
  } else {
    console.log('Completa la fila antes de validar.');
  }
});

// Desactiva la fila que se acaba de completar para que no pueda ser modificada ni borrada
function bloquearFilaActual() {
  const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFila.forEach(elemento => {
    elemento.style.pointerEvents = 'none';
  });
}

function pasarSiguienteFila() {
  filaActual++;
  if (filaActual > maxFilas) {
    console.log('Has alcanzado el máximo de filas disponibles.');
    // Redirige a la pagina 'loser'
    window.location.href = 'loser.html';
    return;
  }

  // Habilita los elementos de la siguiente fila
  elementosFilaActual = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFilaActual.forEach(elemento => {
    elemento.style.pointerEvents = 'auto'; 
  });

  // Restablece el índice a cero para empezar la linea desde el principio
  indiceElementoActual = 0; 
}

// Compara la jugada con la combinacion secreta aleatoria
function compararCombinacion() {
  const fila = document.querySelectorAll(`.fila-${filaActual}`);
  const coloresFila = Array.from(fila).map(elemento => elemento.style.backgroundColor);

  const coloresSecretos = coloresSecretosHTMLElementsArray.map(elemento => elemento.style.backgroundColor);

  let coincidenColoresPosicion = 0;
  let coincidenColores = 0;

  for (let i = 0; i < coloresFila.length; i++) {
    if (coloresFila[i] === coloresSecretos[i]) {
      coincidenColoresPosicion++;
      // Pinta el elemento dots-fila en negro
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'black'; 
    } else if (coloresSecretos.includes(coloresFila[i])) {
      coincidenColores++;
      // Pinta los elementos dots-fila en blanco
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'white';
    }
  }

  console.log(`Coinciden ${coincidenColoresPosicion} colores en posición y ${coincidenColores} colores solo en color.`);

  if (coincidenColoresPosicion === coloresFila.length) {
    console.log('¡La combinación es correcta !');
    // Redirigir a la pagina de 'winner'
    window.location.href = 'winner.html';
  } else {
    console.log('La combinación no es correcta.');
  }
}

