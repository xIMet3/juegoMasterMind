const colorPicker = document.getElementById("color-picker");
const colorPreview = document.querySelector(".selected-color");
const selectButton = document.getElementById("select-button");
const selectedColorsContainer = document.getElementById("selected-colors-container");
const deleteButton = document.getElementById("delete-button");

colorPicker.addEventListener("change", changeColor);

function changeColor() {
  const selectedColor = colorPicker.value;
  colorPreview.style.backgroundColor = selectedColor;

  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < 6) {
    selectButton.disabled = false;
  } else {
    selectButton.disabled = true;
  }
}

let selectedColors = [];

function isSelected(color) {
  return selectedColors.includes(color);
}

function handleSelect() {
  const selectedColor = colorPicker.value;
  if (selectedColor && !isSelected(selectedColor) && selectedColors.length < 6) {
    selectedColors.push(selectedColor);
    colorPicker.value = ""; // Limpiar el selector de colores
    displaySelectedColors();
    if (selectedColors.length === 6) {
      selectButton.disabled = true;
      sessionStorage.setItem("selectedColors", JSON.stringify(selectedColors));
      window.location.href = "https://www.example.com"; // Reemplaza con tu enlace deseado
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
