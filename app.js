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
  square.textContent = "2";
};

document.getElementById("start").addEventListener("click", addNumber);
