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
  const createBoard = (tamanio, lado) => {
    for (let i = 0; i <= tamanio * tamanio; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", "u");
      square.setAttribute("class", "item");
      square.setAttribute("draggable", "true");
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
  };

  const clearBoard = () => {
    $(".grilla").innerHTML = "";
  };
  /* Inicializar modales */

  const modales = () => {
    $("#btn-jugar").addEventListener("click", () => {
      $("#modal-bienvenida").classList.add("oculto");
      $("#modal-nuevo-juego").classList.remove("oculto");
    });

    $("#btn-modo-facil").addEventListener("click", () => {
      clearBoard();
      createBoard(9, 630);
      countdown();
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
    $("#btn-modo-normal").addEventListener("click", () => {
      clearBoard();
      createBoard(8, 560);
      countdown();
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
    $("#btn-modo-dificil").addEventListener("click", () => {
      clearBoard();
      createBoard(7, 490);
      countdown();
      //startGame();
      $("#modal-nuevo-juego").classList.add("oculto");
    });
  };

  modales();

  /*Button Info */
  let info = false;
  $("#info-btn").addEventListener("click", () => {
    info = true;
    document.body.appendChild(overlay);
    //Timer must stop
    $("#modal-bienvenida").classList.remove("oculto");
    if (info) {
      $("#btn-jugar").addEventListener("click", () => {
        $("#modal-nuevo-juego").classList.add("oculto");
      });
    }
  });

  /*Refresh Button*/

  $("#refresh-btn").addEventListener("click", () => {
    //Timer must stop
    $("#modal-reiniciar-juego").classList.remove("oculto");
  });

  $("#btn-cancelar").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.add("oculto");
  });

  $("#btn-nuevo-juego").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.add("oculto");
    $("#modal-nuevo-juego").classList.remove("oculto");
  });

  /* Timer */
  const countdown = () => {
    let seconds = document.getElementById("countdown").textContent;
    let countdown = setInterval(function () {
      seconds--;
      document.getElementById("countdown").textContent = seconds;
      if (seconds <= 0) clearInterval(countdown);
    }, 1000);
  };

  /*DRAG*/
});
