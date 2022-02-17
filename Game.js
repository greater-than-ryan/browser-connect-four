class Game {
  #state = true;
  #winner = "nobody";
  #players = [];
  #resetButton = document.getElementById("reset-button");
  #player1SaveNameBtn = document.getElementById("player-1-save-name-btn");
  #player2SaveNameBtn = document.getElementById("player-2-save-name-btn");

  constructor(name) {
    this.name = name;
    this.#resetButton.addEventListener("click", resetClick);
    this.#player1SaveNameBtn.addEventListener("click", player1SaveName);
    this.#player2SaveNameBtn.addEventListener("click", player2SaveName);
  }

  createPlayers(name, color, turn) {
    this.#players.push(new Player(name, color, turn));
  }

  switchPlayers() {
    for (let player of this.players) {
      player.turn = player.turn === true ? false : true;
    }
  }
  gameOver() {
    this.#state = false;
  }

  resetClick(event) {
    resetGame();
    emptyBoard();
  }

  resetGame(board) {
    board.#grid = board.#emptyGrid;
    this.switchPlayers();
    board.emptyBoard();
    const winnerNameSpan = document.getElementById("winner-name");
    winnerNameSpan.innerText = "";
    const winnerBanner = document.getElementById("winner-display");
    winnerBanner.style.display = "None";
  }
  takeTurn(board, columnIndex) {
    for (let rowIndex = board.length - 1; rowIndex >= 0; rowIndex--) {
      console.log(rowIndex);
      if (board[rowIndex][columnIndex] === null) {
        if (player1) {
          board[rowIndex][columnIndex] = "red";
          player1 = false;
          player2 = true;
          break;
        } else if (player2) {
          board[rowIndex][columnIndex] = "yellow";
          player1 = true;
          player2 = false;
          break;
        }
      }
    }
  }
  checkWinner(board) {
    // Get board measurements
    const height = board.length;
    const width = board[0].length;
    // iterate rows
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      // iterate columns
      for (let columnIndex = 0; columnIndex < width; columnIndex++) {
        let player = board[rowIndex][columnIndex];
        // Skip to next iteration if no token
        if (player === null) {
          continue;
        }
        if (
          columnIndex + 3 < width &&
          player == board[rowIndex][columnIndex + 1] && // look right
          player == board[rowIndex][columnIndex + 2] &&
          player == board[rowIndex][columnIndex + 3]
        ) {
          this.#winner = player;
          return player;
        }
        // we don't need to go left because we scan the whole board from the right
        if (rowIndex + 3 < height) {
          if (
            player == board[rowIndex + 1][columnIndex] && // look up
            player == board[rowIndex + 2][columnIndex] &&
            player == board[rowIndex + 3][columnIndex]
          ) {
            this.#winner = player;
            return player;
          }
          if (
            columnIndex + 3 < width &&
            player == board[rowIndex + 1][columnIndex + 1] && // look up & right
            player == board[rowIndex + 2][columnIndex + 2] &&
            player == board[rowIndex + 3][columnIndex + 3]
          ) {
            this.#winner = player;
            return player;
          }
          if (
            columnIndex - 3 >= 0 &&
            player == board[rowIndex + 1][columnIndex - 1] && // look up & left
            player == board[rowIndex + 2][columnIndex - 2] &&
            player == board[rowIndex + 3][columnIndex - 3]
          ) {
            this.#winner = player;
            return player;
          }
        }
      }
    }
    let flatBoard = board.flat();
    if (!flatBoard.includes(null)) {
      this.#winner = "nobody";
      return "nobody";
    }
  }
  player1SaveName() {
    const player1NameBtn = document.getElementById("player-1-name");
    let player1NameInput = document.getElementById("player-1-name-input").value;
    if (player1NameInput == "") {
      player1NameInput = "Player 1";
    }
    player1NameBtn.innerText = player1NameInput;
    player1Name = player1NameInput;
  }
  player2SaveName() {
    const player2NameBtn = document.getElementById("player-2-name");
    let player2NameInput = document.getElementById("player-2-name-input").value;
    if (player2NameInput == "") {
      player2NameInput = "Player 2";
    }
    player2NameBtn.innerText = player2NameInput;
    player2Name = player2NameInput;
  }
}
