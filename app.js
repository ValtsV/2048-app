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

document.getElementById("start").addEventListener("click", addNumber);

const gameBoard = document.getElementById("main-block");

// 2. runs func for pointerdown

const func = () => {
  console.log(event.pageX);
  const x = event.pageX;

  // 4. runs func for pointermove

  const func2 = () => {
    if (event.pageX > 200) {
      console.log(event.pageX);
      console.log(x);
    } else {
      gameBoard.removeEventListener("pointermove", func2);
    }
  };

  //  3. adds listener for pointermove
  gameBoard.addEventListener("pointermove", func2);
};

// 1.Adds listener for a click

gameBoard.addEventListener("pointerdown", func, false);

// gotta add bool for mousedown
