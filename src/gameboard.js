import { Ship } from "./ship";

export class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.allShips = [];
        this.placedShips = [];
        this.shipCounter = 0;
        this.typeCounter = {};
        this.missedAttacks = [];
        this.board = this._createBoard(size);
    }

    _createBoard(size) {
        return Array.from({ length: size }, () =>
            Array.from({ length: size }, () => ({
                hasShip: false,
                struck: false,
                placedShipId: null
            }))
        );
    }

    resetBoard() {
        this.board = this._createBoard(this.size);
        this.placedShips = [];
        this.allShips.forEach(ship => {
            ship.placed = false;
        });
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

        const coordinates = Array.from({ length: ship.length }, (_, i) => ({
            x: isVertical ? x : x + i,
            y: isVertical ? y + i : y
        }));
        
        const canPlace = coordinates.every(({ x, y }) => 
            !this.isOutOfBounds(x, y) && !this.board[y][x].hasShip
        );

        if (!canPlace) return false;

        coordinates.forEach(({ x, y }) => {
            const cell = this.board[y][x];
            cell.hasShip = true;
            cell.placedShipId = ship.id;
        });

        ship.placed = true;
        ship.isVertical = isVertical;
        this.placedShips.push(ship);

        return true;
    }

    isOutOfBounds(x, y) {
        return x < 0 || x >= this.size || y < 0 || y >= this.size;
    }

    receiveAttack(x, y) {
        if (this.isOutOfBounds(x, y)) return "Invalid coordinates";

        const cell = this.board[y][x];
        if (cell.struck) return "Cell already attacked";

        cell.struck = true;

        if (cell.hasShip) {
            const ship = this.allShips.find(s => s.id === cell.placedShipId);

            ship.hit();
            return { hit: true, sunk: ship.sunk, shipId: ship.id };
        }

        this.missedAttacks.push({ x, y });
        return { hit: false };
    }

    checkAllSunk() {
        if (this.placedShips.length === 0) return false;
        return this.placedShips.every(ship => ship.sunk);
    }
}