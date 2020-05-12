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
