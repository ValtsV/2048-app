// Make array of objects, where each object is a square

// elem.addEventListener("click", () => {
//   const squery = document.getElementById("s16");
//   squery.classList.add("up1");
//   setTimeout(() => {
//     squery.classList.toggle("transition");
//   }, 10);
  

  const elem = document.getElementById("anim");
  elem.addEventListener("click", () => {
    const squery = document.getElementById("s16");
    squery.classList.add("square-bottom");
    squery.classList.remove("square");
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
    if (a.value === b.value) {
      a.value * 2;
      a.posChange + 0;
      b.posChange + 1;
      c.posChange + 1;
      d.posChange + 1;
      if (c.value === d.value) {
        c.value * 2;
        d.posChange + 1;
      }
    } else if (a.value === c.value && b.value === 0) {
      a.value * 2;
      c.posChange + 2;
      d.posChange + 2;
    } else if (a.value === d.value && b.value === 0 && c.value === 0) {
      a.value * 2;
      d.posChange + 3;
    } else if (b.value === c.value) {
      if (a.value === 0) {
        b.posChange + 1;
        c.posChange + 1;
        d.posChange + 1;
      }
      b.value * 2;
      c.posChange + 1;
      d.posChange + 1;
    } else if (b.value === d.value && c.value === 0) {
      if (a.value === 0) {
        b.posChange + 1;
        c.posChange + 1;
        d.posChange + 1;
      }
      b.value * 2;
      d.posChange + 2;
    } else if (c.value === d.value) {
      if (a.value === 0) {
        b.posChange + 1;
        c.posChange + 1;
        d.posChange + 1;
      }
      if (b.value === 0) {
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
          const dirrection = Object.keys(diff)
            .filter((key) => diff[key] > 100)
            .toString();

          switch (
            dirrection // outputs dirrection
          ) {
            case "left":
              console.log("left");
              swapSquareClass(dirrection);

              calcSquares(squares[0], squares[4], squares[8], squares[12]);
              break;
            case "right":
              console.log("right");
              swapSquareClass(dirrection);
              break;
            case "up":
              console.log("up");
              swapSquareClass(dirrection);
              break;
            case "down":
              console.log("down");
              swapSquareClass(dirrection);
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
});
