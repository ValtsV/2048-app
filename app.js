// Make array of objects, where each object is a square

const squares = [];
for (let index = 0; index < 16; index++) {
  squares.push({
    id: index + 1,
    value: 0,
    posChange: "none",
    changeDirection: "none",
  });
}
const isPlaying = false;

const updateGameboard = () => {
  // reads squares and updates gameboard accordingly
  console.log("gameboard rendered");
};

const resetGameboard = () => {
  // resets the squares objects
  console.log("squares reset");
};

const startGame = () => {
  // Checks which squares are free and adds randomly a number
  const nextSquare =
    emptySquares[Math.floor(Math.random() * Math.floor(emptySquares.length))];

  const square = document.getElementById(`s${nextSquare}`);
  squares[nextSquare] = 0;
  square.textContent = "2";
  console.log("id of square:" + `s${nextSquare}`);

  const x = emptySquares.findIndex((el) => el == nextSquare);
  console.log("index is:" + x);

  emptySquares.splice(x, 1);

  console.log(emptySquares);

  squares[nextSquare] = 2;

  console.log(squares);

  isPlaying = true;
};

const calcSquares = (a, b, c, d) => {
  if (a === b) {
    a.value * 2;
    a.posChange + 0;
    b.posChange + 1;
    c.posChange + 1;
    d.posChange + 1;
    if (c === d) {
      c.value * 2;
      d.posChange + 1;
    }
  } else if (a === c && b === 0) {
    a.value * 2;
    c.posChange + 2;
    d.posChange + 2;
  } else if (a === d && b === 0 && c === 0) {
    a.value * 2;
    d.posChange + 3;
  } else if (b === c) {
    if (a === 0) {
      b.posChange + 1;
      c.posChange + 1;
      d.posChange + 1;
    }
    b.value * 2;
    c.posChange + 1;
    d.posChange + 1;
  } else if (b === d && c === 0) {
    if (a === 0) {
      b.posChange + 1;
      c.posChange + 1;
      d.posChange + 1;
    }
    b.value * 2;
    d.posChange + 2;
  } else if (c === d) {
    if (a === 0) {
      b.posChange + 1;
      c.posChange + 1;
      d.posChange + 1;
    }
    if (b === 0) {
      c.posChange + 1;
      d.posChange + 1;
    }
    c.value * 2;
    d.posChange + 1;
  }
};

const checkForMovement = () => {
  while (isPlaying) {
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
  }
};

// // Make squares

// const squares = {};
// for (let index = 0; index < 16; index++) {
//   squares["sq" + (index + 1).toString()] = 0;
// }

// console.log(squares);

// const emptySquares = Object.keys(squares).map((key) => {
//   if (squares[key] === 0) {
//     return key.slice(2);
//   }
// });

// console.log(emptySquares);

// const addNumber = () => {
//   // Checks which squares are free and adds randomly a number
//   const nextSquare =
//     emptySquares[Math.floor(Math.random() * Math.floor(emptySquares.length))];

//   const square = document.getElementById(`s${nextSquare}`);
//   squares[nextSquare] = 0;
//   square.textContent = "2";
//   console.log("id of square:" + `s${nextSquare}`);

//   const x = emptySquares.findIndex((el) => el == nextSquare);
//   console.log("index is:" + x);

//   emptySquares.splice(x, 1);

//   console.log(emptySquares);

//   squares[nextSquare] = 2;

//   console.log(squares);
// };

// document.getElementById("start").addEventListener("click", addNumber);

// const gameBoard = document.getElementById("main-block");

// // ////////// checks direction

// let pressedDown = false;

// let x;

// const diff = {
//   left: 0,
//   right: 0,
//   up: 0,
//   down: 0,
// };

// const func3 = () => {
//   pressedDown = false;
// };

// // 4. runs func for pointermove
// const func2 = () => {
//   // calculates difference between starting point and current point
//   diff.left = x - event.pageX;
//   diff.right = event.pageX - x;
//   diff.up = x - event.pageY;
//   diff.down = event.pageY - x;

//   if (pressedDown) {
//     // returns empty string or first value that reaches 100
//     const dirrecc = Object.keys(diff)
//       .filter((key) => diff[key] > 100)
//       .toString();

//     switch (
//       dirrecc // outputs dirrection
//     ) {
//       case "left":
//         console.log("left");
//         break;
//       case "right":
//         console.log("right");
//         break;
//       case "up":
//         console.log("up");
//         break;
//       case "down":
//         console.log("down");
//         break;
//       default:
//         console.log("no move");
//         break;
//     }
//   } else {
//     // stops checking for coords after pointer is lifted
//     gameBoard.removeEventListener("pointermove", func2);
//     gameBoard.removeEventListener("pointerup", func3, false);
//     pressedDown = false;
//   }
// };

// const func = () => {
//   pressedDown = true;
//   gameBoard.addEventListener("pointerup", func3, false);
//   console.log(event.pageX);
//   x = event.pageX;

//   //  3. adds listener for pointermove
//   gameBoard.addEventListener("pointermove", func2);
// };

// // 1.Adds listener for a click

// gameBoard.addEventListener("pointerdown", func, false);

// // UP

// const squaresPos = [...squares];
// console.log(squaresPos);

// const { sq1, sq2, sq3, sq4 } = squares;
// const row1 = [sq1, sq2, sq3, sq4];
// const { sq5, sq6, sq7, sq8 } = squares;
// const row2 = [sq5, sq6, sq7, sq8];
// const { sq9, sq10, sq11, sq12 } = squares;
// const row3 = [sq9, sq10, sq11, sq12];
// const { sq13, sq14, sq15, sq16 } = squares;
// const row4 = [sq13, sq14, sq15, sq16];

// const funct = (arr) => {
//   if (arr[0]) {
//   }
// };
