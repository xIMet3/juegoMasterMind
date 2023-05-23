const colorPicker = document.getElementById("color-picker");
const colorPreview = document.getElementById("muestraColor");
const selectButton = document.getElementById("select-button");
const selectedColorsContainer = document.getElementById("selected-colors-container");
const deleteButton = document.getElementById("delete-button");

colorPicker.addEventListener("change", changeColor);

function changeColor() {
  const selectedColor = colorPicker.value;
  colorPreview.style.backgroundColor = selectedColor;

  const difficulty = sessionStorage.getItem("difficulty");

  if (selectedColor && !isSelected(selectedColor) && colores123456.length < getMaximumColors(difficulty)) {
    selectButton.disabled = false;
  } else {
    selectButton.disabled = true;
  }
}

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

let colores123456 = [];

function isSelected(color) {
  return colores123456.some(obj => obj.nombre === color);
}

function handleSelect() {
  const selectedColor = colorPicker.value;
  const difficulty = sessionStorage.getItem("difficulty");

  if (selectedColor && !isSelected(selectedColor) && colores123456.length < getMaximumColors(difficulty)) {
    const colorName = `color-a${colores123456.length + 1}`;
    colores123456.push({ nombre: colorName, color: selectedColor });
    colorPicker.value = ""; // Limpiar el selector de colores
    displaySelectedColors();
    if (colores123456.length === getMaximumColors(difficulty)) {
      selectButton.disabled = true;
      sessionStorage.setItem("colores123456", JSON.stringify(colores123456));
      window.location.href = "../pages/juegoIntermedio.html";
    }
  }
}

function handleDelete() {
  if (colores123456.length > 0) {
    colores123456.pop();
    displaySelectedColors();
    selectButton.disabled = false;
  }
}

function displaySelectedColors() {
  selectedColorsContainer.innerHTML = "";

  for (let i = 0; i < colores123456.length; i++) {
    const colorElement = document.createElement("div");
    colorElement.style.backgroundColor = colores123456[i].color;
    colorElement.className = "selected-color";
    selectedColorsContainer.appendChild(colorElement);
  }
}

selectButton.addEventListener("click", handleSelect);
deleteButton.addEventListener("click", handleDelete);

// Mostrar los colores seleccionados al cargar la página
window.addEventListener("load", () => {
  const storedColors = JSON.parse(sessionStorage.getItem("colores123456"));

  if (storedColors && storedColors.length > 0) {
    colores123456 = storedColors;
    displaySelectedColors();
  }
});
