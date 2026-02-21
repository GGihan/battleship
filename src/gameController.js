import { Player, ComputerPlayer } from "./player";

const FLEET_CONFIG = [
    { type: "Carrier", length: 5 },
    { type: "Battleship", length: 4 },
    { type: "Destroyer", length: 3 },
    { type: "Patrol Boat", length: 2 },
    { type: "Patrol Boat", length: 2 }
];

export class GameController {
    constructor() {
        this.player1 = new Player("GGihan");
        this.computer = new ComputerPlayer();
        this.activePlayer = this.player1;
        this.isGameOver = false;
        this.gameStarted = false;
        this.setupInitialShips();
        this.beginGameSetup();
    }
    
    setupInitialShips() {
        [this.player1, this.computer].forEach(player => {
            FLEET_CONFIG.forEach(shipData => {
                player.gameboard.createShip(shipData.length, shipData.type);
            });
        });
    }

    beginGameSetup() {
        // this.player1.autoPlaceShips();
        this.computer.autoPlaceShips();
    }

    startGame() {
        if (this.player1.gameboard.placedShips.length === 5) {
            this.gameStarted = true;
            return true;
        }
        return false;
    }

    async handleTurn(x, y) {
        if (!this.gameStarted) {
            alert("Place all your ships and click Start first!");
            return;
        }
        
        if (this.isGameOver) return;

        const humanResult = this.processAttack(this.player1, this.computer, x, y);
        if (!humanResult) return; 

        if (this.checkWin(this.computer)) {
            return { winner: this.player1.playerName, humanResult };
        }

        await this.delay(200); 
        const computerResult = this.processComputerTurn();

        if (this.checkWin(this.player1)) {
            return { winner: "Computer", humanResult, computerResult };
        }

        return { 
            humanResult, 
            computerResult 
        };
    }

    processAttack(attacker, defender, x, y) {
        const result = attacker.attack(x, y, defender.gameboard);
        return (typeof result === "string") ? false : result;
    }

    processComputerTurn() {
        return this.computer.randomAttack(this.player1.gameboard);
    }

    checkWin(opponent) {
        if (opponent.gameboard.checkAllSunk()) {
            this.isGameOver = true;
            return true;
        }
        return false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}