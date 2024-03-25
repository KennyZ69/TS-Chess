import { Position } from './Position';
import { PieceType, Player } from './Types';
import { Piece } from './Pieces';
import { isTileOccupied, tileOccupiedByOpponent, tileEmptyOrOccupiedByOpponent } from './TileOccupation';
import { pawnMove } from './pawnRules';
import { Pawn } from './Pawn';

export class Referee{
    isEnPassant(position: Position, destination: Position, boardState: Piece[], type: PieceType, team: Player): boolean{
        const moveDirection = team === Player.White ? 1 : -1;
        // ! the dragging piece here always will be a pawn so thats the assertion
        const draggingPiece = boardState.find(p => p.samePos(position)) as Pawn;
        // This is checking whether the dragging piece did only a special move or if it has already done more (or less, in this type of matter)
        if(Math.abs(position.y - destination.y) === 2){
            console.log('en passant true');
            draggingPiece.enPassant = true
        } else{
            draggingPiece.enPassant = false
        }
        
        if(type === PieceType.Pawn){
            if((position.x - destination.x === 1 || position.x - destination.x === -1) && destination.y - position.y === moveDirection){
                // Finding the piece im attacking
                const attackedPiece = boardState.find(p => p.position.x === destination.x && p.position.y === destination.y - moveDirection && (p as Pawn).enPassant)
                console.log(attackedPiece)
                if(attackedPiece) {
                    return true;
                }
            }
        }
        return false;
    }

    isValidMove(position: Position, destination: Position, type: PieceType, team: Player, boardState: Piece[]): boolean{
        if(type === PieceType.Pawn){
            return pawnMove(position, destination, team, boardState);
        } return false; 
    }
};
