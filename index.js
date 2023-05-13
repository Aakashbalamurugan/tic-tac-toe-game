// Tic-Tac-Toe game in JavaScript

// Initialize the game state
var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameEnded = false;

// Function to handle a player's move
function makeMove(index) {
  if (board[index] === '' && !gameEnded) {
    board[index] = currentPlayer;
    drawBoard();
    checkWin();
    switchPlayer();
  }
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if a player has won
function checkWin() {
  var winningCombinations = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals
    [0, 4, 8], [2, 4, 6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      gameEnded = true;
      alert('Player ' + currentPlayer + ' wins!');
      setTimeout( function () {
        window.location.reload() 
     }, 100)
      break;
    }
  }

  // Check for a tie
  if (!board.includes('') && !gameEnded) {
    gameEnded = true;
    alert('It\'s a tie!');
    setTimeout( function () {
        window.location.reload() 
     }, 100)
  }
}

// Function to draw the game board
function drawBoard() {
  var boardContainer = document.getElementById('boardContainer');
  boardContainer.innerHTML = '';

  for (var i = 0; i < board.length; i++) {
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = board[i];
    cell.addEventListener('click', makeMove.bind(null, i));
    boardContainer.appendChild(cell);
  }
}

// Initialize the game
drawBoard();
