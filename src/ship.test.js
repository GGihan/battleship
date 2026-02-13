import { Ship } from "./ship";

describe('Ship class', () => {
    let testShip;

    beforeEach(() => {
        testShip = new Ship(3);
    });

    test('should increase numOfHits from 0 to 1', () => {
        testShip.hit();
        expect(testShip.numOfHits).toBe(1);
    });

    test('should increase numOfHits multiple times', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.numOfHits).toBe(2);
    });
    
});

