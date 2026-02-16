import { Player, ComputerPlayer } from "./player";
import { Gameboard } from "./gameboard";

describe("Player & ComputerPlayer", () => {
    let human;
    let computer;
    let enemyBoard;

    beforeEach(() => {
        human = new Player("Player 1");
        computer = new ComputerPlayer();
        enemyBoard = new Gameboard(10);
    });

    test("Player should have a name and their own Gameboard", () => {
        expect(human.playerName).toBe("Player 1");
        expect(human.gameboard).toBeInstanceOf(Gameboard);
    });

    test("Human player attack should affect enemy board", () => {
        const spy = jest.spyOn(enemyBoard, 'receiveAttack');
        human.attack(2, 2, enemyBoard);
        expect(spy).toHaveBeenCalledWith(2, 2);
    });

    test("ComputerPlayer should inherit from Player", () => {
        expect(computer instanceof Player).toBe(true);
        expect(computer.playerName).toBe("Computer");
    });

    test("randomAttack should record a hit/miss on the enemy board", () => {
        const result = computer.randomAttack(enemyBoard);
        
        expect(result).toHaveProperty('x');
        expect(result).toHaveProperty('y');
        expect(result).toHaveProperty('hit');
        expect(enemyBoard.board[result.y][result.x].struck).toBe(true);
    });

    test("randomAttack should not attack the same coordinates twice", () => {
        const smallBoard = new Gameboard(2);
        
        computer.randomAttack(smallBoard);
        computer.randomAttack(smallBoard);
        computer.randomAttack(smallBoard);
        computer.randomAttack(smallBoard);

        expect(computer.alreadyStruck.size).toBe(4);
        
        const coordsArray = Array.from(computer.alreadyStruck);
        const uniqueCoords = new Set(coordsArray);
        expect(uniqueCoords.size).toBe(4);
    });
});