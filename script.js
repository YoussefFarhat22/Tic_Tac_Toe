// GameController.checkWinner();

const displayController = (function () {
  
  const cells = document.querySelectorAll(".cell");
  const playerTurn = document.querySelector(".turn");

  const renderUI = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        GameController.playRound(index);
        if (e.target.textContent !== "") return;
        playerTurn.textContent =
          "player " + GameController.getCurrentPlayer().marker + " turn";

        cell.textContent = GameBoard.getBoard()[index];
        GameController.checkWinner();
      });
    });
  };

  const clearCells = () => {
    playerTurn.textContent = GameController.getCurrentPlayer().name + " win";
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return { renderUI, clearCells };
})();

// GameBoard
const GameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMarker = (index, marker) => {
    if (board[index]) return;
    else {
      board[index] = marker;
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    return board;
  };

  return { getBoard, setMarker, clearBoard };
})();

// Player objects
const Player = function (name, marker) {
  return { name, marker };
};

// Game Logic Objects
const GameController = (function () {
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");

  let currentPlayer = playerOne;
  let board = GameBoard.getBoard();

  const switchPlayerTurn = () => {
    currentPlayer === playerOne
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  };

  const getCurrentPlayer = () => currentPlayer;

  const playRound = (index) => {
    GameBoard.setMarker(index, currentPlayer.marker);
  };

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        GameBoard.clearBoard();

        displayController.clearCells();
        console.log(board);
        return true;
      }
    }

    return false; // No winner found
  };

  return { playRound, getCurrentPlayer, checkWinner, switchPlayerTurn };
})();

displayController.renderUI();
