import { Gameboard } from "./gameboard";

describe('Gameboard class', () => {
    let testGameboard;

    beforeEach(() => {
        testGameboard = new Gameboard(10);
    });

    test('should create Board with specified size', () => {
        testGameboard.createBoard();
        expect(testGameboard.board.length).toBe(testGameboard.size);
        expect(testGameboard.board[0].length).toBe(testGameboard.size);
    });

    test('each cell should be a unique object', () => {
        testGameboard.createBoard();

        testGameboard.board[0][0].hasShip = true;

        expect(testGameboard.board[0][1].hasShip).toBe(false);
        expect(testGameboard.board[0][0].hasShip).toBe(true);
    });
});