document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.querySelector(".grilla");
  const widthFacil = 8;
  const squaresFacil = [];

  //const frutas = ["kiwi", "coco", "peach", "limon", "cereza", "sandia"];

  // const frutas = [
  //   { name: "limon", image: "url(styles/img/1F34B_color.png)" }, //lemon
  //   { name: "kiwi", image: "url(styles/img/1F95D_color.png)" },
  //   { name: "sandia", image: "url(styles/img/1F349_color.png)" },
  //   { name: "peach", image: "url(styles/img/1F351_color.png)" },
  //   { name: "cherry", image: "url(styles/img/1F352_color.png)" },
  //   { name: "coco", image: "url(styles/img/1F965_color.png)" },
  // ];

  const frutas = [
    "url(./styles/img/1F34B_color.png)",
    "url(./styles/img/1F95D_color.png)",
    "url(./styles/img/1F349_color.png)",
    "url(./styles/img/1F351_color.png",
    "url(./styles/img/1F352_color.png)",
    "url(./styles/img/1F965_color.png)",
  ];

  function createBoard() {
    for (let i = 0; i < widthFacil * widthFacil; i++) {
      const square = document.createElement("div");
      //square.setAttribute("draggable", true);
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
