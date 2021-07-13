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
      square.addEventListener("dragend", (e) => dragEnd(tamanio, e))
    );
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) =>
      square.addEventListener("dragenter", dragEnter)
    );
    squares.forEach((square) =>
      square.addEventListener("dragleave", dragLeave)
    );
    squares.forEach((square) =>
      square.addEventListener("drop", (e) => dragDrop(tamanio, e))
    );
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
  const prueba = () => {
    console.log("Hola hola");
  };

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
          prueba();
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
