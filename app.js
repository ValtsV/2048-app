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
  console.log("gameboard updated");

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

const renderGameboard = (direction) => {
  squares.map((el) => {
    const x = document.getElementById(`s${el.id}`);
    x.textContent = el.value;
    x.className = "square";

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
  setTimeout(addNumber, 900);
  // resets the squares objects

  // swaps classes back
  // removes helper classes
  console.log("squares reset");

  console.log(squares);
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
  const y = [a, b, c, d];

  const z = [];
  y.forEach((el) => z.push(el.value));

  let count = 0;

  const x = [];
  y.forEach((el) => {
    el.posChange += count;
    if (el.value === 0) {
      count++;
    } else {
      x.push(el);
    }
  });

  console.log(y);
  console.log(x);
  let count2 = 0;
  for (let i = 0; i < x.length - 1; i++) {
    if (x[i].value === 0) {
      x[i + 1].posChange += 1;
    } else if (x[i].value === x[i + 1].value) {
      x[i].value *= 2;
      x[i + 1].value = 0;
      x[i + 1].posChange = x[i + 1].posChange + 1 + count2;
      count2++;
    }

    // else {
    //   x[i + 1].posChange += x[i].posChange;
    // }
  }

  for (let i = 0; i < z.length; i++) {
    if (z[i] === 0) {
      y[i].posChange = 0;
    }
  }
  console.log(y);
  console.log(z);
  const p = [0, 0, 0, 0];
  const t = y.filter((el) => el.value > 0);
  t.forEach((el, index) => {
    p[index] = el.value;
  });

  console.log(p);
  for (let i = 0; i < y.length; i++) {
    y[i].value = p[i];
  }
  console.log(y);

  a = y[0];
  b = y[1];
  c = y[2];
  d = y[3];
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
      diff.left = x - event.pageX;
      diff.right = event.pageX - x;

      diff.up = y - event.pageY;

      diff.down = event.pageY - y;

      if (pressedDown) {
        // returns empty string or first value that reaches 100
        const direction = Object.keys(diff)
          .filter((key) => diff[key] > 100)
          .toString();
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
            // console.log(squares);
            updateGameboard(direction);
            setTimeout(() => {
              renderGameboard(direction);
            }, 900);
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
            }, 900);
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
            }, 900);
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
            }, 900);
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
