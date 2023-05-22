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

  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < getMaximumColors(difficulty)) {
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

let selectedColors = [];

function isSelected(color) {
  return selectedColors.includes(color);
}

function handleSelect() {
  const selectedColor = colorPicker.value;
  const difficulty = sessionStorage.getItem("difficulty");

  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < getMaximumColors(difficulty)) {
    selectedColors.push(selectedColor);
    colorPicker.value = ""; // Limpiar el selector de colores
    displaySelectedColors();
    if (selectedColors.length === getMaximumColors(difficulty)) {
      selectButton.disabled = true;
      sessionStorage.setItem("selectedColors", JSON.stringify(selectedColors));
      window.location.href = "URL_DESTINO"; // Reemplaza "URL_DESTINO" con la URL a la que deseas redirigir
    }
  }
}

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

selectButton.addEventListener("click", handleSelect);
deleteButton.addEventListener("click", handleDelete);

// Mostrar los colores seleccionados al cargar la página
window.addEventListener("load", () => {
  const storedColors = JSON.parse(sessionStorage.getItem("selectedColors"));

  if (storedColors && storedColors.length > 0) {
    selectedColors = storedColors;
    displaySelectedColors();
  }
});
