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

    test('should generate unique IDs based on type and count', () => {
        const ship1 = testGameboard.createShip(3, 'destroyer');
        const ship2 = testGameboard.createShip(3, 'destroyer');
        const ship3 = testGameboard.createShip(2, 'sub');

        expect(ship1.id).toBe('destroyer-1');
        expect(ship2.id).toBe('destroyer-2');
        expect(ship3.id).toBe('sub-1');
    });

    test('should add every new ship to the allShips array', () => {
        testGameboard.createShip(4, 'carrier');
        testGameboard.createShip(3, 'cruiser');

        expect(testGameboard.allShips.length).toBe(2);
        expect(testGameboard.allShips[0].id).toBe(`carrier-1`); 
    });

    test('should increment total shipCounter correctly', () => {
        testGameboard.createShip(3, 'destroyer');
        testGameboard.createShip(2, 'sub');
        testGameboard.createShip(5, 'carrier');

        expect(testGameboard.shipCounter).toBe(3);
    });

    test('should not allow overlapping ships', () => {
        testGameboard.createBoard();
        const ship1 = testGameboard.createShip(3, 'destroyer');
        const ship2 = testGameboard.createShip(2, 'sub');

        testGameboard.placeShip(ship1.id, 0, 0, false);

        const result = testGameboard.placeShip(ship2.id, 0, 0, true);

        expect(result).toBe(false);
        expect(testGameboard.board[1][0].hasShip).toBe(false); 
    });
});