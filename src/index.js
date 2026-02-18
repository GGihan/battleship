import "./styles.css";
import { GameController } from "./gameController";
import { DisplayController } from "./ui";

const game = new GameController();
const ui = DisplayController(game);

ui.renderBoards();