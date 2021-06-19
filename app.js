document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const widthFacil = 9;
  const squaresFacil = [];

  //Crear la grilla

  const crearTablero = () => {
    for (let i = 0; i < widthFacil * widthFacil; i++) {
      const cuadrado = document.createElement("div");
      grilla.appendChild(cuadrado);
      squaresFacil.push(cuadrado);
    }
  };
  crearTablero();
});
