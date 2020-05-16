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

// ////////// checks direction

let pressedDown = false;

let x;

const diff = {
  left: 0,
  right: 0,
  up: 0,
  down: 0,
};

const func3 = () => {
  pressedDown = false;
};

// 4. runs func for pointermove
const func2 = () => {
  // calculates difference between starting point and current point
  diff.left = x - event.pageX;
  diff.right = event.pageX - x;
  diff.up = x - event.pageY;
  diff.down = event.pageY - x;

  if (pressedDown) {
    // returns empty string or first value that reaches 100
    const dirrecc = Object.keys(diff)
      .filter((key) => diff[key] > 100)
      .toString();

    switch (
      dirrecc // outputs dirrection
    ) {
      case "left":
        console.log("left");
        break;
      case "right":
        console.log("right");
        break;
      case "up":
        console.log("up");
        break;
      case "down":
        console.log("down");
        break;
      default:
        console.log("no move");
        break;
    }
  } else {
    // stops checking for coords after pointer is lifted
    gameBoard.removeEventListener("pointermove", func2);
    gameBoard.removeEventListener("pointerup", func3, false);
    pressedDown = false;
  }
};

const func = () => {
  pressedDown = true;
  gameBoard.addEventListener("pointerup", func3, false);
  console.log(event.pageX);
  x = event.pageX;

  //  3. adds listener for pointermove
  gameBoard.addEventListener("pointermove", func2);
};

// 1.Adds listener for a click

gameBoard.addEventListener("pointerdown", func, false);
