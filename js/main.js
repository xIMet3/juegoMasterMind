// FILAS
let filaActual = 1;
const maxFilas = 10;

// COMBINACION SECRETA ALEATORIA
// RECOGE EL ARRAY DE COLORES DEL SESSION STORAGE
let colores = JSON.parse(sessionStorage.getItem('colores123456'));
// CREA LA COMBINACION ALEATORIA
let combinacionSecreta = [];
for (let i = 0; i < colores.length; i++) {
  let randomIndex = Math.floor(Math.random() * colores.length);
  combinacionSecreta.push(colores[randomIndex]);
}

// BOTONES CON LOS COLORES
// ESTOS SON TODOS LOS ELEMENTOS SPAN DE LA .combsecreta
let coloresSecretosHTMLElements = document.querySelectorAll('.combsecreta .color-secreto');
// SE PASA DE NODELIS A ARRAY
let coloresSecretosHTMLElementsArray = Array.from(coloresSecretosHTMLElements);
// CAMBIA EL COLOR DE LOS ELEMENTOS DE LA COMBINACION ALEATORIA POR COLORES ALEATORIOS DE LOS ELEGIDOS
coloresSecretosHTMLElementsArray.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = combinacionSecreta[index];
});

// ESTO SON CADA UNO DE LOS ELEMENTOS DEL COLOR SELECCIONADO
const coloresSeleccionados = document.querySelectorAll(".color-seleccionado");
// CAMBIA EL COLOR DE LOS BOTONES
coloresSeleccionados.forEach((spanColor, index) => {
  spanColor.style.backgroundColor = colores[index];
});

// BOTON BORRAR
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
// AL PULSAR EL BOTON ACEPTAR COMPRUEBA SI LA COMBIACION PROPORCIONADA ES IGUAL A LA COMBINACION
// SECRETA ALEATORIA, SI ES ASI REDIRIGE A LA PAGINA DE 'WINNER' Y DE NO SER ASI BLOQUEA LA FILA Y
// PASA A LA SIGUIENTE FILA, SI SE ACABAN LAS FILAS SIN ACERTAR LA COMBINACION REDIRIGE A LA PAGINA 'LOSER'
document.querySelector('#aceptar1').addEventListener('click', () => {
  if (indiceElementoActual === elementosFilaActual.length) {
    compararCombinacion();
    bloquearFilaActual();
    pasarSiguienteFila();
  } else {
  }
});

// DESACTIVA LA FILA QUE SE ACABA DE COMPLETA PARA QUE NO PUEDA SER MODIFICADA NI BORRADA
function bloquearFilaActual() {
  const elementosFila = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFila.forEach(elemento => {
    elemento.style.pointerEvents = 'none';
  });
}

// PASA A LA SIGUIENTE FILA. LA ULTIMA FILA VISIBLE SERA LA ULTIMA DEL TABLERO
function pasarSiguienteFila() {
  filaActual++;
  const filasOcultas = difficulty === 'dificil' ? 4 : (difficulty === 'intermedio' ? 2 : 0);
  const maxFilasVisible = maxFilas - filasOcultas;
  if (filaActual > maxFilasVisible) {
    // REDIRIGE A LA PAGINA LOSER
    window.location.href = '../pages/loser.html';
    return;
  }
  // HABILITA LOS ELEMENTOS DE LA SIGUIENTE FILA
  elementosFilaActual = document.querySelectorAll(`.fila-${filaActual}`);
  elementosFilaActual.forEach(elemento => {
    elemento.style.pointerEvents = 'auto'; 
  });

  // RESTABLECE EL INDICE A CERO PARA EMPEZAR LA LINEA DESDE EL PRINCIPIO
  indiceElementoActual = 0; 
}

// COMPARA LA JUGADA CON LA COMBINACION SECRETA ALEATORIA
function compararCombinacion() {
  const fila = document.querySelectorAll(`.fila-${filaActual}`);
  const coloresFila = Array.from(fila).map(elemento => elemento.style.backgroundColor);
  const coloresSecretos = coloresSecretosHTMLElementsArray.map(elemento => elemento.style.backgroundColor);

  let coincidenColoresPosicion = 0;
  let coincidenColores = 0;

  for (let i = 0; i < coloresFila.length; i++) {
    if (coloresFila[i] === coloresSecretos[i]) {
      coincidenColoresPosicion++;
      // PINTA LOS ELEMENTOS EN NEGRO
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'black'; 
    } else if (coloresSecretos.includes(coloresFila[i])) {
      coincidenColores++;
      // PINTA LOS ELEMENTOS EN BLANCO
      document.getElementsByClassName(`dots-fila-${filaActual}`)[i].style.backgroundColor = 'white';
    }
  }

  if (coincidenColoresPosicion === coloresFila.length) {
    // REDIRIGE A LA PAGINA 'WINNER'
    window.location.href = 'winner.html';
  } else {
    console.log('La combinacion no es correcta.');
  }
}

// COGE LA DIFICULTAD DEL SESSION STORAGE
const difficulty = sessionStorage.getItem('difficulty');

// Oculta las filas adicionales según la dificultad seleccionada
// OCULTA LAS FILAS ADICIONALES SEGUN LA DIFICULTAD SELECCIONADA
if (difficulty === 'facil') {
  
} else if (difficulty === 'intermedio') {
  
  const filasOcultas = document.querySelectorAll('.fila-9, .fila-10');
  filasOcultas.forEach(fila => fila.style.display = 'none');
  const dotsOcultos = document.querySelectorAll('.dots-fila-9, .dots-fila-10');
  dotsOcultos.forEach(dots => dots.style.display = 'none');
} else if (difficulty === 'dificil') {
  
  const filasOcultas = document.querySelectorAll('.fila-7, .fila-8, .fila-9, .fila-10');
  filasOcultas.forEach(fila => fila.style.display = 'none');
  const dotsOcultos = document.querySelectorAll('.dots-fila-7, .dots-fila-8, .dots-fila-9, .dots-fila-10');
  dotsOcultos.forEach(dots => dots.style.display = 'none');
}
