document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const widthFacil = 8;
  const squaresFacil = [];

  //const frutas = ["kiwi", "coco", "peach", "limon", "cereza", "sandia"];
  const colores = ["green", "red", "pink", "blue", "black", "orange"];

  //Crear la grilla

  const crearTablero = () => {
    for (let i = 0; i < widthFacil * widthFacil; i++) {
      const cuadrado = document.createElement("div");
      let randomFruta = Math.floor(Math.random() * colores.length);
      cuadrado.style.backgroundColor = colores[randomFruta];
      grilla.appendChild(cuadrado);
      squaresFacil.push(cuadrado);
    }
  };
  crearTablero();
});
