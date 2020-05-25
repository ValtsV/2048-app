// Make array of objects
// Each object stores square ID, its value and ->
// how much positions it will travel on next animation

const squares = [];
for (let i = 0; i < 16; i++) {
  squares.push({
    id: i + 1,
    value: 0,
    posChange: 0,
  });
}

const startGame = () => {
  addNumber();

  checkForMovement();

  start.removeEventListener("click", startGame);
  start.textContent = "Reset";
  start.addEventListener("click", resetGame);
};

const resetGame = () => {
  for (let i = 0; i < 16; i++) {
    squares[i] = {
      id: i + 1,
      value: 0,
      posChange: 0,
    };
  }

  renderGameboard();
};

const start = document.getElementById("start");
start.addEventListener("click", startGame);

// makes moving animation

const updateGameboard = (direction) => {
  // adds class with new position to squares, then toggles animation
  squares.forEach((square) => {
    const gameSquare = document.getElementById(`s${square.id}`);

    gameSquare.classList.add(direction + square.posChange);
  });
  setTimeout(() => {
    squares.forEach((square) => {
      const gameSquare = document.getElementById(`s${square.id}`);

      gameSquare.classList.toggle("transition");
    });
  }, 10);
};

// renders new gameboard after moving animation ends

const renderGameboard = () => {
  squares.map((el) => {
    const x = document.getElementById(`s${el.id}`);
    x.textContent = el.value;
    x.className = "square unselectable";

    el.posChange = 0;

    switch (el.value) {
      case 2:
        x.classList.add("red");
        break;
      case 4:
        x.classList.add("yellow");
        break;
      case 8:
        x.classList.add("green");
        break;
      case 16:
        x.classList.add("blue");
        break;
      case 32:
        x.classList.add("teal");
        break;
      case 64:
        x.classList.add("pink");
        break;

      default:
        break;
    }
  });

  setTimeout(addNumber, 300);
  console.log("adds number 1");
};

const calcSquares = (a, b, c, d) => {
  const squareElements = [a, b, c, d];

  const oldSquareValues = [];
  squareElements.forEach((el) => oldSquareValues.push(el.value)); // save original values

  // takes elements with value > 0
  // zeros counts how many zeros how been removed and adds that to posChange of next elements

  let zeros = 0;

  // nonZV - non Zero Values

  const nonZV = [];
  squareElements.forEach((el) => {
    el.posChange += zeros;
    if (el.value === 0) {
      zeros++;
    } else {
      nonZV.push(el);
    }
  });

  // calculates new square values and posChanges

  // counter for how many times 0 value have been moved to the back
  let stepBackCount = 0;

  for (let i = 0; i < nonZV.length - 1 - stepBackCount; i++) {
    // checks if 2 elements can be summed
    // if yes, sets 2nd element value to zero to move it back in next loop

    if (nonZV[i].value === nonZV[i + 1].value) {
      nonZV[i].value *= 2;
      nonZV[i + 1].value = 0;
      nonZV[i + 1 + stepBackCount].posChange += 1;
    }
    // reforms array by moving 0 value to the back
    else if (nonZV[i].value === 0) {
      for (let j = i; j < nonZV.length - 1 - stepBackCount; j++) {
        nonZV[j].value = nonZV[j + 1].value;
        nonZV[j + 1].value = 0;
        nonZV[j + 1 + stepBackCount].posChange += 1;
      }

      stepBackCount++;
      // sets loop to iterate again the same element that now isnt 0
      i--;
    }
  }

  // resets posChange to 0 for elements with starting value 0

  for (let i = 0; i < oldSquareValues.length; i++) {
    if (oldSquareValues[i] === 0) {
      squareElements[i].posChange = 0;
    }
  }

  //  pushes none zero values to the start

  for (let i = 0; i < squareElements.length; i++) {
    if (i < nonZV.length) {
      squareElements[i].value = nonZV[i].value;
    } else {
      squareElements[i].value = 0;
    }
  }
  console.log(squareElements);

  a = squareElements[0];
  b = squareElements[1];
  c = squareElements[2];
  d = squareElements[3];
};

// --------------------------

const checkForMovement = () => {
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
    diff.left = x - event.pageX;
    diff.right = event.pageX - x;

    diff.up = y - event.pageY;

    diff.down = event.pageY - y;

    if (pressedDown) {
      // returns empty string or first value that reaches 100
      const direction = Object.keys(diff)
        .filter((key) => diff[key] > 100)
        .toString();
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
          // console.log(squares);
          updateGameboard(direction);
          setTimeout(() => {
            renderGameboard(direction);
          }, 80);
          break;
        case "right":
          console.log("right");
          // swapSquareClass(direction);

          calcSquares(squares[3], squares[2], squares[1], squares[0]);
          calcSquares(squares[7], squares[6], squares[5], squares[4]);
          calcSquares(squares[11], squares[10], squares[9], squares[8]);
          calcSquares(squares[15], squares[14], squares[13], squares[12]);
          pressedDown = !pressedDown;
          // console.log(squares);

          updateGameboard(direction);
          // updateGameboard(direction);
          setTimeout(() => {
            renderGameboard(direction);
          }, 80);
          break;
        case "up":
          console.log("up");
          // swapSquareClass(direction);

          calcSquares(squares[0], squares[4], squares[8], squares[12]);
          calcSquares(squares[1], squares[5], squares[9], squares[13]);
          calcSquares(squares[2], squares[6], squares[10], squares[14]);
          calcSquares(squares[3], squares[7], squares[11], squares[15]);
          pressedDown = !pressedDown;
          // console.log(squares);
          updateGameboard(direction);
          setTimeout(() => {
            renderGameboard(direction);
          }, 80);
          break;
        case "down":
          console.log("down");
          // swapSquareClass(direction);

          calcSquares(squares[12], squares[8], squares[4], squares[0]);
          calcSquares(squares[13], squares[9], squares[5], squares[1]);
          calcSquares(squares[14], squares[10], squares[6], squares[2]);
          calcSquares(squares[15], squares[11], squares[7], squares[3]);
          pressedDown = !pressedDown;
          // console.log(squares);
          updateGameboard(direction);
          setTimeout(() => {
            renderGameboard(direction);
          }, 80);
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
};
// ------------------------------

//Adds number in free space

const addNumber = () => {
  console.log(squares);
  // const emptySquares = squares.map((square) => {
  //   if (square.value == 0) {
  //     return square.id;
  //   }
  // });

  const emptySquares = [];
  squares.forEach((el) => {
    if (el.value === 0) {
      emptySquares.push(el.id);
    }
  });

  console.log(emptySquares);

  const nextSquare =
    emptySquares[Math.floor(Math.random() * Math.floor(emptySquares.length))];

  console.log(nextSquare);

  squares[nextSquare - 1].value = 2;

  const gameSquare = document.getElementById(`s${nextSquare}`);
  gameSquare.textContent = "2";
  gameSquare.classList.add("red");
  console.log("id of square:" + `s${nextSquare}`);

  const x = emptySquares.findIndex((el) => el == nextSquare);
  console.log("index is:" + x);

  emptySquares.splice(x, 1);

  console.log(emptySquares);

  console.log(squares);
};
