const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');

  let board, currentPlayer, gameOver, moveQueue;

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function initGame() {
    board = Array(9).fill('');
    moveQueue = [];
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = "Player X's Turn";
    statusEl.classList.remove('win');
    renderBoard();
  }

  function renderBoard() {
    boardEl.innerHTML = '';
    board.forEach((cell, i) => {
      const div = document.createElement('div');
      div.className = 'cell' + (cell ? ' taken ' + cell.toLowerCase() : '');
      div.textContent = cell;
      div.addEventListener('click', () => handleClick(i));
      boardEl.appendChild(div);
    });
  }

  function handleClick(index) {
    if (board[index] !== '' || gameOver) return;

    // Remove oldest move if 6 already made
    if (moveQueue.length === 6) {
      const oldestMove = moveQueue.shift(); // remove oldest
      board[oldestMove.index] = '';
    }

    board[index] = currentPlayer;
    moveQueue.push({ index, player: currentPlayer });
    renderBoard();

    if (checkWinner(currentPlayer)) {
      statusEl.textContent = `Player ${currentPlayer} wins!`;
      statusEl.classList.add('win');
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s Turn`;
  }

  function checkWinner(player) {
    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === player)
    );
  }

  function restartGame() {
    initGame();
  }

  initGame();
