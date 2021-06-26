document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const squares = [];
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

  /* Random */

  const random = () => {
    const indice = Math.floor(Math.random() * frutas.length);
    return frutas[indice];
  };

  /* Grilla */
  function createBoard(tamanio, lado) {
    for (let i = 0; i <= tamanio * tamanio; i++) {
      const square = document.createElement("div");
      square.setAttribute("class", "item");
      square.style.backgroundImage = random();
      grilla.style.width = `${lado}px`;
      grilla.style.height = `${lado}px`;
      let elementos = Array.from(document.getElementsByClassName("item"));
      for (let item of elementos) {
        item.style.backgroundSize = "cover";
      }

      grilla.appendChild(square);
      squares.push(square);
    }
  }

  /* Inicializar modales */

  const modales = () => {
    $("#btn-jugar").addEventListener("click", () => {
      $("#modal-bienvenida").classList.add("oculto");
      $("#modal-nuevo-juego").classList.remove("oculto");
    });

    $("#btn-modo-facil").addEventListener("click", () => {
      createBoard(9, 630);
      //changeLevel("facil");
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
    $("#btn-modo-normal").addEventListener("click", () => {
      createBoard(8, 560);
      //changeLevel("normal");
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
    $("#btn-modo-dificil").addEventListener("click", () => {
      createBoard(7, 490);
      //changeLevel("dificil");
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
  };

  modales();
  /*Info Button*/
  let info = false;
  $("#info-btn").addEventListener("click", () => {
    info = true;
    $("#modal-bienvenida").classList.remove("oculto");
    if (info) {
      $("#btn-jugar").addEventListener("click", () => {
        $("#modal-nuevo-juego").classList.add("oculto");
      });
    }
  });
});
