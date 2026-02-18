export const DisplayController = (game) => {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");

    const renderBoards = () => {
        _drawGrid(playerBoardElement, game.player1, "player");
        _drawGrid(computerBoardElement, game.computer, "computer");
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
        const result = await game.handleTurn(x, y);
        
        if (result) {
            updateBoardUI(computerBoardElement, game.computer);
            updateBoardUI(playerBoardElement, game.player1);
        }

        if (game.isGameOver) {
            alert(`Game Over! Winner: ${game.activePlayer.playerName}`);
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

    return { renderBoards };
};