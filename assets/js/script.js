import { obtenerAnimales } from './animalesService.js';

const inputComentarios = document.querySelector("#inputComentarios");
const animalSeleccion = document.querySelector("#animal");
const edadSeleccion = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const btnRegistrar = document.querySelector("#btnRegistrar");
// const modal = document.querySelector("#exampleModal");
// const modalAnimal = document.querySelector("#modalAnimal");
// const modalEdad = document.querySelector("#modalEdad");
// const modalComentarios = document.querySelector("#modalComentarios");
// const spanCerrar = document.querySelector(".close");
const animalesContainer = document.querySelector("#animales");

let animalTodos = [];

(async () => {
  try {
    animalTodos = await obtenerAnimales();
  } catch (error) {
    console.log(error);
  }
})();

class Animal {
  #nombre;
  #edad;
  #img;
  #comentarios;
  #sonido;

  constructor(nombre, edad, img, comentarios, sonido) {
    this.#nombre = nombre;
    this.#edad = edad;
    this.#img = img;
    this.#comentarios = comentarios;
    this.#sonido = sonido;
  }

  get nombre() {
    return this.#nombre;
  }

  get edad() {
    return this.#edad;
  }

  get img() {
    return this.#img;
  }

  set comentarios(nuevoComentario) {
    this.#comentarios = nuevoComentario;
  }

  set edad(nuevaEdad) {
    this.#edad = nuevaEdad;
  }

  get sonido() {
    return this.#sonido;
  }

  Sonido() {
    return "animal emite sonido";
  }

  pintarHTML() {
    animalesContainer.innerHTML += `<div class="card" style="width: 18rem;">
      <img src="assets/imgs/${this.#img}" class="card-img-top" alt="${this.#nombre}">
      <div class="card-body">
        <a href="#" class="btn btn-primary emitir-sonido">Emitir sonido</a>
      </div>
    </div>`;
  }
}

class Leon extends Animal {
  Sonido(rugir) {
    const audio = new Audio(`assets/sounds/${rugir}`);
    audio.play();
  }
}

class Lobo extends Animal {
  Sonido(aullar) {
    const audio = new Audio(`assets/sounds/${aullar}`);
    audio.play();
  }
}

class Oso extends Animal {
  Sonido(grunir) {
    const audio = new Audio(`assets/sounds/${grunir}`);
    audio.play();
  }
}

class Serpiente extends Animal {
  Sonido(sisear) {
    const audio = new Audio(`assets/sounds/${sisear}`);
    audio.play();
  }
}

class Aguila extends Animal {
  Sonido(chillar) {
    const audio = new Audio(`assets/sounds/${chillar}`);
    audio.play();
  }
}

const animalTypes = {
  Leon: Leon,
  Lobo: Lobo,
  Oso: Oso,
  Serpiente: Serpiente,
  Aguila: Aguila,
};

btnRegistrar.addEventListener("click", (e) => {
  e.preventDefault();

  const animalEncontrado = animalTodos.find(
    (item) => item.name.toLowerCase() === animalSeleccion.value.toLowerCase()
  );

  if (animalEncontrado) {
    const nombreAnimal = animalTypes[animalEncontrado.name];

    if (nombreAnimal) {
      const animal = new nombreAnimal(
        animalEncontrado.name,
        edadSeleccion.value,
        animalEncontrado.imagen,
        comentarios.value,
        animalEncontrado.sonido
      );

      animal.pintarHTML();

      const emitirSonidoBotones = document.querySelectorAll(".emitir-sonido");
      emitirSonidoBotones.forEach((boton) => {
        boton.addEventListener("click", () => {
          animal.Sonido(animal.sonido);
        });
      });
    }
  }
});

// modalAnimal.textContent = "animal:" + animalSeleccion.value;
// modalEdad.textContent = "Edad:" + edadSeleccion.value;
// modalComentarios.textContent = "Comentarios:" + comentarios.value;

// // Funciones para mostrar y cerrar el modal
// function mostrarModal() {
//   modal.style.display = "block";
// }

// spanCerrar.onclick = function () {
//   modal.style.display = "none";
// };
