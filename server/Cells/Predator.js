import {Cell} from './index.js'
import {GrassEater} from './GrassEater.js'
import {Rock} from './Rock.js'

import { random } from '../utils.js'
import { getRandArray } from '../utils.js';

export class Predator extends Cell {

    color = [252,37,37];
    count = 0
    hunger = 0;
    getNeighboursRanged(range) {
        let neighbours = [];

        for (let i = -range; i <= range; i++) {
            for (let j = -range; j <= range; j++) {
                neighbours.push({x:this.x + i, y: this.y + j})
            }
        }

        return neighbours
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
    }

    getValidNeighboursRanged(range){
        return this.getNeighboursRanged(range).filter(({x, y})=>  {
            if (y < 0 || y >= this.grid.length) return false;
            if (x < 0 || x >= this.grid.length) return false;
            return true;
        })
    }
    getPredatorNeighbours() {
        const neighbours = this.getValidNeighbourCells(1);

        return neighbours.filter(({x, y}) => {
            return this.grid[y][x] instanceof GrassEater
         });
    }
    GetNearestGrassEater(){
        let predator = []

        for (let i = 1; i < 50 && predator.length == 0; i++){
            predator = this.getValidNeighboursRanged(i).filter(({x, y}) => {
                return this.grid[y][x] instanceof GrassEater
            })
        }

        return predator[0]
    }

    goNear({x, y}) {
        let newX = this.x;
        let newY = this.y;

        if (x > newX) newX++;
        if (x < newX) newX--;

        if (y > newY) newY++;
        if (y < newY) newY--;

        if (Math.abs(newX - x) <= 1 && Math.abs(newY - y) <= 1){
            this.eat({x: newX, y: newY})
        } else {
            this.moveTo({x: newX, y: newY})
        }
    }
   
    multiplyPredator(){
        this.count = 0;
        const emptyCells = this.getEmptyNeighbourCells(1);

        if (emptyCells.length == 0) return;

        const {x, y} = getRandArray(emptyCells);

        this.grid[y][x] = new Predator({x, y, grid: this.grid, game: this.game}); 
   
    }

    
    step() {
        if (!super.step()) return;
        this.hunger++
        if (this.GetNearestGrassEater()) {
            this.goNear(this.GetNearestGrassEater());
        }
        if (this.hunger >= 40) return this.die();
        if (this.count >= 5){
            this.multiplyPredator()
        } 
    }
    constructor(options) {
        super(options);
    }
}