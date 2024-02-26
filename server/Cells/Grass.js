
import {Cell} from './index.js'
import { getRandArray } from '../utils.js';
   
export class Grass extends Cell {
  
    color = [58, 171, 31]
    multiplyCount = 0;

    multiply() {
        const emptyCells = this.getEmptyNeighbourCells(1);

        if (emptyCells.length == 0) return;

        const {x, y} = getRandArray(emptyCells);

        this.grid[y][x] = new Grass ({x, y, grid: this.grid, game: this.game});
    }

    step () {
        this.multiplyCount++;
        if (this.multiplyCount%6 == 0){
            this.multiply();
            }
        }
    constructor(options){
        super(options)
    }
}