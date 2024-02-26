
const socket = io();


console.log('Connected to server !');

addCellToList(
  'cell-grass',
  'Grass',
  'Grows evenely every 8 cycles',
  '#59e84c',
  cellSelect
);
addCellToList(
  'cell-grass-eater',
  'GrassEater',
  'Feeds on grass. Dies if hungry for more than 30 cycles. Multiplies when fed 5 times.',
  '#FFA500',
  cellSelect
);
addCellToList(
  'cell-rock',
  'Rock',
  "Doesn't do anything",
  '#808080',
  cellSelect
);
addCellToList( 
 'cell-predator',
 'Predator',
 'Feeds on GrassEaters. Dies if hungry for more than 40 cycles. Multiplies when fed 5 times. ',
 '#fc2525',
 cellSelect
);
addCellToList(
  'cell-bomb',
  'Bomber',
  'If a living cell is located near it, make its way to the target and explode',
  '#000000',
  cellSelect
)
  addCellToList(
    'cell-poison',
    'Poisoned Grass',
    'Slow-growing cell, behaves like grass, but deadly to grass eaters and transforms back into grass after 250 cycles.',
    '#90ee90',
    cellSelect
);
/**
 *
 * Called upon  clicking a cell in the list
 */

let selection = null;
let GRID_SIZE = 20; // TODO: Use size from server instead

function cellSelect(cellId) {
  selection = cellId;
}

function canvasClick(x, y) {
  socket.emit('click', x, y, selection);
}

const canvas = document.querySelector('canvas');

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();

  const x = Math.floor((e.clientX - rect.left) / (canvas.height / GRID_SIZE));
  const y = Math.floor((e.clientY - rect.top) / (canvas.height / GRID_SIZE));
  canvasClick(x, y);
});




socket.on('step', (grid) => {
  const ctx = canvas.getContext('2d');
  const cellSize = canvas.width / grid.length;
  GRID_SIZE = grid.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row of grid){
    for (let cell of row) {
      if (!cell) continue;
      let color = '#'
      color += cell.color[0].toString(16).padStart(2, '0')
      color += cell.color[1].toString(16).padStart(2, '0')
      color += cell.color[2].toString(16).padStart(2, '0')
      ctx.fillStyle = color
      ctx.fillRect(cell.x* cellSize, cell.y* cellSize, cellSize, cellSize)
    }
  }
});

