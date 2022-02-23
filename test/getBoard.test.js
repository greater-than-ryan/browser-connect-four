const {
	takeTurn,
	checkWinner,
	getBoard,
	resetGame,
	setBoard,
} = require('../public/js/logic')

describe('When using the getBoard function', () => {
	// it should return board
	test('It should return the state of the board', () => {
		// arrange
		const expectedBoard = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
		]
		// act
		const result = getBoard()
		// assert
		expect(result).toStrictEqual(expectedBoard)
	})

	// should return board whatever state it is in

	// check dimensions of the board
	test('It should always be a 7 by 6 grid ', () => {
		//arrange
		//act
		const board = getBoard()
		//assert
		expect(board.length).toBe(6)
		expect(board[0].length).toBe(7)
		expect(board[1].length).toBe(7)
		expect(board[2].length).toBe(7)
		// Do all rows
	})
})

// describe: reset game
// should set the board to original state and dimensions
describe('When calling the reset game function', () => {
	test('it should set the board to original state and dimensions', () => {
		//arrange
		const boardMidGame = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			['yellow', null, null, null, null, null, null],
			['red', null, null, null, null, null, null],
			['red', 'yellow', null, null, null, null, null],
		]
		const expectedResetBoard = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
		]
		setBoard(boardMidGame)
		expect(getBoard()).toStrictEqual(boardMidGame)
		//act
		resetGame()
		const result = getBoard()
		//assert
		expect(result).toStrictEqual(expectedResetBoard)
	})
})
