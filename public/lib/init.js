function init() {
  const socket = io();

  const pauseButton = document.getElementById('pause-button');
  const nextButton = document.getElementById('next-button');
  const fasterButton = document.getElementById('faster-button');
  const slowerButton = document.getElementById('slower-button');

  // TODO: Change text from '⏸️ Pause' to '▶️ Play', maybe in relation to server ?
  pauseButton.addEventListener('click', () => {
    socket.emit('pause')
    if (pauseButton.innerText == '⏸️ Pause') {
      console.log('pause');
    } else {
      console.log('play');
    }
  });

  nextButton.addEventListener('click', () => {
    socket.emit('next')
  });

  fasterButton.addEventListener('click', () => {
    socket.emit('faster')
  });

  slowerButton.addEventListener('click', () => {
    socket.emit('slower')
  });
}

document.addEventListener('DOMContentLoaded', init);

function addCellToList(
  id,
  name = 'NO NAME',
  description = 'NO DESCRIPTION',
  color = '#000',
  onClick
) {
  const cellList = document.querySelector('.cell-list');

  const cellRow = document.createElement('li');
  cellRow.setAttribute('id', id);
  cellRow.setAttribute('class', 'cell-row');

  const cellImage = document.createElement('div');
  cellImage.setAttribute('class', 'cell-image');
  cellImage.setAttribute('style', `background-color: ${color}`);
  cellRow.appendChild(cellImage);

  const cellRowText = document.createElement('div');
  cellRowText.setAttribute('class', 'cell-row-text');
  cellRow.appendChild(cellRowText);

  const cellName = document.createElement('p');
  cellName.setAttribute('class', 'cell-name');
  cellName.innerText = name;
  cellRowText.appendChild(cellName);

  const cellDescription = document.createElement('p');
  cellDescription.setAttribute('class', 'cell-description');
  cellDescription.innerText = description;
  cellRowText.appendChild(cellDescription);

  cellList.appendChild(cellRow);

  cellRow.addEventListener('click', () => {
    for (let c of cellList.children) c.setAttribute('selected', false);
    cellRow.setAttribute('selected', true);
    onClick(cellRow.attributes.id.nodeValue);
  });
}
