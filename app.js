document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const squares = [];
  let score = 0;
  let dificultad = "";
  let duracion = 5;
  let tiempoRestante = null;
  timedown = null;

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
    countdown();
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
      dificultad = "facil";
      $("#modal-nuevo-juego").classList.add("oculto");
      restartTimer();
    });
    $("#btn-modo-normal").addEventListener("click", () => {
      clearBoard();
      createBoard(8, 560);
      dificultad = "normal";
      $("#modal-nuevo-juego").classList.add("oculto");
      restartTimer();
    });
    $("#btn-modo-dificil").addEventListener("click", () => {
      clearBoard();
      createBoard(7, 490);
      dificultad = "dificil";
      $("#modal-nuevo-juego").classList.add("oculto");
      restartTimer();
    });
  };

  modales();

  /*Button Info */

  let info = false;
  $("#info-btn").addEventListener("click", () => {
    info = true;
    clearInterval(timedown);
    //document.body.appendChild(overlay);
    //Timer must stop
    $("#modal-bienvenida").classList.remove("oculto");
    if (info) {
      $("#btn-jugar").addEventListener("click", () => {
        $("#modal-nuevo-juego").classList.add("oculto");
        continueTimer();
      });
    }
  });

  /*Refresh Button*/

  $("#refresh-btn").addEventListener("click", () => {
    //Timer must stop
    clearInterval(timedown);
    $("#modal-reiniciar-juego").classList.remove("oculto");
  });

  $("#btn-cancelar").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.add("oculto");
    continueTimer();
  });

  $("#btn-nuevo-juego").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.add("oculto");
    $("#modal-nuevo-juego").classList.remove("oculto");
  });

  /* Juego Terminado */

  const gameOver = () => {
    $("#modal-juego-terminado").classList.remove("oculto");

    $("#btn-nuevo-juego2").addEventListener("click", () => {
      $("#modal-juego-terminado").classList.add("oculto");
      $("#modal-nuevo-juego").classList.remove("oculto");
    });

    $("#btn-reiniciar-juego").addEventListener("click", () => {
      $("#modal-juego-terminado").classList.add("oculto");

      switch (dificultad) {
        case "facil":
          clearBoard();
          createBoard(9, 630);
          restartTimer();
          break;
        case "normal":
          clearBoard();
          createBoard(8, 560);
          restartTimer();
          break;
        case "dificil":
          clearBoard();
          createBoard(7, 490);
          restartTimer();
          break;
      }
    });
  };

  /* Timer */
  const countdown = () => {
    timedown = setInterval(function () {
      duracion--;
      tiempoRestante = duracion;
      document.getElementById("countdown").textContent = tiempoRestante;
      console.log(tiempoRestante);
      if (tiempoRestante == 0) {
        clearInterval(timedown);
        gameOver();
      }
    }, 1000);
  };
  const restartTimer = () => {
    duracion = 5;
    document.getElementById("countdown").textContent = duracion;
  };
  const continueTimer = () => {
    timedown = setInterval(function () {
      tiempoRestante--;
      document.getElementById("countdown").textContent = tiempoRestante;
      console.log(tiempoRestante);
      if (tiempoRestante == 0) {
        clearInterval(timedown);
        gameOver();
      }
    }, 1000);
  };
});
