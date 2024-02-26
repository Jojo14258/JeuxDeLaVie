export class Cell {
    x; 
    y;

    color = [0, 0, 0];

    lastStep = 0;
    lastFrame = 0;

    getNeighbourCells (range){
        const neighbours = [];

        for (let y = -range; y <= range; y++){
            for (let x = -range; x <= range; x++){
                if (x == 0 && y == 0) continue;
                neighbours.push({
                    x: this.x + x,
                    y: this.y + y,
                });
            }
        }

        return neighbours;
    }

    getValidNeighbourCells(range) {
        const neighbours = this.getNeighbourCells(range);

        return neighbours.filter(({x, y}) =>  {
            if (y < 0 || y >= this.grid.length) return false;
            if (x < 0 || x >= this.grid.length) return false;
            return true;
        });
    }

    getEmptyNeighbourCells(range) {
        const neighbours = this.getValidNeighbourCells(range);

        return neighbours.filter(({ x, y}) =>{
            return this.grid[y][x] == null;

        })
    }

    die() {
        this.grid[this.y][this.x] = null;
    }

    moveTo({x, y}){
        this.grid[this.y][this.x] = null;
        this.y = y;
        this.x = x;
        this.grid[y][x] = this;
    }

    step() {
        if (this.lastFrame == this.game.stepCount) return false;
        this.lastFrame = this.gamestepCount;
        return true;
    }

    constructor({x, y, grid, game}) {
        this.x = x;
        this.y = y;
        this.grid = grid
        this.game = game;
    }

}