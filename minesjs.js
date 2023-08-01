const board = document.getElementById('board');
const playButton = document.getElementById('play');
const balanceElement = document.getElementById('balance');

const SIZE = 5; // 4x4 grid
const MIN_BET = 100;
const MAX_BET = 1000;
const BASE_MINES = 1;
const MAX_MINES = 5;

let cells = [];
let balance = 1000;

function createBoard() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cells.push(cell);
      board.appendChild(cell);
    }
  }
}

function calculateMultiplier(mines) {
  // You can define the multiplier formula based on the number of mines here
  // For example:
  // return 1 + mines * 0.1;
  return 1 + mines;
}

function placeMines(bet) {
  const maxMines = Math.min(BASE_MINES + Math.floor((bet - MIN_BET) / ((MAX_BET - MIN_BET) / MAX_MINES)), MAX_MINES);
  const totalCells = SIZE * SIZE;
  const mineIndices = Array.from({ length: totalCells }, (_, index) => index);
  for (let i = 0; i < maxMines; i++) {
    const randomIndex = Math.floor(Math.random() * mineIndices.length);
    const cellIndex = mineIndices.splice(randomIndex, 1)[0];
    cells[cellIndex].dataset.mine = true;
  }

  const multiplier = calculateMultiplier(maxMines);
  return multiplier;
}

function handleCellClick(event) {
  const cell = event.target;
  if (cell.classList.contains('opened')) return;

  const bet = parseInt(document.getElementById('bet').value);

  if (cell.dataset.mine) {
    cell.textContent = '💣';
    cell.style.backgroundColor = 'red';
    balance -= bet;
    updateBalance();
    gameOver();
  } else {
    cell.style.backgroundColor = '#4caf50';
    cell.classList.add('opened');
    const multiplier = placeMines(bet);
    balance += bet * multiplier;
    updateBalance();
  }
}

function gameOver() {
  for (const cell of cells) {
    cell.removeEventListener('click', handleCellClick);
    if (cell.dataset.mine) {
      cell.textContent = '💣';
    }
  }
}

function resetGame() {
  for (const cell of cells) {
    cell.removeEventListener('click', handleCellClick);
    cell.textContent = '';
    cell.style.backgroundColor = '';
    cell.classList.remove('opened');
    delete cell.dataset.mine;
  }
  playButton.textContent = 'Play';
  playButton.addEventListener('click', startGame);
}

function updateBalance() {
  balanceElement.textContent = balance;
}

function startGame() {
  const bet = parseInt(document.getElementById('bet').value);

  if (bet < MIN_BET || bet > MAX_BET) {
    alert('Invalid bet! Make sure the bet is between ' + MIN_BET + ' and ' + MAX_BET + '.');
    return;
  }

  placeMines(bet);
  for (const cell of cells) {
    cell.addEventListener('click', handleCellClick);
  }
  playButton.textContent = 'Restart';
  playButton.removeEventListener('click', startGame);
  playButton.addEventListener('click', resetGame);
}

createBoard();
playButton.addEventListener('click', startGame);