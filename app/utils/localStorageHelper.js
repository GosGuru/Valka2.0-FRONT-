// Función para guardar datos en localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

// Función para cargar datos desde localStorage
export const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error("Error al cargar desde localStorage:", error);
    return null;
  }
};


// Función para eliminar datos de localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error al eliminar de localStorage:", error);
  }
};
