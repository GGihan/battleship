import { Gameboard } from "./gameboard";

describe('Gameboard class', () => {
    let testGameboard;

    beforeEach(() => {
        testGameboard = new Gameboard(10);
    });

    test('should create Board with specified size', () => {
        expect(testGameboard.board.length).toBe(testGameboard.size);
        expect(testGameboard.board[0].length).toBe(testGameboard.size);
    });

    test('each cell should be a unique object', () => {
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
        const ship1 = testGameboard.createShip(3, 'destroyer');
        const ship2 = testGameboard.createShip(2, 'sub');

        testGameboard.placeShip(ship1.id, 0, 0, false);

        const result = testGameboard.placeShip(ship2.id, 0, 0, true);

        expect(result).toBe(false);
        expect(testGameboard.board[1][0].hasShip).toBe(false); 
    });

    test('should not allow placing ships out of bounds', () => {
        const ship = testGameboard.createShip(4, 'battleship');
        
        const result = testGameboard.placeShip(ship.id, 8, 0, false);

        expect(result).toBe(false);
        expect(testGameboard.board[0][8].hasShip).toBe(false);
    });

    test('should not allow placing the same ship twice', () => {
        const ship = testGameboard.createShip(2, 'patrol boat');
        
        testGameboard.placeShip(ship.id, 0, 0, false);
        const secondAttempt = testGameboard.placeShip(ship.id, 5, 5, true);

        expect(secondAttempt).toBe(false);
        expect(testGameboard.board[5][5].hasShip).toBe(false);
    });

    test('should reject placement if it intersects the middle of another ship', () => {
        const ship1 = testGameboard.createShip(3, 'cruiser');
        const ship2 = testGameboard.createShip(3, 'submarine');

        testGameboard.placeShip(ship1.id, 0, 1, false);

        const result = testGameboard.placeShip(ship2.id, 1, 0, true);

        expect(result).toBe(false);
    });

    test('should allow ships to be placed adjacent to each other', () => {
        const ship1 = testGameboard.createShip(2, 'submarine');
        const ship2 = testGameboard.createShip(2, 'destroyer');

        testGameboard.placeShip(ship1.id, 0, 0, false);
        const result = testGameboard.placeShip(ship2.id, 0, 1, false);

        expect(result).toBe(true);
        expect(testGameboard.board[1][0].hasShip).toBe(true);
    });

    test("should return 'Invalid coordinates' if attack is out of bounds", () => {
        expect(testGameboard.receiveAttack(-1, 5)).toBe("Invalid coordinates");
        expect(testGameboard.receiveAttack(10, 10)).toBe("Invalid coordinates");
    });

    test("should record a miss and update missedAttacks array", () => {
        const result = testGameboard.receiveAttack(2, 3);
        
        expect(result).toEqual({ hit: false });
        expect(testGameboard.board[3][2].struck).toBe(true);
        expect(testGameboard.missedAttacks).toContainEqual({ x: 2, y: 3 });
    });

    test("should return 'Cell already attacked' if hitting the same spot twice", () => {
        testGameboard.receiveAttack(1, 1);
        expect(testGameboard.receiveAttack(1, 1)).toBe("Cell already attacked");
    });

    test("should successfully hit a placed ship", () => {
        const ship = testGameboard.createShip(2, "Destroyer");
        testGameboard.placeShip(ship.id, 0, 0, false);

        const result = testGameboard.receiveAttack(0, 0);

        expect(result.hit).toBe(true);
        expect(result.shipId).toBe(ship.id);
        expect(ship.numOfHits).toBe(1);
    });

    test("should report when a ship is sunk", () => {
        const ship = testGameboard.createShip(1, "Submarine");
        testGameboard.placeShip(ship.id, 5, 5, false);

        const result = testGameboard.receiveAttack(5, 5);

        expect(result.hit).toBe(true);
        expect(result.sunk).toBe(true);
        expect(ship.sunk).toBe(true);
    });

     test("checkAllSunk returns true when all placed ships are sunk", () => {
        const ship1 = testGameboard.createShip(1, "Sub");
        testGameboard.placeShip(ship1.id, 0, 0, false);
        
        testGameboard.receiveAttack(0, 0);
        
        expect(testGameboard.checkAllSunk()).toBe(true);
    });
});