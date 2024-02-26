import {Cell, Grass} from './index.js'
import {GrassEater} from './GrassEater.js'
import { random } from '../utils.js'
import { bombeffectground } from './index.js';
import { bombeffectstone } from './index.js';

export class bomb extends Cell {
  
    color = [0, 0, 0];
    time = 0;
    getNeighboursRanged(range) {
        let neighbours = [];

        for (let i = -range; i <= range; i++) {
            for (let j = -range; j <= range; j++) {
                neighbours.push({x:this.x + i, y: this.y + j})
            }
        }

        return neighbours
    }

    getValidNeighboursRanged(range){
        return this.getNeighboursRanged(range).filter(({x, y})=>  {
            if (y < 0 || y >= this.grid.length) return false;
            if (x < 0 || x >= this.grid.length) return false;
            return true;
        })
    }
    GetNearestGrassEater(){
        let bombers = []

        for (let i = 1; i < 25 && bombers.length == 0; i++){
            bombers = this.getValidNeighboursRanged(i).filter(({x, y}) => {
                return this.grid[y][x] instanceof GrassEater
            })
        }

        return bombers[0]
    }

    goNear({x, y}) {
        let newX = this.x;
        let newY = this.y;
    
        if ((x > newX && (this.grid[newY][newX + 1] === null || this.grid[newY][newX + 1] instanceof Grass)) ) newX++;
        if ((x < newX && (this.grid[newY][newX - 1] === null || this.grid[newY][newX - 1] instanceof Grass)) ) newX--;

        if ((y > newY && (this.grid[newY + 1][newX] === null || this.grid[newY + 1][newX] instanceof Grass)) ) newY++;
        if ((y < newY && (this.grid[newY - 1][newX] === null || this.grid[newY - 1][newX] instanceof Grass)) ) newY--;
    
        if (Math.abs(newX - x) <= 1 && Math.abs(newY - y) <= 1){
            this.explode(Math.round(random(2, 4)));
            this.die();
        } else {
            this.moveTo({x: newX, y: newY})
        }
    }
   

    step() {
        if (!super.step()) return;
        if (this.GetNearestGrassEater()) {
            this.goNear(this.GetNearestGrassEater());
        }
    }

    explode(radius){

        for (let cell of this.getValidNeighbourCells(radius)) {
            this.grid[cell.y][cell.x] = new bombeffectground({x: cell.x, y: cell.y, grid: this.grid, game: this.game});
        }
        this.die()

    }
    constructor(options) {
        super(options);
    }
}