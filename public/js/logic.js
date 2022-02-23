// Global Variables

let gameState = true
let board = [
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
]

// console.log(board.length) // 6

let player1 = true
let player2 = false

let cpu = false

let player1Wins = 0
let player2Wins = 0

let player1Name = 'Player 1'
let player2Name = 'Player 2'

// CPU Logic Functions
// Randomly play available squares
function getRandomInt(max) {
	return Math.floor(Math.random() * max)
}
// Find column for CPU
function findRow(columnIndex) {
	for (let rowIndex = board.length - 1; rowIndex >= 0; rowIndex--) {
		console.log(rowIndex)
		if (board[rowIndex][columnIndex] === null) {
			return rowIndex
		}
	}
}

function cpuTurn() {
	// Add a check to see if the game has been won, if so don't take a turn
	let flag = false
	const testBoard = board.flat()
	// A flat array lets us check it contains a value
	if (testBoard.includes(null) && !checkWinner()) {
		while (!flag) {
			const column = getRandomInt(7)
			const row = findRow(column)
			// Need to check if there is room on the board
			if (board[row][column] === null && gameState === true) {
				board[row][column] = 'yellow'
				flag = true
			}
		}
	} else {
		console.log('No room left!')
	}
}

// Board functionality
// Get Board
function getBoard() {
	console.log('getBoard was called')
	return board
}

// Take Turn
function takeTurn(columnIndex) {
	for (let rowIndex = board.length - 1; rowIndex >= 0; rowIndex--) {
		console.log(rowIndex)
		if (gameState === true && board[rowIndex][columnIndex] === null) {
			if (player1 && cpu) {
				board[rowIndex][columnIndex] = 'red'
				player1 = false
				cpuTurn()
				player1 = true
				break
			} else if (player1 && !cpu) {
				board[rowIndex][columnIndex] = 'red'
				player1 = false
				player2 = true
				break
			} else if (player2) {
				board[rowIndex][columnIndex] = 'yellow'
				player1 = true
				player2 = false
				break
			}
		}
	}
}

function checkRight(player, rowIndex, columnIndex) {
	if (
		columnIndex + 3 < board[0].length &&
		player == board[rowIndex][columnIndex + 1] && // look right
		player == board[rowIndex][columnIndex + 2] &&
		player == board[rowIndex][columnIndex + 3]
	) {
		return true
	}
}

function checkUp(player, rowIndex, columnIndex) {
	if (
		player == board[rowIndex + 1][columnIndex] && // look up
		player == board[rowIndex + 2][columnIndex] &&
		player == board[rowIndex + 3][columnIndex]
	) {
		return true
	}
}

function checkUpRight(player, rowIndex, columnIndex) {
	if (
		columnIndex + 3 < board[0].length &&
		player == board[rowIndex + 1][columnIndex + 1] && // look up & right
		player == board[rowIndex + 2][columnIndex + 2] &&
		player == board[rowIndex + 3][columnIndex + 3]
	) {
		return true
	}
}

function checkUpLeft(player, rowIndex, columnIndex) {
	if (
		columnIndex - 3 >= 0 &&
		player == board[rowIndex + 1][columnIndex - 1] && // look up & left
		player == board[rowIndex + 2][columnIndex - 2] &&
		player == board[rowIndex + 3][columnIndex - 3]
	)
		return true
}
// Check Winner
function checkWinner() {
	const height = board.length
	const width = board[0].length
	for (let rowIndex = 0; rowIndex < height; rowIndex++) {
		for (let columnIndex = 0; columnIndex < width; columnIndex++) {
			let player = board[rowIndex][columnIndex]
			// Skip to next iteration if no token
			if (player === null) {
				continue
			}
			if (checkRight(player, rowIndex, columnIndex)) {
				gameState = false
				return player
			}
			if (rowIndex + 3 < height) {
				if (checkUp(player, rowIndex, columnIndex)) {
					gameState = false
					return player
				}
				if (checkUpRight(player, rowIndex, columnIndex)) {
					gameState = false
					return player
				}
				if (checkUpLeft(player, rowIndex, columnIndex)) {
					gameState = false
					return player
				}
			}
		}
	}
	let flatBoard = board.flat()
	if (!flatBoard.includes(null)) {
		gameState = false
		return 'nobody'
	}
}

function resetGame() {
	board = [
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
	]
	player1 = true
	player2 = false
	cpu = false
	gameState = true
}

function playDropAudio() {
	const drop = new Audio('public/sound/drop.wav')
	drop.play()
}

function playWinAudio() {
	const win = new Audio('public/sound/win.wav')
	win.play()
}

module.exports = {
	playDropAudio,
	playWinAudio,
	resetGame,
	checkWinner,
	takeTurn,
	getBoard,
	cpuTurn,
	findRow,
	getRandomInt,
	player1Name,
	player2Name,
	gameState,
	board,
	player1,
	player2,
	cpu,
	player1Wins,
	player2Wins,
}
