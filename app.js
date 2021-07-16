document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const squares = [];
  let score = 0;
  let dificultad = "";
  let duracion = 5;
  let tiempoRestante = null;
  timedown = null;
  let imageAux = "";

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
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) =>
      square.addEventListener("dragleave", dragLeave)
    );
    squares.forEach((square) => square.addEventListener("dragend", dragEnd));
    squares.forEach((square) =>
      square.addEventListener("drop", (e) => dragDrop(tamanio, e))
    );

    //MATCHES
    matchFila3();
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

    // console.log("dragStart: ", {
    //   fruitDragged,
    //   squareIdDragged,
    //   fruitReplaced,
    //   squareIdReplaced,
    // });
  };

  const dragOver = (e) => {
    //Este evento se activa cuando el ratón/mouse se mueve SOBRE un elemento cuando está teniendo lugar una operación de arrastre
    e.preventDefault();
  };

  const dragEnter = (e) => {
    //Se dispara cuando el ratón/mouse se mueve PRIMERO sobre un elemento, mientras está teniendo lugar una operación de arrastre.
    e.preventDefault();
  };

  const dragLeave = () => {
    imageAux = fruitDragged;
    squares[squareIdDragged].style.backgroundImage = "";

    // console.log("dragLeave: ", {
    //   fruitDragged,
    //   squareIdDragged,
    //   fruitReplaced,
    //   squareIdReplaced,
    //   imageAux,
    // });
  };

  const dragEnd = (e) => {
    if (fruitReplaced == undefined && squareIdReplaced == undefined) {
      squares[squareIdDragged].style.backgroundImage = imageAux;
    }
    // console.log("dragend");
  };

  const dragDrop = (tamanio, e) => {
    fruitReplaced = e.target.style.backgroundImage;
    squareIdReplaced = parseInt(e.target.id);

    // console.log("dragDrop: ", {
    //   fruitDragged,
    //   squareIdDragged,
    //   fruitReplaced,
    //   squareIdReplaced,
    // });
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
    } else if (!validMove && squareIdDragged == squareIdReplaced) {
      squares[squareIdDragged].style.backgroundImage = imageAux;
    } else {
      squares[squareIdDragged].style.backgroundImage = fruitDragged;
      squares[squareIdReplaced].style.backgroundImage = fruitReplaced;
    }
    // timer = setTimeout(matchFila3(tamanio), 2000);
    // console.log({ timer });
  };
  //for row of Three
  const matchFila3 = (tamanio) => {
    console.log({ tamanio }, tamanio * tamanio - 3);

    for (i = 0; i < tamanio * tamanio - 3; i++) {
      let fila3 = [i, i + 1, i + 2];
      let selectedFruit = squares[i].style.backgroundImage;
      console.log({ selectedFruit });
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        fila3.every(
          (index) =>
            squares[index].style.backgroundImage === selectedFruit && !isBlank
        )
      ) {
        score += 3;
        $("#scoreDisplay").innerHTML = score;
        fila3.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  };

  /* Limpiando Grilla */
  const clearBoard = () => {
    $(".grilla").innerHTML = "";
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

  ///Modales Sweet Alert
  const textspan = document.createElement("span");
  textspan.innerHTML =
    "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.<br><br> Si se forma un grupo, esos items se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo! <br><br><strong>Controles</strong><br>Click izquierdo: Selección <br>Enter o Espacio: Selección <br>Flechas o WASD: Movimiento e intercambio";
  /*Bienvenida*/
  const swalBienvenida = () => {
    swal({
      title: "¡Bienvenida!",
      content: textspan,
      button: "A jugar",
      closeOnClickOutside: false,
    }).then(() => {
      swalNiveles();
    });
  };
  swalBienvenida();

  /*Nuevo Juego*/
  const swalNiveles = () => {
    swal({
      title: "Nuevo Juego",
      text: "Seleccione una dificultad",
      buttons: {
        facil: {
          text: "Facil",
          value: "facil",
        },
        medio: {
          text: "Normal",
          value: "normal",
        },
        dificil: {
          text: "Dificil",
          value: "dificil",
        },
      },
    }).then((value) => {
      switch (value) {
        case "facil":
          clearBoard();
          createBoard(9, 630);
          //restartTimer();
          break;
        case "normal":
          console.log(value);
          clearBoard();
          createBoard(8, 560);
          //restartTimer();
          break;
        case "dificil":
          console.log(value);
          clearBoard();
          createBoard(7, 490);
          //restartTimer();
          break;
      }
    });
  };
  /*Reiniciar Juego*/
  const swalreiniciar = () => {
    swal({
      title: "Reiniciar juego?",
      text: "Perderás todo tu puntaje acumulado!",
      closeOnClickOutside: false,
      buttons: {
        cancel: "Cancelar",
        nuevoJuego: {
          text: "Nuevo juego",
          value: "resetear",
        },
      },
    }).then((value) => {
      if (value === "resetear") {
        swalNiveles();
      }
    });
  };
  /*Termino Juego*/
  const swalGameOver = () => {
    swal({
      title: "¡Juego terminado!",
      text: "Puntaje final: 0",
      closeOnClickOutside: false,
      buttons: {
        reiniciar: "Reiniciar",
        nuevoJuego: {
          text: "Nuevo juego",
          value: "resetear",
        },
      },
    }).then((value) => {
      if (value === "resetear") {
        swalNiveles();
      }
    });
  };
  /*Boton Info*/
  infoBtn = document.getElementById("info-btn");
  infoBtn.addEventListener("click", () => {
    info = true;
    if (info) {
      swal({
        title: "¡Bienvenida!",
        content: textspan,
        button: "A jugar",
        closeOnClickOutside: false,
      });
    }
  });
  /*Boton Refresh*/
  refreshBtn = document.getElementById("refresh-btn");
  refreshBtn.addEventListener("click", () => {
    swalreiniciar();
  });
}); //DOM cierre
