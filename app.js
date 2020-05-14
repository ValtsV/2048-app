// Make squares

const squares = {};
for (let index = 0; index < 16; index++) {
  squares[index + 1] = false;
}

console.log(squares);

const emptySquares = Object.keys(squares).filter((key) => {
  if (!squares[key]) {
    return key;
  }
});

console.log(emptySquares);

const addNumber = () => {
  const nextSquare =
    emptySquares[Math.floor(Math.random() * Math.floor(emptySquares.length))];

  const square = document.getElementById(nextSquare);
  squares[nextSquare] = false;
  square.textContent = "2";
  console.log(nextSquare);

  const x = emptySquares.findIndex((el) => el == nextSquare);
  console.log(x);

  emptySquares.splice(x, 1);

  console.log(emptySquares);
};

const addMouseMoveListener = () => {
  document.addEventListener("pointermove", (event) => {
    console.log(event.pageX); // compar pagex to initial coord, when difference reaches 100px or smth, fire
  });
  const x = event.clientX;
  const y = event.clientY;
  console.log(x, y);
};

document.getElementById("start").addEventListener("click", addNumber);

document
  .getElementById("main-block")
  .addEventListener("pointerdown", addMouseMoveListener);

// const cont = document.querySelector(".game-container");

// cont.onmousedown = addMouseMoveListener;
