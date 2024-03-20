export class Position{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    samePos(newPos: Position): boolean {
        return newPos.x === this.x && newPos.y === this.y;
    }
    
    clone(): Position{
        return new Position(this.x, this.y);
    }
}