import "./styles.css";
import { GameController } from "./gameController";
import { DisplayController } from "./ui";

function initGame() {
    const game = new GameController();
    const ui = DisplayController(game);
    ui.renderBoards();
}

initGame();