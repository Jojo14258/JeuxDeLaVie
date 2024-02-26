import {Cell} from './index.js'

export class bombeffectstone extends Cell {
    color = ["#928e85"];

   
   

    step() {
        if (!super.step()) return; 
    }

    constructor(options) {
        super(options);
    }
}
