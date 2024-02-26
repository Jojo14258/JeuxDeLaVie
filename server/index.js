import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { networkInterfaces } from 'os';
import {bomb, bombeffectground, bombeffectstone, Cell, Grass, GrassEater, PoisonedGrass, Rock} from './Cells/index.js';
import {emptyGrid} from './utils.js'
import {Game} from './Game.js'
import { Predator} from './Cells/Predator.js';



//need to be modified depending on your configuration. 
const address = networkInterfaces()['Wi-Fi'][3].address;
const port = 8080;

const expressServer = express();
const httpServer = http.createServer(expressServer);
const io = new Server(httpServer);

const game = new Game({io, gridSize: 100});

expressServer.use(express.static('../public'));

io.on('connection', (socket) => {
  console.log(`New visitor ${socket.conn.remoteAddress} !`);
  
  socket.on('pause', game.pause);
  socket.on('next', game.next);
  socket.on('faster', game.faster);
  socket.on('slower', game.slower)
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-grass'){
      game.grid[y][x] = new Grass({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-grass-eater'){
      game.grid[y][x] = new GrassEater({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-rock'){
      game.grid[y][x] = new Rock({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-grass'){
      game.grid[y][x] = new Grass({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-bomb'){
      game.grid[y][x] = new bomb({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-predator'){
      game.grid[y][x] = new Predator({x, y, game, grid: game.grid})
    }
  })
  socket.on('click', (x, y, selection) => {
    if (selection == 'cell-poison'){
      game.grid[y][x] = new PoisonedGrass({x, y, game, grid: game.grid})
    }
  })
});

httpServer.listen(port, () => {
  console.log(`Listening on ${address}:${port}`);
});
