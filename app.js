document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const squares = [];
  let score = 0;
  let dificultad = "";
  let duracion = 5;
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

  /* Creando Grilla */
  const createBoard = (tamanio, lado) => {
    countdown();
    for (let i = 0; i <= tamanio * tamanio; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", "i");
      square.setAttribute("class", "item");
      square.setAttribute("draggable", true);
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

  /* Limpiando Grilla */
  const clearBoard = () => {
    $(".grilla").innerHTML = "";
  };

  /* Mover item */

  let fruitBeingDragged;
  let fruitBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  const dragStart = () => {
    console.log(this.id, "dragstart");
  };
  const dragEnd = () => {
    console.log(this.id, "dragend");
  };
  const dragOver = () => {
    console.log(this.id, "dragover");
  };
  const dragEnter = () => {
    console.log(this.id, "dragenter");
  };
  const dragLeave = () => {
    console.log(this.id, "drageleave");
  };
  const dragDrop = () => {
    console.log(this.id, "drop");
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
      refreshTimer();
    });
    $("#btn-modo-normal").addEventListener("click", () => {
      clearBoard();
      createBoard(8, 560);
      dificultad = "normal";
      $("#modal-nuevo-juego").classList.add("oculto");
      refreshTimer();
    });
    $("#btn-modo-dificil").addEventListener("click", () => {
      clearBoard();
      createBoard(7, 490);
      dificultad = "dificil";
      $("#modal-nuevo-juego").classList.add("oculto");
      refreshTimer();
    });
  };

  modales();

  /*Button Info */

  let info = false;
  $("#info-btn").addEventListener("click", () => {
    info = true;
    clearInterval(timedown);
<<<<<<< HEAD
=======
    //document.body.appendChild(overlay);
    //Timer must stop
>>>>>>> 16eb7aad2792deee613c47d79fbca92e7df455fc
    $("#modal-bienvenida").classList.remove("oculto");
    if (info) {
      $("#btn-jugar").addEventListener("click", () => {
        $("#modal-nuevo-juego").classList.add("oculto");
      });
    }
  });

  /*Refresh Button*/

  $("#refresh-btn").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.remove("oculto");
  });

  $("#btn-cancelar").addEventListener("click", () => {
    $("#modal-reiniciar-juego").classList.add("oculto");
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
          refreshTimer();
          break;
        case "normal":
          clearBoard();
          createBoard(8, 560);
          refreshTimer();
          break;
        case "dificil":
          clearBoard();
          createBoard(7, 490);
          refreshTimer();
          break;
      }
    });
  };

  /* Timer */
  const countdown = () => {
    timedown = setInterval(function () {
      duracion--;
      document.getElementById("countdown").textContent = duracion;
      if (duracion == 0) {
        clearInterval(timedown);
        gameOver();
      }
    }, 1000);
  };

  const refreshTimer = () => {
    duracion = 5;
    document.getElementById("countdown").textContent = duracion;
  };
});
