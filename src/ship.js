export class Ship {
    constructor(length, id) {
        this.length = length;
        this.numOfHits = 0;
        this.sunk = false;
        this.placed = false;
        this.isVertical = null;
        this.id = id;
    }

    hit() {
        if (this.sunk) return;

        this.numOfHits++;

        if (this.numOfHits >= this.length) {
            this.sunk = true;
        }
    }

}