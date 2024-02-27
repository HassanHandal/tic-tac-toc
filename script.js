let currentPlayer = 'X';
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;
const boardArray = () => {
  const board = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => '_'));
  }
  return board;
};
let board = boardArray();
// board creation//
const createBoard = () => {
  const container = document.querySelector('.container');
  const board = document.createElement('div');
  board.classList.add('board');
  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="${i + 1}"><span class="value"></span></div>`;
    const cellElement = document.createRange().createContextualFragment(cellElementString);
    cellElement.querySelector('.cell').onclick = (event) => cellCLickHandler(event, i);
    cellElement.querySelector('.cell').onkeydown = (event) => (event.key === 'Enter' ? cellCLickHandler(event, i) : true);

    board.appendChild(cellElement);
    document.documentElement.style.setProperty('--grid-rows', NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement('afterbegin', board);
};
createBoard();
// end board//
const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const column = index % numberOfRows;
  return ([row, column]);
};

const reset = () => {
  document.querySelector('.board').remove();
  createBoard();
  board = boardArray();
  currentPlayer = 'X';
  turnsCounter = 0;
};
document.querySelector('#reset').onclick = () => { reset(); };
const checkRows = (currentPlayer) => {
  let column = 0;
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }
    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};
const checkColumns = (currentPlayer) => {
  let row = 0;
  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};
const checkDiagonal = (currentPlayer) => {
  let count = 0;
  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};
const checkReverseDiagonal = (currentPlayer) => {
  let count = 0;
  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkWin = (currentPlayer) => checkRows(currentPlayer) || (checkColumns(currentPlayer)) || (checkDiagonal(currentPlayer)) || (checkReverseDiagonal(currentPlayer));
const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} Won!`);
    reset();
  }, 100);
};
const runDrawEvent = () => {
  setTimeout(() => {
    alert('Draw');
    reset();
  }, 100);
};
const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector('.value').textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};
const cellCLickHandler = (event, index) => {
  const cell = event.target;
  const [row, column] = getCellPlacement(index, NUMBER_OF_ROWS);
  if (board[row][column] === '_') {
    turnsCounter++;
    board[row][column] = currentPlayer;
    drawMarkInCell(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else if (turnsCounter === turns) {
      runDrawEvent();
    }
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
  }
};
