import { GameController } from "./gameController";

export const DisplayController = (initialGame) => {
    let currentGame = initialGame;
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
    const resetGameButton = document.getElementById("game-reset");
    const startGameButton = document.getElementById("game-start");
    const randomizeGameButton = document.getElementById("randomize-ship");

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

                if (type === "player") {
                    cellDiv.addEventListener("dragover", (e) => {
                        e.preventDefault();
                    });

                    cellDiv.addEventListener("drop", (e) => {
                        e.preventDefault();
                        const shipId = e.dataTransfer.getData("text/plain");
                        
                        const success = player.gameboard.placeShip(shipId, x, y, false);

                        if (success) {
                            renderBoards(); 
                            renderStorageBoard(player);
                        }
                    });
                }

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
        renderStorageBoard(currentGame.player1);
    });

    startGameButton.addEventListener('click', () => {
        if (currentGame.gameStarted) return;
        const success = currentGame.startGame();
        if (success) {
            alert("Battle Stations! Your turn.");
        } else {
            alert("You still have ships in storage!");
        }
    });

    randomizeGameButton.addEventListener('click', () => {
        if (currentGame.gameStarted) return;
        currentGame.player1.gameboard.resetBoard()
        currentGame.player1.autoPlaceShips();
        renderBoards();
        renderStorageBoard(currentGame.player1);
    });

    const renderStorageBoard = (player) => {
        const storageContainer = document.getElementById("storage-board");
        storageContainer.innerHTML = "";
        const unplacedShips = player.gameboard.allShips.filter(ship => !ship.placed);
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.storageX = x;
                cell.dataset.storageY = y;

                const shipAtRow = unplacedShips[y];

                if (shipAtRow && x < shipAtRow.length) {
                    cell.classList.add("ship");
                    cell.dataset.shipId = shipAtRow.id

                    cell.setAttribute("draggable", "true");

                    cell.addEventListener("dragstart", (e) => {
                        e.dataTransfer.setData("text/plain", shipAtRow.id);
                    });
                }

                storageContainer.appendChild(cell);
            }
        }
    }

    return { renderBoards, renderStorageBoard };
};