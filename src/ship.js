export class Ship {
    constructor(length) {
        this.length = length;
        this.numOfHits = 0;
        this.sunk = false;
    }

    hit() {
        if (this.sunk) return;

        this.numOfHits++;

        if (this.numOfHits >= this.length) {
            this.sunk = true;
        }
    }

}