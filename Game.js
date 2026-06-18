// ===================================
// Tic Tac Toe — Game Logic
// ===================================

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game");
const msgOverlay = document.querySelector("#msg-overlay");
const msgEyebrow = document.querySelector("#msg-eyebrow");
const msg = document.querySelector("#msg");
const turnIndicator = document.querySelector("#turn-indicator");
const turnDot = turnIndicator.querySelector(".turn-dot");
const turnText = document.querySelector("#turn-text");
const scoreXEl = document.querySelector("#score-x");
const scoreOEl = document.querySelector("#score-o");
const scoreDrawEl = document.querySelector("#score-draw");

let turnIsX = true; // true => X's turn, false => O's turn
let gameOver = false;

const scores = { X: 0, O: 0, draw: 0 };

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const updateTurnIndicator = () => {
    if (turnIsX) {
        turnDot.classList.remove("o-dot");
        turnText.textContent = "Player X's turn";
    } else {
        turnDot.classList.add("o-dot");
        turnText.textContent = "Player O's turn";
    }
};

const placeMark = (box) => {
    const mark = turnIsX ? "X" : "O";
    box.textContent = mark;
    box.classList.add(turnIsX ? "mark-x" : "mark-o");
    box.disabled = true;
    turnIsX = !turnIsX;
    updateTurnIndicator();
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
        box.classList.remove("mark-x", "mark-o", "win-cell");
    });
};

const highlightWin = (pattern) => {
    pattern.forEach((index) => boxes[index].classList.add("win-cell"));
};

const updateScoreboard = () => {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.draw;
};

const showOverlay = (eyebrowText, message) => {
    msgEyebrow.textContent = eyebrowText;
    msg.textContent = message;
    msgOverlay.classList.remove("hide");
};

const showWinner = (winner, pattern) => {
    gameOver = true;
    scores[winner] += 1;
    updateScoreboard();
    highlightWin(pattern);
    disableBoxes();
    showOverlay("Game Over", `Player ${winner} wins!`);
};

const showDraw = () => {
    gameOver = true;
    scores.draw += 1;
    updateScoreboard();
    disableBoxes();
    showOverlay("Game Over", "It's a draw!");
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].textContent;
        const valB = boxes[b].textContent;
        const valC = boxes[c].textContent;

        if (valA && valA === valB && valB === valC) {
            showWinner(valA, pattern);
            return;
        }
    }

    const isBoardFull = Array.from(boxes).every((box) => box.textContent !== "");
    if (isBoardFull) {
        showDraw();
    }
};

const resetBoard = () => {
    turnIsX = true;
    gameOver = false;
    enableBoxes();
    updateTurnIndicator();
    msgOverlay.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.textContent !== "") return;
        placeMark(box);
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetBoard);
resetBtn.addEventListener("click", resetBoard);

// Initial state
updateTurnIndicator();
updateScoreboard();