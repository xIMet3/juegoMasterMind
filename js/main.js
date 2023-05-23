document.addEventListener('DOMContentLoaded', function() {
  let colores = JSON.parse(sessionStorage.getItem('colores123456'));
  let combinacionSecreta = document.querySelector('.combsecreta');
  let colorUno = combinacionSecreta.querySelector('.color-uno');
  let colorDos = combinacionSecreta.querySelector('.color-dos');
  let colorTres = combinacionSecreta.querySelector('.color-tres');
  let colorCuatro = combinacionSecreta.querySelector('.color-cuatro');

  let elementosColor = [colorUno, colorDos, colorTres, colorCuatro];

  for (let i = 0; i < elementosColor.length; i++) {
    let indiceColorAleatorio = generarNumeroAleatorio(0, colores.length);
    elementosColor[i].style.background = colores[indiceColorAleatorio].color;
  }

  function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
});
