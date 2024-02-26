import {Cell, Rock} from './index.js'
import {Grass} from "./Grass.js"
import { getRandArray } from '../utils.js';
import {PoisonedGrass} from './index.js'

export class GrassEater extends Cell {
    color = [255,165,0];
   
    hunger = 0;
    count = 0

    getGrassNeighbours() {
        const neighbours = this.getValidNeighbourCells(1);

        return neighbours.filter(({x, y}) => {
            return this.grid[y][x] instanceof Grass
         });
    }
    moveTo({x, y}){
        if (this.grid[y][x] instanceof Rock) return;
        this.grid[this.y][this.x] = null;
        this.y = y;
        this.x = x;
        this.grid[y][x] = this;
    }
    eat({x, y}) {
        const whatIsEaten = this.grid[y][x];
        this.hunger = 0;
        this.count++
        this.moveTo({x, y});
        if (whatIsEaten instanceof PoisonedGrass) return this.die();

    }
    multiplyGrassEater(){
        this.count = 0;
        const emptyCells = this.getEmptyNeighbourCells(1);

        if (emptyCells.length == 0) return;

        const {x, y} = getRandArray(emptyCells);

        this.grid[y][x] = new GrassEater({x, y, grid: this.grid, game: this.game}); //A fixer pour prochaine fois
        }


    step() {
        if (!super.step()) return;
        this.hunger++;
        if (this.hunger >= 30) return this.die();
        if (this.getGrassNeighbours().length > 0){
            this.eat(getRandArray(this.getGrassNeighbours()));
        }
        if (this.count >= 5){
            this.multiplyGrassEater()
        } 
    }

    constructor(options) {
        super(options);
    }
}