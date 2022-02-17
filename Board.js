class Board {
  #grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  #emptyGrid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  constructor() {
    this.bindClicks();
  }

  getBoard() {
    return this.#grid;
  }

  emptyBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        let cell = document.getElementById(
          `row-${rowIndex}-column-${columnIndex}`
        );
        cell.classList.remove("preview-move-red", "preview-move-yellow");
        if (cell.classList.contains("red")) {
          cell.classList.remove("red");
        }
        if (cell.classList.contains("yellow")) {
          cell.classList.remove("yellow");
        }
      }
    }
    this.#grid = this.#emptyGrid;
  }
  drawBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
        if (!this.#grid[rowIndex][columnIndex]) {
          continue;
        }
        const cell =
          this.#grid[rowIndex][columnIndex] === "red" ? "red" : "yellow";
        document
          .getElementById(`row-${rowIndex}-column-${columnIndex}`)
          .classList.add(cell);
      }
    }
  }
  populateBoard() {
    this.emptyBoard();
    for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
        if (!this.#grid[rowIndex][columnIndex]) {
          continue;
        }
        const cell =
          this.#grid[rowIndex][columnIndex] === "red" ? "red" : "yellow";
        document
          .getElementById(`row-${rowIndex}-column-${columnIndex}`)
          .classList.add(cell);
      }
    }
  }
  bindClicks() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const cell = document.getElementById(
          `row-${rowIndex}-column-${columnIndex}`
        );
        cell.addEventListener(
          "click",
          positionClick.bind(null, rowIndex, columnIndex)
        );
      }
    }
  }
  bindHovers() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(
          `row-${rowIndex}-column-${columnIndex}`
        );
        gridPosition.addEventListener(
          "mouseover",
          hoverColumn.bind(null, rowIndex, columnIndex)
        );
      }
    }
  }
  // A grid position was clicked call the game's turn function, redraw and then check for a winner.
  positionClick(rowIndex, columnIndex, event) {
    //rowIndex still required as the position is needed by listener
    takeTurn(columnIndex);
    checkWinner(columnIndex);

    this.populateBoard();
    //const winner = checkWinner();
    if (winner === "red") {
      player1Wins += 1;
    }
    if (winner === "yellow") {
      player2Wins += 1;
    }
    const player1WinsBadge = document.getElementById("player-1-wins");
    player1WinsBadge.innerText = "Wins: " + player1Wins;
    const player2WinsBadge = document.getElementById("player-2-wins");
    player2WinsBadge.innerText = "Wins: " + player2Wins;

    if (winner && winner !== undefined) {
      const winnerNameSpan = document.getElementById("winner-name");

      if (winner === "red") {
        winnerNameSpan.innerText = player1Name;
      }

      if (winner === "yellow") {
        winnerNameSpan.innerText = player2Name;
      }

      const winnerBanner = document.getElementById("winner-display");
      winnerBanner.style.display = "block";
    }
  }
  hoverColumn(rowIndex, columnIndex) {
    // Remove all highlighting
    for (let rowStart = 0; rowStart < 6; rowStart++) {
      for (let columnStart = 0; columnStart < 7; columnStart++) {
        document
          .getElementById(`row-${rowStart}-column-${columnStart}`)
          .classList.remove("preview-move-red", "preview-move-yellow");
      }
    }
    // Highlight next available square
    for (let rowStart = board.length - 1; rowStart >= 0; rowStart--) {
      if (board[rowStart][columnIndex] === null) {
        player1
          ? document
              .getElementById(`row-${rowStart}-column-${columnIndex}`)
              .classList.add("preview-move-red")
          : document
              .getElementById(`row-${rowStart}-column-${columnIndex}`)
              .classList.add("preview-move-yellow");
        break;
      }
    }
  }
}
