export async function obtenerAnimales() {
    let animalTodos = [];
  
    try {
      const response = await fetch("animales.json");
  
      if (response.ok === false) {
        throw {
          codigo: 404,
          mensaje: "No existen animales",
        };
      }
  
      const data = await response.json();
      animalTodos = data.animales;
    } catch (error) {
      console.log(error);
    }
  
    return animalTodos;
  }