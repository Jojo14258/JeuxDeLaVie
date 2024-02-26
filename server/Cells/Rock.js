import {Cell} from './index.js'

export class Rock extends Cell {
    color = [128, 128, 128];

   
   

    step() {
        if (!super.step()) return; 
    }

    constructor(options) {
        super(options);
    }
}