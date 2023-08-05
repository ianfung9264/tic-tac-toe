
//gameboard module
const gameBoard = (() => {
    let board = new Array(9).fill(null);

    const getBoard = () => board;
    const setBoard = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => { board = new Array(9).fill(null); };

    return { getBoard, setBoard, resetBoard };
})();

//Player factory
const Player = (name, mark) => {
    return { name, mark };
};

//game controller module
const gameController = (() => {
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const playTurn = (index) => {
        if (gameBoard.setBoard(index, currentPlayer.mark)) {
            checkWinCondition();
            switchPlayer();
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinCondition = () => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const combination of winCombinations) {
            if (gameBoard.getBoard()[combination[0]] === currentPlayer.mark &&
                gameBoard.getBoard()[combination[1]] === currentPlayer.mark &&
                gameBoard.getBoard()[combination[2]] === currentPlayer.mark) {
                alert(`${currentPlayer.name} wins!`);
                return;
            }
        }
    };

    return { playTurn };
})();

//display controller module
const displayController = (() => {
    const boardElement = document.querySelector("#board");
    const restartButton = document.querySelector("#restartButton");

    restartButton.addEventListener("click", () => {
        gameBoard.resetBoard();
        render();
    });

    const render = () => {
        boardElement.innerHTML = "";
        gameBoard.getBoard().forEach((mark, index) => {
            const square = document.createElement("div");
            square.textContent = mark;
            square.addEventListener("click", () => {
                gameController.playTurn(index);
                render();
            });
            boardElement.appendChild(square);
        });
    };

    render();
})();
