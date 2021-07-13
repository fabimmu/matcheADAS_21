document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const squares = [];
  let score = 0;
  let dificultad = "";
  let duracion = 5;
  let tiempoRestante = null;
  timedown = null;
  let imageAux ="";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const frutas = [
    "url(./styles/img/limon.png)",
    "url(./styles/img/kiwi.png)",
    "url(./styles/img/sandia.png)",
    "url(./styles/img/melocoton.png",
    "url(./styles/img/cereza.png)",
    "url(./styles/img/coco.png)",
  ];

  /* Random */
  const random = () => {
    const indice = Math.floor(Math.random() * frutas.length);
    return frutas[indice];
  };

  /* Creando Grilla */
  const createBoard = (tamanio, lado) => {
    //countdown();
    for (let i = 0; i <= tamanio * tamanio; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
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

    squares.forEach((square) =>
      square.addEventListener("dragstart", dragStart)
    );
    squares.forEach((square) =>
      square.addEventListener("dragenter", dragEnter)
    );
    squares.forEach((square) => 
    square.addEventListener("dragover", dragOver)
    );
    squares.forEach((square) =>
      square.addEventListener("dragleave", dragLeave)
    );
    squares.forEach((square) =>
      square.addEventListener("drop", (e) => dragDrop(tamanio, e))
    );
  };

  /* Mover item */
  let fruitDragged;
  let fruitReplaced;
  let squareIdDragged;
  let squareIdReplaced;

  const dragStart = (e) => {
    //Setea las variables Dragged iniciales
    fruitDragged = e.target.style.backgroundImage;
    squareIdDragged = parseInt(e.target.id);

    console.log("dragStart: ", {fruitDragged, squareIdDragged, fruitReplaced, squareIdReplaced});
  };

  const dragOver = (e) => {
    //Este evento se activa cuando el ratón/mouse se mueve SOBRE un elemento cuando está teniendo lugar una operación de arrastre
    e.preventDefault();
  };

  const dragEnter = (e) => {
    //Se dispara cuando el ratón/mouse se mueve PRIMERO sobre un elemento, mientras está teniendo lugar una operación de arrastre.
    e.preventDefault();
  };

  const dragLeave = (e) => {
    // Deja en blanco el square origen
    imageAux = fruitDragged;
    squares[squareIdDragged].style.backgroundImage = "";
    console.log("dragLeave: ", {fruitDragged, squareIdDragged, fruitReplaced, squareIdReplaced});
  };

  const dragDrop = (tamanio, e) => {
    fruitReplaced = e.target.style.backgroundImage;
    squareIdReplaced = parseInt(e.target.id);

    console.log("dragDrop: ", {fruitDragged, squareIdDragged, fruitReplaced, squareIdReplaced});
    //Ejecuta el intercambio de frutas

    let validMoves = [
      squareIdDragged - 1, //Izquierda
      squareIdDragged - tamanio, //Arriba
      squareIdDragged + 1, //Derecha
      squareIdDragged + tamanio, //Abajo
    ];
    let validMove = validMoves.includes(squareIdReplaced);

    if (validMove) {
      squares[squareIdDragged].style.backgroundImage = fruitReplaced;
      squares[squareIdReplaced].style.backgroundImage = fruitDragged;
    }else if(!validMove && squareIdDragged == squareIdReplaced) {
      squares[squareIdDragged].style.backgroundImage = imageAux;
    }else {
      squares[squareIdDragged].style.backgroundImage = fruitDragged;
      squares[squareIdReplaced].style.backgroundImage = fruitReplaced;
    }
  };

  /* Limpiando Grilla */
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
  /* const countdown = () => {
    timedown = setInterval(function () {
      duracion--;
      tiempoRestante = duracion;
      document.getElementById("countdown").textContent = tiempoRestante;
      if (tiempoRestante == 0) {
        clearInterval(timedown);
        gameOver();
      }
    }, 1000);
  }; */
  const restartTimer = () => {
    duracion = 5;
    document.getElementById("countdown").textContent = duracion;
  };
  const continueTimer = () => {
    timedown = setInterval(function () {
      tiempoRestante--;
      document.getElementById("countdown").textContent = tiempoRestante;
      if (tiempoRestante == 0) {
        clearInterval(timedown);
        gameOver();
      }
    }, 1000);
  };
});
