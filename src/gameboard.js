import { Ship } from "./ship";

export class Gameboard {
    constructor(size) {
        this.size = size;
        this.allShips = [];
        this.placedShips = [];
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
                    placedShipId: ""
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

    placeShip(targetShipId, x, y, isVertical) {
        const ship = this.allShips.find(s => s.id === targetShipId);
        if (!ship || ship.placed) return false;

        // Scouting for other Ships
        for (let i = 0; i < ship.length; i++) {
            
            const currentX = isVertical ? x : x + i;
            const currentY = isVertical ? y + i : y;

            if (this.isOutOfBounds(currentX, currentY)) {
                return false;
            }

            // Collision check
            if (this.board[currentY][currentX].hasShip) {
                return false;
            }
        }

        // Setting board cell values
        for (let i = 0; i < ship.length; i++) {
            const currentX = isVertical ? x : x + i;
            const currentY = isVertical ? y + i : y;

            this.board[currentY][currentX].hasShip = true;
            this.board[currentY][currentX].placedShipId = ship.id;
        }

        ship.placed = true;
        ship.isVertical = isVertical;
        this.placedShips.push(ship);

        return true;
    }

    isOutOfBounds(x, y) {
        return x < 0 || x >= this.size || y < 0 || y >= this.size;
    }
}