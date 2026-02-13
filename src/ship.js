export class Ship {
    constructor(length) {
        this.length = length;
        this.numOfHits = 0;
        this.sunk = false;
    }

    hit() {
        this.numOfHits++;
    }

}