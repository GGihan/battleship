import { Ship } from "./ship";

describe('Ship class', () => {
    let testShip;

    beforeEach(() => {
        testShip = new Ship(3, "destroyer");
    });

    test('should increase numOfHits from 0 to 1', () => {
        testShip.hit();
        expect(testShip.numOfHits).toBe(1);
    });

    test('should increase numOfHits multiple times', () => {
        const shipLength = testShip.length;

        for (let i = 0; i < shipLength; i++) {
            testShip.hit();
        }

        expect(testShip.numOfHits).toBe(shipLength);
    });


    test('should automatically set sunk to true when hits reach length', () => {
        const shipLength = testShip.length;

        for (let i = 0; i < shipLength; i++) {
            testShip.hit();
        }

        expect(testShip.sunk).toBe(true);
    });

    test('sunk should be false when hits are smaller than length', () => {
        const shipLength = testShip.length;

        for (let i = 0; i < shipLength - 1; i++) {
            testShip.hit();
        }

        expect(testShip.sunk).toBe(false);
    });

    test('should stop increasing hits when sunk equals true', () => {
        const shipLength = testShip.length;

        for (let i = 0; i < shipLength + 1; i++) {
            testShip.hit();
        }

        expect(testShip.numOfHits).toBe(shipLength);
    });

    test('ship should store its unique ID', () => {
        expect(testShip.id).toBe('destroyer');
    });
    
});

