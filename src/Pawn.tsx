import { PieceType, Player } from "./Types";
import { Piece } from "./Pieces";
import { Position } from "./Position";

export class Pawn extends Piece {
    enPassant?: boolean;
    constructor(
        img: string,
        position: Position,
        type: PieceType,
        team: Player,
        possibleMoves: Position[] = [],
        hasMoved: boolean,
        enPassant?: boolean,
    ) {
        super(position, img, PieceType.Pawn, team, hasMoved, possibleMoves );
        this.enPassant = enPassant
    }

    clone(): Pawn{
        return new Pawn(this.img, this.position.clone(), this.type, this.team, this.possibleMoves?.map(m => m.clone()), this.hasMoved)
    }
}