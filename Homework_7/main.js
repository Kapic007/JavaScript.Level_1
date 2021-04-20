document.addEventListener("DOMContentLoaded", () => {
  var BOARDWIDTH = 10;
  var BOARDHEIGHT = 20;
  var BOARDSIZE = BOARDWIDTH * BOARDHEIGHT;

  var FIGURES = [
    {
      cells: [0, BOARDWIDTH, BOARDWIDTH * 2, BOARDWIDTH * 2 + 1],
      width: 3,
      color: "lFigure",
    },
    {
      cells: [1, BOARDWIDTH + 1, BOARDWIDTH * 2, BOARDWIDTH * 2 + 1],
      width: 3,
      color: "jFigure",
    },
    {
      cells: [0, 1, BOARDWIDTH + 1, BOARDWIDTH + 2],
      width: 3,
      color: "zFigure",
    },
    {
      cells: [1, 2, BOARDWIDTH, BOARDWIDTH + 1],
      width: 3,
      color: "sFigure",
    },
    {
      cells: [1, BOARDWIDTH, BOARDWIDTH + 1, BOARDWIDTH * 2 + 1],
      width: 3,
      color: "tFigure",
    },
    {
      cells: [0, 1, BOARDWIDTH, BOARDWIDTH + 1],
      width: 2,
      color: "oFigure",
    },
    {
      cells: [1, BOARDWIDTH + 1, BOARDWIDTH * 2 + 1, BOARDWIDTH * 3 + 1],
      width: 4,
      color: "iFigure",
    },
  ];

  var nextBlock = document.getElementById("next");

  //получаем ширину блока (зависимо от размеров наибольшей фигуры)
  function nextBlockWidth() {
    let max = 0;
    FIGURES.forEach((elem) =>
      elem["width"] > max ? (max = elem["width"]) : 0
    );
    return max;
  }

  nextBlock.style.width = 30 * nextBlockWidth() + "px";
  nextBlock.style.height = 30 * nextBlockWidth() + "px";
  var nextBlockSize = nextBlockWidth() ** 2;

  //инициализируем область вывода фигуры
  function initNextBlock() {
    nextBlock.innerHTML = "";
    for (let i = 0; i < nextBlockSize; i++) {
      const cell = document.createElement("div");
      cell.className = "next_cell";
      nextBlock.appendChild(cell);
    }
  }
  initNextBlock();

  //получаем NodeList ячеек
  var nextBlockCells = document.querySelectorAll(".next_cell");

  //функция рендера следующей фигуры
  function showNextFigure() {
    //обнуляем стили ячеек (поскольку их не много, то сразу всех)
    nextBlockCells.forEach((cell) => (cell.className = "next_cell"));
    for (let i = 0; i < gameBoard.nextFigure.length; i++) {
      //переводим координаты фигуры в систему блока 4*4
      let idx = gameBoard.nextFigure[i];
      idx =
        idx < 10
          ? idx
          : idx < 20
          ? idx - 10 + nextBlockWidth()
          : idx < 30
          ? idx - 20 + nextBlockWidth() * 2
          : idx > 30
          ? idx - 30 + nextBlockWidth() * 3
          : 0;
      nextBlockCells[idx].classList.add(gameBoard.nextColor);
    }
  }

  var gameFinished = false;
  var gamePaused = false;
  var gameInFocus = false;
  var stepTimer;

  var boardElement = document.getElementById("board");
  boardElement.style.width = 30 * BOARDWIDTH + "px";
  boardElement.style.height = 30 * BOARDHEIGHT + "px";

  var gameBoard = {
    cells: [],
    finishedLines: 0,
    score: 0,
    stepDelay: 1000,
    currentFigure: null,
    currentFigureWidth: 0,
    currentColor: "",
    nextFigure: null,
    nextFigureWidth: 0,
    nextColor: "",
    currentPosition: 0,
    nextPosition: 0,
  };

  // Вывод текстовых полей с состоянием игры
  var scoreElement = document.getElementById("score");
  var linesElement = document.getElementById("lines");
  function renderCounters() {
    scoreElement.innerHTML = "Счет игры: " + gameBoard.score;
    linesElement.innerHTML = "Собрано линий: " + gameBoard.finishedLines;
  }

  // Функция завершения игры
  function gameOver() {
    console.log("Взрыв! Вы проиграли!");
    boardElement.style.borderColor = "red";
    gameFinished = true;
  }

  function pauseHandler() {
    if (gamePaused) {
      if (gameFinished) {
        gameFinished = false;
        initBoard();
      }
      stepTimer = setTimeout(gameStep, gameBoard.stepDelay, true);
      boardElement.style.borderColor = "#dcd6bc";
      console.log("Игра возобновлена");
      gameBoard.cells.forEach(
        (cell) =>
          (cell.element.className = cell.haveBlock ? cell.color : "closed")
      );
      drawFigure();
      gamePaused = false;
      nextBlock.style.visibility = "visible";
    } else {
      clearTimeout(stepTimer);
      boardElement.style.borderColor = "green";
      gameBoard.cells.forEach((cell) => (cell.element.className = "closed"));
      console.log("Игра на паузе");
      gamePaused = true;
      nextBlock.style.visibility = "hidden";
    }
  }

  function undrawFigure() {
    if (gameBoard.currentFigure) {
      gameBoard.currentFigure.forEach((cellPos) => {
        gameBoard.cells[gameBoard.currentPosition + cellPos].element.className =
          "closed";
      });
    }
  }

  function drawFigure() {
    if (gameBoard.currentFigure) {
      gameBoard.currentFigure.forEach((cellPos) => {
        gameBoard.cells[gameBoard.currentPosition + cellPos].element.className =
          gameBoard.currentColor;
      });
    }
  }

  function canMove(newPosition) {
    var result = true;
    var maxXOld = -1,
      maxXNew = -1;
    var minXOld = BOARDWIDTH,
      minXNew = BOARDWIDTH;
    gameBoard.currentFigure.forEach((cellPos) => {
      if (newPosition + cellPos < 0 || newPosition + cellPos >= BOARDSIZE) {
        result = false;
      } else if (gameBoard.cells[newPosition + cellPos].haveBlock) {
        result = false;
      }
      minXOld = Math.min(
        minXOld,
        (gameBoard.currentPosition + cellPos) % BOARDWIDTH
      );
      minXNew = Math.min(minXNew, (newPosition + cellPos) % BOARDWIDTH);
      maxXOld = Math.max(
        maxXOld,
        (gameBoard.currentPosition + cellPos) % BOARDWIDTH
      );
      maxXNew = Math.max(maxXNew, (newPosition + cellPos) % BOARDWIDTH);
    });
    if (
      Math.abs(minXOld - minXNew) > 1 ||
      Math.abs(maxXOld - maxXNew) > 1 ||
      Math.abs(maxXNew - minXNew) > 4
    ) {
      result = false;
    }
    return result;
  }

  function getFullLines() {
    var result = [];

    for (var i = 0; i < BOARDHEIGHT; i++) {
      var lineEmpty = true;
      for (var j = 0; j < BOARDWIDTH; j++) {
        if (!gameBoard.cells[i * BOARDWIDTH + j].haveBlock) {
          lineEmpty = false;
        }
      }
      if (lineEmpty) {
        result.push(i);
      }
    }
    return result;
  }

  function gameStep(isDown) {
    clearTimeout(stepTimer);
    if (canMove(gameBoard.nextPosition)) {
      undrawFigure();
      gameBoard.currentPosition = gameBoard.nextPosition;
      gameBoard.nextPosition += BOARDWIDTH;
      drawFigure();
    } else if (isDown) {
      // Фиксация фигуры и запуск следующей
      gameBoard.currentFigure.forEach((cellPos) => {
        gameBoard.cells[gameBoard.currentPosition + cellPos].haveBlock = true;
        gameBoard.cells[gameBoard.currentPosition + cellPos].color =
          gameBoard.currentColor;
      });
      gameBoard.score += gameBoard.currentFigure.length;
      var fullLines = getFullLines();
      fullLines.forEach((line) => {
        for (var i = line * BOARDWIDTH - 1; i >= 0; i--) {
          gameBoard.cells[i + BOARDWIDTH].haveBlock =
            gameBoard.cells[i].haveBlock;
          gameBoard.cells[i + BOARDWIDTH].color = gameBoard.cells[i].color;
          gameBoard.cells[i + BOARDWIDTH].element.className =
            gameBoard.cells[i].color;
        }
      });
      for (var i = 0; i < fullLines.length * BOARDWIDTH; i++) {
        gameBoard.cells[i].haveBlock = false;
        gameBoard.cells[i].color = "";
        gameBoard.cells[i].element.className = "closed";
      }
      if (fullLines.length > 0) {
        gameBoard.score += Math.pow(2, fullLines.length - 1) * 10;
      }
      gameBoard.finishedLines += fullLines.length;
      renderCounters();
      gameBoard.stepDelay = Math.max(100, 1000 - 10 * gameBoard.finishedLines);
      setNewFigure();
      if (!canMove(gameBoard.currentPosition)) {
        gameOver(false);
      }
    }
    if (!gameFinished) {
      stepTimer = setTimeout(gameStep, gameBoard.stepDelay, true);
    }
  }

  function moveFigure(position, isDown) {
    if (canMove(position)) {
      gameBoard.nextPosition = position;
      gameStep(isDown);
    }
  }

  function rotateFigure() {
    var oldFigure = gameBoard.currentFigure;

    undrawFigure();
    gameBoard.nextPosition = gameBoard.currentPosition;
    gameBoard.currentFigure = gameBoard.currentFigure.map((cellPos) => {
      var x = cellPos % BOARDWIDTH;
      var y = Math.floor(cellPos / BOARDWIDTH);

      return x * BOARDWIDTH + gameBoard.currentFigureWidth - 1 - y;
    });
    if (!canMove(gameBoard.currentPosition)) {
      gameBoard.currentFigure = oldFigure;
    }
    gameStep();
  }

  function keyHandler(event) {
    if (gameInFocus) {
      // console.log(event.key, event.code);
      switch (event.code) {
        case "ArrowLeft":
          moveFigure(gameBoard.currentPosition - 1);
          event.preventDefault();
          break;
        case "ArrowRight":
          moveFigure(gameBoard.currentPosition + 1);
          event.preventDefault();
          break;
        case "ArrowUp":
          rotateFigure();
          event.preventDefault();
          break;
        case "ArrowDown":
          moveFigure(gameBoard.currentPosition + BOARDWIDTH, true);
          event.preventDefault();
          break;
        case "KeyP":
          pauseHandler();
          event.preventDefault();
          break;
      }
    }
  }

  function setNewFigure() {
    if (!gameBoard.currentFigure) {
      gameBoard.currentFigureNumber = Math.floor(
        Math.random() * FIGURES.length
      );
      setNextFigure();
    } else {
      gameBoard.currentFigureNumber = gameBoard.nextFigureNumber;
      setNextFigure();
    }
    gameBoard.currentFigure = FIGURES[gameBoard.currentFigureNumber].cells;
    gameBoard.currentColor = FIGURES[gameBoard.currentFigureNumber].color;
    gameBoard.currentFigureWidth = FIGURES[gameBoard.currentFigureNumber].width;
    gameBoard.currentPosition = 4;
    gameBoard.nextPosition = gameBoard.currentPosition;
    showNextFigure();
  }

  //генерируем следующую фигуру
  function setNextFigure() {
    gameBoard.nextFigureNumber = Math.floor(Math.random() * FIGURES.length);
    gameBoard.nextFigure = FIGURES[gameBoard.nextFigureNumber].cells;
    gameBoard.nextColor = FIGURES[gameBoard.nextFigureNumber].color;
    gameBoard.nextFigureWidth = FIGURES[gameBoard.nextFigureNumber].width;
  }

  function initBoard() {
    // Очищаем поле на странице
    boardElement.innerHTML = "";

    // Создаем поле
    gameBoard.cells = [];
    for (var i = 0; i < BOARDSIZE; i++) {
      const cell = document.createElement("div");

      // cell.setAttribute('index', i);
      cell.className = "closed";
      // gameBoard.closedCellsNum++;

      boardElement.appendChild(cell);

      gameBoard.cells[i] = {
        element: cell,
        index: i,
        haveBlock: false,
        color: "",
      };
    }

    boardElement.addEventListener("click", pauseHandler);
    document.addEventListener("keydown", keyHandler);
    boardElement.addEventListener("mouseenter", () => (gameInFocus = true));
    boardElement.addEventListener("mouseleave", () => (gameInFocus = false));

    gameBoard.finishedLines = 0;
    gameBoard.score = 0;
    gameBoard.stepDelay = 1000;
    setNewFigure();
    // Выводим счетчики
    renderCounters();
  }

  initBoard();

  pauseHandler();
});
