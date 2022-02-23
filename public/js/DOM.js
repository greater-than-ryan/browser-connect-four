/* eslint-disable no-unused-vars */
// Create HTML grid
function createGrid() {
	// Rows
	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		// Columns
		for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
			let gridItem = document.createElement('div')
			gridItem.setAttribute('id', `row-${rowIndex}-column-${columnIndex}`)
			gridItem.setAttribute('class', 'grid-item')
			document.getElementById('board').appendChild(gridItem)
		}
	}
}

createGrid()

// Use the board array to fill in counters
function populateBoard(board) {
	emptyBoard()
	for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
		for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
			if (!board[rowIndex][columnIndex]) {
				continue
			}
			const cell = board[rowIndex][columnIndex] === 'red' ? 'red' : 'yellow'
			document
				.getElementById(`row-${rowIndex}-column-${columnIndex}`)
				.classList.add(cell)
		}
	}
}

// Clear down the elements drawn on the board.
function emptyBoard() {
	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
			let cell = document.getElementById(
				`row-${rowIndex}-column-${columnIndex}`
			)
			cell.classList.remove('preview-move-red', 'preview-move-yellow')
			if (cell.classList.contains('red')) {
				cell.classList.remove('red')
			}
			if (cell.classList.contains('yellow')) {
				cell.classList.remove('yellow')
			}
		}
	}
}

// Click functionality
// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
	for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
		const cell = document.getElementById(
			`row-${rowIndex}-column-${columnIndex}`
		)
		cell.addEventListener(
			'click',
			positionClick.bind(null, rowIndex, columnIndex)
		)
	}
}
// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) {
	console.log(event)
	//rowIndex still required as the position is needed by listener
	playDropAudio()
	takeTurn(columnIndex)
	checkWinner(columnIndex)

	const board = getBoard()
	populateBoard(board)
	const winner = checkWinner()
	if (winner === 'red') {
		player1Wins += 1
	}
	if (winner === 'yellow') {
		player2Wins += 1
	}
	const player1WinsBadge = document.getElementById('player-1-wins')
	player1WinsBadge.innerText = 'Wins: ' + player1Wins
	const player2WinsBadge = document.getElementById('player-2-wins')
	player2WinsBadge.innerText = 'Wins: ' + player2Wins

	if (winner && winner !== undefined) {
		const winnerNameSpan = document.getElementById('winner-name')

		if (winner === 'red') {
			winnerNameSpan.innerText = player1Name
		}

		if (winner === 'yellow') {
			winnerNameSpan.innerText = player2Name
		}
		playWinAudio()
		const winnerBanner = document.getElementById('winner-display')
		winnerBanner.style.display = 'block'
	}
}

// Hover functionality
// Bind the hover events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
	for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
		const gridPosition = document.getElementById(
			`row-${rowIndex}-column-${columnIndex}`
		)
		gridPosition.addEventListener(
			'mouseover',
			hoverColumn.bind(null, rowIndex, columnIndex)
		)
	}
}

// Move highlight
function hoverColumn(rowIndex, columnIndex) {
	// Remove all highlighting
	if (gameState === true) {
		for (let rowStart = 0; rowStart < 6; rowStart++) {
			for (let columnStart = 0; columnStart < 7; columnStart++) {
				document
					.getElementById(`row-${rowStart}-column-${columnStart}`)
					.classList.remove('preview-move-red', 'preview-move-yellow')
			}
		}
		// Highlight next available square
		for (let rowStart = board.length - 1; rowStart >= 0; rowStart--) {
			if (board[rowStart][columnIndex] === null) {
				player1
					? document
							.getElementById(`row-${rowStart}-column-${columnIndex}`)
							.classList.add('preview-move-red')
					: document
							.getElementById(`row-${rowStart}-column-${columnIndex}`)
							.classList.add('preview-move-yellow')
				break
			}
		}
	}
}

// Naming functions
const player1SaveNameBtn = document.getElementById('player-1-save-name-btn')
player1SaveNameBtn.addEventListener('click', player1SaveName)

function player1SaveName() {
	const player1NameBtn = document.getElementById('player-1-name')
	let player1NameInput = document.getElementById('player-1-name-input').value
	if (player1NameInput == '') {
		player1NameInput = 'Player 1'
	}
	player1NameBtn.innerText = player1NameInput
	player1Name = player1NameInput
}

const player2SaveNameBtn = document.getElementById('player-2-save-name-btn')
player2SaveNameBtn.addEventListener('click', player2SaveName)

function player2SaveName() {
	const player2NameBtn = document.getElementById('player-2-name')
	let player2NameInput = document.getElementById('player-2-name-input').value
	if (player2NameInput == '') {
		player2NameInput = 'Player 2'
	}
	player2NameBtn.innerText = player2NameInput
	player2Name = player2NameInput
}

// Reset functions
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', resetClick)

// CPU FUNCS
// CPU DOM functions
const cpuButton = document.getElementById('cpu-button')
const cpuLabel = document.getElementById('cpu-label')
cpuButton.checked = false
cpuButton.addEventListener('click', cpuCheck)

function cpuCheck(event) {
	cpuButton.checked
		? ((cpuButton.checked = false), (cpu = false))
		: ((cpuButton.checked = true), (cpu = true))
}
function resetClick(event) {
	resetGame()
	emptyBoard()
	emptyBoard()
	cpuButton.checked = false
	cpuLabel.classList.remove('active')
	const winnerNameSpan = document.getElementById('winner-name')
	winnerNameSpan.innerText = ''
	const winnerBanner = document.getElementById('winner-display')
	winnerBanner.style.display = 'None'
}
