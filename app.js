document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const width = 8;
  const squaresFacil = [];
  let score = 0;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const frutas = [
    "url(./styles/img/1F34B_color.png)",
    "url(./styles/img/1F95D_color.png)",
    "url(./styles/img/1F349_color.png)",
    "url(./styles/img/1F351_color.png",
    "url(./styles/img/1F352_color.png)",
    "url(./styles/img/1F965_color.png)",
  ];

  /* Grilla */
  function createBoard() {
    for (let i = 0; i <= width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("class", "item");
      let randomColor = Math.floor(Math.random() * frutas.length);
      square.style.backgroundImage = frutas[randomColor];
      var elementos = Array.from(document.getElementsByClassName("item"));
      for (let item of elementos) {
        item.style.backgroundSize = "cover";
      }

      grilla.appendChild(square);
      squaresFacil.push(square);
    }
  }

  /* Tañamo según nivel */
  const changeLevel = (level) => {
    if (level === "facil") {
      width = 9;
    } else if (level === "normal") {
      width = 8;
    } else {
      width = 7;
    }
  };

  /* Inicializar modales */

  const modales = () => {
    $("#btn-jugar").addEventListener("click", () => {
      $("#modal-bienvenida").classList.add("oculto");
      $("#modal-nuevo-juego").classList.remove("oculto");
    });

    $("#btn-modo-facil").addEventListener("click", () => {
      changeLevel("facil");
      //startGame();
    });
    $("#btn-modo-normal").addEventListener("click", () => {
      createBoard();
      //changeLevel("normal");
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
    $("#btn-modo-dificil").addEventListener("click", () => {
      changeLevel("dificil");
      //startGame();
    });
  };

  modales();
});
