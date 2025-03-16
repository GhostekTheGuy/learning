// Lepiej używać const i let zamiast var - są bezpieczniejsze i mają przewidywalny zasięg
class ColorManager {
  constructor() {
    // Elementy DOM
    this.rgbInput = document.getElementById("rgb");
    this.colorNameInput = document.getElementById("color-name");
    this.rgbList = document.getElementById("rgb-list");
    
    // Przyciski
    this.savePairButton = document.getElementById("savePairButton");
    this.clearDataButton = document.getElementById("clearDataButton");
    this.showDataButton = document.getElementById("showDataButton");
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    this.savePairButton.addEventListener("click", (e) => this.savePair(e));
    this.clearDataButton.addEventListener("click", (e) => this.clearData(e));
    this.showDataButton.addEventListener("click", (e) => this.showData(e));
  }
  
  savePair(e) {
    e.preventDefault();
    const rgbValue = this.rgbInput.value;
    const colorName = this.colorNameInput.value;
    
    if (!this.validateInputs(rgbValue, colorName)) {
      return;
    }
    
    sessionStorage.setItem(colorName, rgbValue);
    this.clearInputs();
  }
  
  validateInputs(rgbValue, colorName) {
    if (!rgbValue || !colorName) {
      alert("Wprowadź poprawne dane");
      return false;
    }
    
    if (rgbValue.length !== 6) {
      alert("Kod HEX RGB musi mieć 6 cyfr");
      return false;
    }
    
    return true;
  }
  
  clearInputs() {
    this.rgbInput.value = "";
    this.colorNameInput.value = "";
  }
  
  clearData(e) {
    e.preventDefault();
    if (sessionStorage.length === 0) {
      alert("Brak danych do usunięcia");
      return;
    }
    
    sessionStorage.clear();
    this.rgbList.innerHTML = "";
  }
  
  showData(e) {
    e.preventDefault();
    
    if (sessionStorage.length === 0) {
      alert("Brak danych do wyświetlenia");
      return;
    }
    
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '0.5rem';
    container.style.width = '100%';
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const colorName = sessionStorage.key(i);
      const rgbValue = sessionStorage.getItem(colorName);
      
      const colorElement = this.createColorElement(colorName, rgbValue);
      container.appendChild(colorElement);
    }
    
    this.rgbList.innerHTML = '';
    this.rgbList.appendChild(container);
  }
  
  createColorElement(colorName, rgbValue) {
    const element = document.createElement('div');
    element.style.padding = '0.25rem';
    element.style.backgroundColor = `#${rgbValue}`;
    
    const nameText = document.createTextNode(`${colorName}, kod koloru: `);
    element.appendChild(nameText);
    
    const valueSpan = document.createElement('span');
    valueSpan.style.textTransform = 'uppercase';
    valueSpan.textContent = rgbValue;
    element.appendChild(valueSpan);
    
    return element;
  }
}

// Inicjalizacja po załadowaniu DOma
document.addEventListener("DOMContentLoaded", () => {
  const manager = new ColorManager();
});