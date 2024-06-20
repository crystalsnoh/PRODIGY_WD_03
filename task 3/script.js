// script.js

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const gameStatus = document.getElementById('gameStatus');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerHTML = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        gameStatus.innerHTML = `Game ended in a draw!`;
        isGameActive = false;
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleRestartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
};

gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleRestartGame);

gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
