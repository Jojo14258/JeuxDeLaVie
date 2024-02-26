import { emptyGrid } from "./utils.js";
import { Grass } from "./Cells/Grass.js"; 
import { GrassEater } from "./Cells/GrassEater.js";
import { bombeffectground } from "./Cells/bombeffectground.js";
import { bombeffectstone } from "./Cells/bombeffectstone.js";
import { Rock } from "./Cells/Rock.js";
import { bomb } from "./Cells/bomb.js";
import { PoisonedGrass } from "./Cells/PoisonedGrass.js";
export class Game {
    grid;

    io;

    timer;

    stepCount = 0

    delay = 300;
    step = () => {
        //
        for (const line of this.grid) {
            for (const cell of line) {
                if (cell) cell.step();
            }
        }
        this.io.emit('step', this.getFlatGrid());
        this.stepCount++
    }

    flattenCell = (cell) => {
        return {x: cell.x, y: cell.y, color: cell.color};
    };

    getFlatGrid = () => {
        return this.grid.map((row) => {
            return row.map((cell) => {
                return cell ? this.flattenCell(cell) : null;
            });
        });
    };
    pause = () => {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null;
        } else {
            this.timer = setInterval(this.step, this.delay);
        }
    };
    next = () => {
       this.step()
    };
    
     slower = () => {
        if (this.delay > 5000) return;
        this.delay *= 1.2;
        clearInterval(this.timer);
        this.timer = setInterval(this.step, this.delay);
     }
     faster = () => {
        if (this.delay < 50) return;
        this.delay *= 0.8;
        clearInterval(this.timer);
        this.timer = setInterval(this.step, this.delay);
     }

    constructor({io, gridSize}){
        this.io = io;

        this.grid = emptyGrid(gridSize);

        //this.grid[10][10] = new Grass({x: 10, y: 10, grid: this.grid, game: this })
        //this.grid[4][1] = new GrassEater({x: 1, y: 4, grid: this.grid, game: this })
        // this.grid[5][7] = new GrassEater({x: 5, y: 7, grid: this.grid, game: this })
        //this.grid[50][50] = new bomb(({x: 50, y: 50, grid: this.grid, game: this }))
        //this.grid[5][1] = new PoisonedGrass(({x: 1, y: 5, grid: this.grid, game: this }))
        // this.grid[1][0] = new Rock(({x: 0, y: 1, grid: this.grid, game: this }))
        this.timer = setInterval(this.step, this.delay);
    }
}
