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

  createBoard();
});

swal({
  title: "Bienvenida!",
  text: "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. \n Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. \n\n Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo! \n\n Controles \n\n Click izquierdo: selección \n Enter o Espacio: selección \n Flechas o WASD: movimiento e intercambio",

  button: "A jugar!",
});


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
  $("#btn-modo-facil").addEventListener("click", () => {
    changeLevel("facil");
    //startGame();
  });
  $("#btn-modo-normal").addEventListener("click", () => {
    changeLevel("normal");
    //startGame();
  });
  $("#btn-modo-dificil").addEventListener("click", () => {
    changeLevel("dificil");
    //startGame();
  });
};
