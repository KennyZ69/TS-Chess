import { PieceType, Player } from "./Types";
import { Piece } from "./Pieces";
import { Position } from "./Position";

export class Pawn extends Piece {
    // enPassant?: boolean; make the logic for it
    constructor(
        img: string,
        position: Position,
        type: PieceType,
        team: Player,
        hasMoved: boolean,
    ) {
        super(position, img, PieceType.Pawn, team, hasMoved );
    }
}