export class Gameboard {
    constructor(size) {
        this.size = size;
        this.shipCount = 0;
        this.board = [];
    }

    createBoard() {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(0);
            }
            this.board.push(row);
        }
    }
}