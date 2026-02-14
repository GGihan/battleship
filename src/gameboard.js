import { Ship } from "./ship";

export class Gameboard {
    constructor(size) {
        this.size = size;
        this.allShips = [];
        this.shipCounter = 0;
        this.typeCounter = {};
        this.board = [];
    }

    createBoard() {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                const cell = {
                    hasShip: false,
                    struck: false,
                    shipID: ""
                };
                row.push(cell);
            }
            this.board.push(row);
        }
    }

    createShip(length, type) {
        if (this.typeCounter[type] === undefined) {
            this.typeCounter[type] = 0;
        }

        this.typeCounter[type]++;
        const id = `${type}-${this.typeCounter[type]}`;

        const newShip = new Ship(length, id);
        this.allShips.push(newShip);

        this.shipCounter++;

        return newShip;
    }
}