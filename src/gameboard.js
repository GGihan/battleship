export class Gameboard {
    constructor(size) {
        this.size = size;
        this.allShips = [];
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
}