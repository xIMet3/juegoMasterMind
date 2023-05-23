document.addEventListener('DOMContentLoaded', function() {
  let colores = JSON.parse(sessionStorage.getItem('colores123456'));
  let combinacionSecreta = document.querySelector('.combsecreta');
  let colorUno = combinacionSecreta.querySelector('.color-a1');
  let colorDos = combinacionSecreta.querySelector('.color-a2');
  let colorTres = combinacionSecreta.querySelector('.color-a3');
  let colorCuatro = combinacionSecreta.querySelector('.color-a4');

  let elementosColor = [colorUno, colorDos, colorTres, colorCuatro];

  for (let i = 0; i < elementosColor.length; i++) {
    elementosColor[i].style.backgroundColor = colores[i].color;
  }
});
