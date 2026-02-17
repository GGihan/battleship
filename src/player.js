import { Gameboard } from "./gameboard";

export class Player {
    constructor(name) {
        this.gameboard = new Gameboard(10);
        this.playerName = name;
    }

    attack(x, y, enemyBoard) {
        return enemyBoard.receiveAttack(x, y);
    }

    autoPlaceShips() {
        const shipsToPlace = this.gameboard.allShips;

        shipsToPlace.forEach(ship => {
            let placed = false;
            
            while (!placed) {
                const x = Math.floor(Math.random() * this.gameboard.size);
                const y = Math.floor(Math.random() * this.gameboard.size);
                const isVertical = Math.random() < 0.5;

                placed = this.gameboard.placeShip(ship.id, x, y, isVertical);
            }
        });
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