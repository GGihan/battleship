import { Gameboard } from "./gameboard";

export class Player {
    constructor(name) {
        this.gameboard = new Gameboard(10);
        this.playerName = name;
    }

    attack(x, y, enemyBoard) {
        return enemyBoard.receiveAttack(x, y);
    }
}

export class ComputerPlayer extends Player {
    constructor() {
        super("Computer");
        this.alreadyStruck = new Set();
    }

    randomAttack(enemyBoard) {
        let x, y;
        let coords;

        do {
            x = Math.floor(Math.random() * enemyBoard.size);
            y = Math.floor(Math.random() * enemyBoard.size);
            coords = `${x},${y}`;
        } while (this.alreadyStruck.has(coords));

        this.alreadyStruck.add(coords);
        const result = enemyBoard.receiveAttack(x, y);
        
        return { x, y, ...result };
    }
}