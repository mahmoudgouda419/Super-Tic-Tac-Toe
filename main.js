let player = "X";
let activeBoard = null;
let boards = [];
let winners = [];
let gameOver = false;

for (let i = 0; i < 9; i++) {
  boards[i] = ["", "", "", "", "", "", "", "", ""];
  winners[i] = "";
}

function init() {
  const cells = document.querySelectorAll(".inner-box");
  cells.forEach((cell, idx) => {
    cell.onclick = () => move(Math.floor(idx / 9), idx % 9, cell);
  });
  updateUI();
  showStatus();
}

function move(board, cell, elem) {
  if (!canMove(board, cell)) return;

  boards[board][cell] = player;
  elem.classList.add("taken");
  animateText(elem, player);

  if (checkWin(boards[board])) {
    winners[board] = player;
    markWon(board, player);
  } else if (boards[board].every((c) => c)) {
    winners[board] = "tie";
    markTie(board);
  }

  if (checkWin(winners)) {
    gameOver = true;
    // Mark the winning line on the main board
    markMainBoardWinnerLine(winners);
    // Add game-over class to outer frame for final winner line styling
    document.querySelector(".outer-frame").classList.add("game-over");
    showStatus();
    return;
  }

  if (winners.every((w) => w)) {
    gameOver = true;
    document.querySelector(".outer-frame").classList.add("game-over");
    showStatus();
    return;
  }

  activeBoard = winners[cell] ? null : cell;
  player = player === "X" ? "O" : "X";
  updateUI();
  showStatus();
}

function canMove(board, cell) {
  return (
    !gameOver &&
    !boards[board][cell] &&
    !winners[board] &&
    (activeBoard === null || board === activeBoard)
  );
}

function checkWin(arr) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return lines.some(
    (line) =>
      arr[line[0]] &&
      arr[line[0]] === arr[line[1]] &&
      arr[line[1]] === arr[line[2]]
  );
}

function getWinningLine(arr) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    if (
      arr[line[0]] &&
      arr[line[0]] === arr[line[1]] &&
      arr[line[1]] === arr[line[2]]
    ) {
      return line;
    }
  }
  return null;
}

function markWon(board, winner) {
  console.log(`Marking board ${board + 1} as won by ${winner}`);
  const boxes = document.querySelectorAll(".box");
  const box = boxes[board];
  box.classList.add("won", `won-${winner.toLowerCase()}`);

  // Find and mark the winning line
  const winningLine = getWinningLine(boards[board]);
  if (winningLine) {
    const innerBoxes = box.querySelectorAll(".inner-box");
    winningLine.forEach((cellIndex) => {
      innerBoxes[cellIndex].classList.add("winnerLine");
    });
  }

  const symbol = document.createElement("div");
  symbol.className = "board-winner";
  symbol.textContent = winner;
  // box.appendChild(symbol);
}

function markMainBoardWinnerLine(winnersArray) {
  const winningLine = getWinningLine(winnersArray);
  if (winningLine) {
    const boxes = document.querySelectorAll(".box");
    winningLine.forEach((boardIndex) => {
      boxes[boardIndex].classList.add("winnerLine");
    });
  }
}

function markTie(board) {
  document.querySelectorAll(".box")[board].classList.add("draw");
}

function updateUI() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box, i) => {
    box.classList.remove("active", "inactive");
    if (activeBoard === null) {
      if (!winners[i]) box.classList.add("active");
    } else {
      if (i === activeBoard && !winners[i]) {
        box.classList.add("active");
      } else {
        box.classList.add("inactive");
      }
    }
  });
}

function showStatus() {
  const xo = document.querySelector(".XO");
  let status = document.querySelector(".game-status");
  if (status) status.remove();

  status = document.createElement("div");
  status.className = "game-status";

  if (gameOver) {
    if (checkWin(winners)) {
      status.textContent = `${player} wins!`;
      status.classList.add("winner");
    } else {
      status.textContent = "It's a tie!";
      status.classList.add("draw");
    }
  } else {
    status.textContent = `${player}'s turn`;
    if (activeBoard !== null) {
      status.textContent += " - play in highlighted board";
    }
  }

  const btn = document.createElement("button");
  btn.textContent = "Reset";
  btn.className = "restart-btn";
  btn.onclick = reset;
  status.appendChild(btn);

  xo.insertBefore(status, xo.firstChild);
  // document.body.insertBefore(status, document.body.firstChild);
}

function animateText(elem, text) {
  elem.textContent = "";
  elem.style.opacity = "0";

  setTimeout(() => {
    elem.style.opacity = "1";
    elem.textContent = text;
    elem.classList.add("writing");

    setTimeout(() => {
      elem.classList.remove("writing");
    }, 300);
  }, 50);
}

function reset() {
  player = "X";
  activeBoard = null;
  gameOver = false;

  for (let i = 0; i < 9; i++) {
    boards[i] = ["", "", "", "", "", "", "", "", ""];
    winners[i] = "";
  }

  document.querySelectorAll(".inner-box").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "winnerLine");
  });

  document.querySelectorAll(".box").forEach((box) => {
    box.classList.remove(
      "won",
      "won-x",
      "won-o",
      "draw",
      "active",
      "inactive",
      "winnerLine"
    );
    const w = box.querySelector(".board-winner");
    if (w) w.remove();
  });

  // Remove game-over class from outer frame
  document.querySelector(".outer-frame").classList.remove("game-over");

  updateUI();
  showStatus();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
