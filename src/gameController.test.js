import { GameController } from './gameController';

describe('GameController', () => {
    let game;

    beforeEach(() => {
        game = new GameController();
    });

    test('should initialize both players with 5 ships', () => {
        expect(game.player1.gameboard.allShips.length).toBe(5);
        expect(game.computer.gameboard.allShips.length).toBe(5);
    });

    test('should place all ships during setup', () => {
        expect(game.player1.gameboard.placedShips.length).toBe(5);
        expect(game.computer.gameboard.placedShips.length).toBe(5);
    });

    test('should identify a win correctly', () => {
        game.computer.gameboard.placedShips.forEach(ship => {
            for (let i = 0; i < ship.length; i++) {
                ship.hit();
            }
        });

        expect(game.checkWin(game.computer)).toBe(true);
        expect(game.isGameOver).toBe(true);
    });

    test('processAttack should return false for invalid coordinates or repeated hits', () => {
        const x = 0, y = 0;
        game.processAttack(game.player1, game.computer, x, y);
        const result = game.processAttack(game.player1, game.computer, x, y);
        
        expect(result).toBe(false);
    });
});