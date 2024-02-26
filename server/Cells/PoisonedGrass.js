import {Cell, Grass} from './index.js'
import { getRandArray } from '../utils.js';

export class PoisonedGrass extends Grass {
  
    color = [144, 238, 144]
    multiplyCount = 0;
    time = 0

    multiply() {
        const emptyCells = this.getEmptyNeighbourCells(1);

        if (emptyCells.length == 0) return;

        const {x, y} = getRandArray(emptyCells);

        this.grid[y][x] = new PoisonedGrass ({x, y, grid: this.grid, game: this.game});
    }

    step () {
        this.time++
        this.multiplyCount++;
        if (this.multiplyCount%9 == 0){
            this.multiply();
            }
        if (this.time == 250){
            const { x, y } = this;
            this.grid[y][x] = new Grass ({x, y, grid: this.grid, game: this.game});
            }
        }
    constructor(options){
        super(options)
    }
}