const colorPicker = document.getElementById("color-picker");
const colorPreview = document.getElementById("muestraColor");
const selectButton = document.getElementById("select-button");
const selectedColorsContainer = document.getElementById("selected-colors-container");
const deleteButton = document.getElementById("delete-button");
const selectedColors = [];

colorPicker.addEventListener("change", changeColor);
selectButton.addEventListener("click", handleSelect);
deleteButton.addEventListener("click", handleDelete);

// CAMBIA SEGUN EL COLOR SELECCIONADO
function changeColor() {
  const selectedColor = colorPicker.value;
  colorPreview.style.backgroundColor = selectedColor;

  const difficulty = sessionStorage.getItem("difficulty");

  // COMPRUEBA QUE EL COLOR NO SE REPITA EN EL ARRAY Y EL MAXIMO DE COLORES QUE SE PUEDEN SELECCIONAR SEGUN LA DIFICULTAD

  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < getMaximumColors(difficulty)) {
    selectButton.disabled = false;
  } else {
    selectButton.disabled = true;
  }
}
// NUMERO DE COLORES QUE SE PUEDEN SELECCIONAR SEGUN LA DIFICULTAD
function getMaximumColors(difficulty) {
  switch (difficulty) {
    case "facil":
      return 4;
    case "intermedio":
      return 5;
    case "dificil":
      return 6;
    default:
      return 4;
  }
}

// BUSCA EL COLOR EN EL ARRAY DONDE SE GUARDA Y COMPRUEBA QUE NO SE REPITA EL COLOR ANTES DE AÑADIRLO
function isSelected(color) {
  return selectedColors.includes(color);
}

function handleSelect() {
  const selectedColor = colorPicker.value;
  const difficulty = sessionStorage.getItem("difficulty");

  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < getMaximumColors(difficulty)) {
    selectedColors.push(selectedColor);
    colorPicker.value = "";
    displaySelectedColors();
    if (selectedColors.length === getMaximumColors(difficulty)) {
      selectButton.disabled = true;
      sessionStorage.setItem("colores123456", JSON.stringify(selectedColors));
      window.location.href = "../pages/juegoIntermedio.html";
    }
  }
}

// MUESTRA LOS COLORES ELEGIDOS
function handleDelete() {
  if (selectedColors.length > 0) {
    selectedColors.pop();
    displaySelectedColors();
    selectButton.disabled = false;
  }
}
function displaySelectedColors() {
  selectedColorsContainer.innerHTML = "";

  for (let i = 0; i < selectedColors.length; i++) {
    const colorElement = document.createElement("div");
    colorElement.style.backgroundColor = selectedColors[i];
    colorElement.className = "selected-color";
    selectedColorsContainer.appendChild(colorElement);
  }
}

// MOSTRAR LOS COLORES SELECCIONADOS AL CARGAR LA PAGINA
window.addEventListener("load", () => {
  const storedColors = JSON.parse(sessionStorage.getItem("selectedColors"));

  if (storedColors && storedColors.length > 0) {
    selectedColors.push(...storedColors);
    displaySelectedColors();
  }
});
