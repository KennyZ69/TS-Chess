import { Player, PieceType } from "./Types";
import { Position } from "./Position";

export class Piece{ 
    img: string;
    position: Position;
    type: PieceType;
    team: Player;
    possibleMoves?: Position[];
    // ? Id say the possibleMoves is neccessary but not sure about the hasMoved
    hasMoved: boolean;

    constructor(position: Position, img: string, type: PieceType, team: Player, hasMoved: boolean, possibleMoves: Position[] = []){
        // // ! Need to rename the pictures like this
        this.img = `assets/${team}_${type}.png`;
        this.position = position;
        this.type = type;
        this.team = team;
        this.possibleMoves = this.possibleMoves;
        this.hasMoved = hasMoved;      
    };

    samePos (newPos: Position): boolean{
        return this.position.samePos(newPos);
    };
    
    clone(): Piece{
        return new Piece(this.position.clone(), this.img, this.type, this.team, this.hasMoved, this.possibleMoves?.map(m => m.clone()));
    }
}