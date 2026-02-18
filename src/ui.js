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
        
        if (!result) return;

        updateCell(computerBoardElement, x, y, result.humanResult);
        
        if (result.computerResult) {
            updateCell(playerBoardElement, result.computerResult.x, result.computerResult.y, result.computerResult);
        }

        if (result.winner) {
            alert(`${result.winner} wins!`);
        }
    };

    const updateCell = (container, x, y, attackResult) => {
        const cell = container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add(attackResult.hit ? "hit" : "miss");
        
        if (attackResult.sunk) {
            cell.classList.add("sunk");
        }
    };

    return { renderBoards };
};