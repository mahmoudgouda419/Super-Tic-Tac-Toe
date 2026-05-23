let player = "X";
let activeBoard = null;
let boards = [];
let winners = [];
let gameOver = false;
let scores = JSON.parse(localStorage.getItem("superTTT-scores")) || {
  X: 0,
  O: 0,
};

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
  updateScoreUI();
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
    scores[player]++;

    localStorage.setItem("superTTT-scores", JSON.stringify(scores));

    updateScoreUI();
    gameOver = true;

    markMainBoardWinnerLine(winners);

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

  // at the end of move(), after updateUI() and showStatus()
  if (aiEnabled && player === "O") {
    setTimeout(aiMove, 400);
  }
}

function canMove(board, cell) {
  return (
    !gameOver &&
    !aiBoardLock &&
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
      arr[line[1]] === arr[line[2]],
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

const input = document.querySelector("input");
function showStatus() {
  const xo = document.querySelector(".XO");
  const statusContainer = document.querySelector(".game-status");
  const statusText = statusContainer.querySelector(".status");

  statusText.textContent = "";

  if (gameOver) {
    if (checkWin(winners)) {
      statusText.textContent = `${player} wins!`;
      statusContainer.classList.add("winner");
      statusContainer.classList.remove("draw");
    } else {
      statusText.textContent = "It's a tie!";
      statusContainer.classList.add("draw");
      statusContainer.classList.remove("winner");
    }
  } else {
    let turnText = `${player}'s turn`;
    if (activeBoard !== null) {
      turnText += " - play in highlighted board";
    }
    statusText.textContent = turnText;
    statusContainer.classList.remove("winner", "draw");
  }

  let btn = statusContainer.querySelector(".restart-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.textContent = "Reset";
    btn.className = "restart-btn";
    btn.onclick = reset;
    statusContainer.appendChild(btn);
  }
}

function updateScoreUI() {
  const scoreX = document.querySelector(".scorex");
  const scoreO = document.querySelector(".scoreo");

  scoreX.textContent = `X: ${scores.X}`;
  scoreO.textContent = `O: ${scores.O}`;
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
      "winnerLine",
    );
    const w = box.querySelector(".board-winner");
    if (w) w.remove();
  });

  document.querySelector(".outer-frame").classList.remove("game-over");

  updateUI();
  showStatus();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// =========================================
let themeSwitch = document.querySelector(".game-status .switch .themeSwitch");
let body = document.querySelector("body");

input.addEventListener("change", () => {
  body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

window.onload = () => {
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    input.checked = true;
  }
};

// AI groq
let aiEnabled = false;
let aiBoardLock = false;

function toggleAI() {
  aiEnabled = !aiEnabled;
  let btn = document.getElementById("aiBtn");
  btn.textContent = aiEnabled ? "Play Vs AI: ON" : "Play Vs AI: OFF";
  btn.classList.toggle("on", aiEnabled);
  if (aiEnabled) reset();
}
async function aiMove() {
  if (!aiEnabled || gameOver || player !== "O" || aiBoardLock) return;
  aiBoardLock = true;
  const statusText = document.querySelector(".game-status .status");
  const prev = statusText.textContent;
  statusText.textContent = "AI thinking.......";
  const boardStr = boards
    .map(
      (b, bi) =>
        b.map((c) => c || ".").join("") +
        (winners[bi] ? `[${winners[bi]}]` : ""),
    )
    .join(" | ");
  const allowedMoves = [];
  for (let b = 0; b < 9; b++) {
    if (winners[b]) continue;
    if (activeBoard !== null && activeBoard !== b) continue;
    for (let c = 0; c < 9; c++) {
      if (!boards[b][c]) allowedMoves.push(`${b},${c}`);
    }
  }
  const prompt = `You are playing Super Tic-Tac-Toe as O against a human X.
9 mini-boards (index 0-8), each with 9 cells (0-8). '.' = empty, [X/O/tie] = claimed board.
State: ${boardStr}
Macro wins: ${
    winners
      .map((w, i) => (w ? `board${i}=${w}` : ""))
      .filter(Boolean)
      .join(", ") || "none"
  }
${activeBoard !== null ? `MUST play in board ${activeBoard}.` : "Can play in any unclaimed board."}
Valid moves: ${allowedMoves.join(" ")}
Reply with ONLY board,cell e.g.: 4,2`;
  let chosenBoard = -1,
    chosenCell = -1;
  const targetBoards = [];
  if (activeBoard === null) {
    for (let i = 0; i < 9; i++) {
      if (!winners[i]) {
        targetBoards.push(i);
      }
    }
  } else {
    targetBoards.push(activeBoard);
  }
  for (let b of targetBoards) {
    let winMove = findWinMove(boards[b], "O");
    if (winMove !== null) {
      chosenBoard = b;
      chosenCell = winMove;
      break;
    }
  }

  if (chosenBoard === -1) {
    for (let b of targetBoards) {
      let blockMove = findWinMove(boards[b], "X");
      if (blockMove !== null) {
        chosenBoard = b;
        chosenCell = blockMove;
        break;
      }
    }
  }
  if (chosenBoard === -1) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            temperature: 0.3,
            max_tokens: 10,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        },
      );
      const data = await res.json();
      const text = data.choices[0].message.content.trim();
      console.log(text);
      const m = text.match(/(\d+)\s*,\s*(\d+)/);
      if (m) {
        chosenBoard = +m[1];
        chosenCell = +m[2];
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!allowedMoves.includes(`${chosenBoard},${chosenCell}`)) {
    const pick =
      allowedMoves[Math.floor(Math.random() * allowedMoves.length)].split(",");
    chosenBoard = +pick[0];
    chosenCell = +pick[1];
  }
  aiBoardLock = false;
  statusText.textContent = prev;
  const cells = document.querySelectorAll(".inner-box");
  const elem = cells[chosenBoard * 9 + chosenCell];
  move(chosenBoard, chosenCell, elem);
}
function findWinMove(boardArr, symbol) {
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
    const [a, b, c] = line;
    const values = [boardArr[a], boardArr[b], boardArr[c]];
    const count = values.filter((v) => v === symbol).length;
    const emptyIndex = line.find((i) => boardArr[i] === "");
    if (count === 2 && emptyIndex !== undefined) {
      return emptyIndex;
    }
  }
  return null;
}

// reset the score
function resetScore() {
  scores.X = 0;
  scores.O = 0;

  localStorage.setItem("superTTT-scores", JSON.stringify(scores));

  updateScoreUI();
}
