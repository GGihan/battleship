import { GameController } from "./gameController";

export const DisplayController = (initialGame) => {
    let currentGame = initialGame;
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
    const resetGameButton = document.getElementById("game-reset");

    const renderBoards = () => {
        _drawGrid(playerBoardElement, currentGame.player1, "player");
        _drawGrid(computerBoardElement, currentGame.computer, "computer");
    };

    const _drawGrid = (container, player, type) => {
        container.innerHTML = "";
        const board = player.gameboard.board;

        board.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.dataset.x = x;
                cellDiv.dataset.y = y;

                if (type === "player" && cell.hasShip) {
                    cellDiv.classList.add("ship");
                }

                if (type === "computer") {
                    cellDiv.addEventListener("click", () => handleAttack(x, y));
                }

                container.appendChild(cellDiv);
            });
        });
    };

    const handleAttack = async (x, y) => {
        const result = await currentGame.handleTurn(x, y);
        
        if (result) {
            updateBoardUI(computerBoardElement, currentGame.computer);
            updateBoardUI(playerBoardElement, currentGame.player1);
        }

        if (result && result.winner) {
            alert(`Game Over! Winner: ${result.winner}`);
        }
    };

    const updateBoardUI = (container, player) => {
        const boardData = player.gameboard.board;
        
        boardData.forEach((row, y) => {
            row.forEach((cellData, x) => {
                const cellDiv = container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                
                if (cellData.struck) {
                    cellDiv.classList.add(cellData.hasShip ? "hit" : "miss");
                }

                if (cellData.hasShip) {
                    const ship = player.gameboard.placedShips.find(s => s.id === cellData.placedShipId);
                    if (ship && ship.sunk) {
                        cellDiv.classList.add("sunk");
                    }
                }
            });
        });
    };

    resetGameButton.addEventListener('click', () => {
        const newGame = new GameController();
        currentGame = newGame;
        renderBoards();
    });

    return { renderBoards };
};