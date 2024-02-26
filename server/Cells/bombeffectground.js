import {Cell} from './index.js'

export class bombeffectground extends Cell {
    color = [139,69,19];
    time = 0

   
   

    step() {
        if (!super.step()) return; 
        this.time++;
        if (this.time > 70){
            this.die();
        }
    }

    constructor(options) {
        super(options);
    }
}