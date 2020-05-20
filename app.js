// Make array of objects, where each object is a square

// elem.addEventListener("click", () => {
//   const squery = document.getElementById("s16");
//   squery.classList.add("square-bottom");
//   squery.classList.remove("square");
//   squery.classList.add("up1");

//   setTimeout(() => {
//     squery.classList.toggle("transition");
//   }, 10);

const elem = document.getElementById("anim");
elem.addEventListener("click", () => {
  const squery = document.getElementById("s16");
  // squery.classList.add("square-bottom");
  // squery.classList.remove("square");
  squery.classList.add("up2");
  setTimeout(() => {
    squery.classList.toggle("transition");
  }, 10);
  // squery.classList.add("up2");
  console.log("added class");

  console.log("added transition");
});

const squares = [];
for (let index = 0; index < 16; index++) {
  squares.push({
    id: index + 1,
    value: 0,
    posChange: 0,
  });
}
let isPlaying = false;

// reads squares and updates gameboard accordingly

const updateGameboard = (direction) => {
  console.log("gameboard rendered");

  squares.forEach((square) => {
    const gameSquare = document.getElementById(`s${square.id}`);

    gameSquare.classList.add(direction + square.posChange);
    //get element with that id
    //add class depending on posChange and changeDirection
  });
  // LAST STEP: get all squares, toggle transition
  // resetGameboard / probs setTimeout
  setTimeout(() => {
    squares.forEach((square) => {
      const gameSquare = document.getElementById(`s${square.id}`);

      gameSquare.classList.toggle("transition");
      //get element with that id
      //add class depending on posChange and changeDirection
    });
  }, 10);
};

const resetGameboard = () => {
  // resets the squares objects

  // swaps classes back
  // removes helper classes
  console.log("squares reset");
};

const startGame = () => {
  // Checks which squares are free and adds randomly a number
  addNumber();

  isPlaying = true;

  checkForMovement();
};

const start = document.getElementById("start");
start.addEventListener("click", startGame);

const calcSquares = (a, b, c, d) => {
  if (a.value === b && a.value !== 0) {
    a.value *= 2;
    b.posChange += 1;
    if (c.value === 0 && d.value !== 0) {
      d.posChange += 1;
    }
    if (c.value === d.value) {
      c.value *= 2;
      d.posChange += 1;
    }

    c.posChange += 1;
    d.posChange += 1;
    console.log("run1");
  }

  if (a.value === b.value && a.value === 0) {
    if (c.value === 0 && d.value !== 0) {
      d.posChange += 3;
      console.log("runA");
    }
    if (c.value === d.value && c.value !== 0) {
      c.value *= 2;
      c.posChange += 2;
      d.posChange += 3;
      console.log("runB");
    }
    if (c.value !== 0 && d.value === 0) {
      c.posChange += 2;
      console.log("runC");
    }
    console.log("run2");
  }

  if (a.value !== b.value && a.value !== 0 && b.value !== 0) {
    if (c.value === 0 && d.value !== 0) {
      d.posChange += 1;
    }
    if (c.value === d.value) {
      c.value *= 2;
      d.posChange += 1;
    }
    console.log("run3");
  }

  if (a.value !== b.value && a.value == 0) {
    b.posChange += 1;
    if (c.value === 0 && b.value === d) {
      b.value *= 2;
      d.posChange += 2;
    } else if (d.value !== 0) {
      d.posChange += 1;
    }

    if (b.value === c.value) {
      b.value *= 2;
      c.posChange += 1;
      if (d.value !== 0) {
        d.posChange += 1;
      }
    } else if (c.value === d.value) {
      c.value *= 2;
      d.posChange + 1;
    }
    console.log("run4");
  }
};

// --------------------------

const checkForMovement = () => {
  if (isPlaying) {
    // document.getElementById("start").addEventListener("click", addNumber);

    let pressedDown = false;

    let x;
    let y;

    const diff = {
      left: 0,
      right: 0,
      up: 0,
      down: 0,
    };

    const func3 = () => {
      pressedDown = false;
    };

    const func = () => {
      pressedDown = true;
      gameBoard.addEventListener("pointerup", func3, false);
      console.log(event.pageX);
      x = event.pageX;
      y = event.pageY;

      //  3. adds listener for pointermove
      gameBoard.addEventListener("pointermove", func2);
    };

    // 1.Adds listener for a click
    const gameBoard = document.getElementById("main-block");

    gameBoard.addEventListener("pointerdown", func, false);

    // ////////// checks direction

    // 4. runs func for pointermove
    const func2 = () => {
      // calculates difference between starting point and current point
      console.log("x is : " + x);
      diff.left = x - event.pageX;
      console.log(diff.left);
      diff.right = event.pageX - x;
      console.log(diff.right);

      diff.up = y - event.pageY;
      console.log(diff.up);

      diff.down = event.pageY - y;
      console.log(diff.down);

      if (pressedDown) {
        // returns empty string or first value that reaches 100
        const direction = Object.keys(diff)
          .filter((key) => diff[key] > 100)
          .toString();
        console.log(direction);
        isPlaying = !isPlaying;
        // ---------- RUNS AFTER PLAYER INPUT HAS HAPPENED
        switch (direction) {
          case "left":
            console.log("left");
            // swapSquareClass(direction);

            calcSquares(squares[0], squares[1], squares[2], squares[3]);
            calcSquares(squares[4], squares[5], squares[6], squares[7]);
            calcSquares(squares[8], squares[9], squares[10], squares[11]);
            calcSquares(squares[12], squares[13], squares[14], squares[15]);

            pressedDown = !pressedDown;
            updateGameboard(direction);
            break;
          case "right":
            console.log("right");
            // swapSquareClass(direction);

            calcSquares(squares[3], squares[2], squares[1], squares[0]);
            calcSquares(squares[7], squares[6], squares[5], squares[4]);
            calcSquares(squares[11], squares[10], squares[9], squares[8]);
            calcSquares(squares[15], squares[14], squares[13], squares[12]);
            pressedDown = !pressedDown;
            console.log(squares);

            updateGameboard(direction);
            // updateGameboard(direction);
            break;
          case "up":
            console.log("up");
            // swapSquareClass(direction);

            calcSquares(squares[0], squares[4], squares[8], squares[12]);
            calcSquares(squares[1], squares[5], squares[9], squares[13]);
            calcSquares(squares[2], squares[6], squares[10], squares[14]);
            calcSquares(squares[3], squares[7], squares[11], squares[15]);
            pressedDown = !pressedDown;
            console.log(squares);
            updateGameboard(direction);
            break;
          case "down":
            console.log("down");
            // swapSquareClass(direction);

            calcSquares(squares[12], squares[8], squares[4], squares[0]);
            calcSquares(squares[13], squares[9], squares[5], squares[1]);
            calcSquares(squares[14], squares[10], squares[6], squares[2]);
            calcSquares(squares[15], squares[11], squares[7], squares[3]);
            pressedDown = !pressedDown;
            console.log(squares);
            updateGameboard(direction);
            break;
          default:
            console.log("no move");
            break;
        }

        // ------------------
      } else {
        // stops checking for coords after pointer is lifted
        gameBoard.removeEventListener("pointermove", func2);
        gameBoard.removeEventListener("pointerup", func3, false);
        pressedDown = false;
      }
    };
  }
};

// ------------------------------

//Adds number in free space

const addNumber = () => {
  const emptySquares = squares.map((square) => {
    if (square.value == 0) {
      return square.id;
    }
  });

  console.log(emptySquares);

  const nextSquare =
    emptySquares[Math.floor(Math.random() * Math.floor(emptySquares.length))];

  console.log(nextSquare);

  squares[nextSquare - 1].value = 2;

  const gameSquare = document.getElementById(`s${nextSquare}`);
  gameSquare.textContent = "2";
  console.log("id of square:" + `s${nextSquare}`);

  const x = emptySquares.findIndex((el) => el == nextSquare);
  console.log("index is:" + x);

  emptySquares.splice(x, 1);

  console.log(emptySquares);

  console.log(squares);
};

// swaps square class for animation to work

const swapSquareClass = (direction) => {
  const squares = document.getElementsByClassName("square");
  switch (direction) {
    case "left":
      Array.from(squares).forEach((square) => {
        square.classList.add("square-left");
        square.classList.remove("square");
      });
      break;
    case "right":
      Array.from(squares).forEach((square) => {
        square.classList.add("square-right");
        square.classList.remove("square");
      });
      break;
    case "up":
      Array.from(squares).forEach((square) => {
        square.classList.add("square-up");
        square.classList.remove("square");
      });
      break;
    case "down":
      Array.from(squares).forEach((square) => {
        square.classList.add("square-left");
        square.classList.remove("square");
      });
      break;

    default:
      break;
  }
};
