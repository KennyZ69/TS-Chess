import { Position } from './Position';
import { Player } from './Types';
import { Piece } from './Pieces';
import { isTileOccupied, tileOccupiedByOpponent } from './TileOccupation';
import { Pawn } from './Pawn';

export const pawnMove = (startPos: Position, destination: Position, team: Player, boardState: Piece[]): boolean => {
    const pawnRow = team === Player.White ? 1 : 6;
    const moveDirection = team === Player.White ? 1 : -1;
    
    // Logic of the movement, checking if its the first move o
    if (startPos.x === destination.x && startPos.y === pawnRow && destination.y - startPos.y === 2 * moveDirection){
        if( !isTileOccupied(destination, boardState) && !isTileOccupied(new Position(destination.x, destination.y - moveDirection), boardState)) return true;
    } else if(startPos.x === destination.x && destination.y - startPos.y === moveDirection) {
            if( !isTileOccupied(destination, boardState)) return true;
        }
        // Attacking logic now
        else if((destination.x - startPos.x === -1 && destination.y - startPos.y === moveDirection) || (destination.x - startPos.x === 1 && destination.y - startPos.y === moveDirection)){
            if(tileOccupiedByOpponent(destination, boardState, team)) return true;
        }
        return false;
};

export const possiblePawnMoves = (piece: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
    const pawnRow = piece.team === Player.White ? 1 : 6;
    const moveDirection = piece.team === Player.White ? 1 : -1;
    const {x, y} = piece.position;

    const pushMove = (x: number, y: number, condtion: boolean) => {
        const newPosition = new Position(x, y);
        if(condtion) possibleMoves.push(newPosition);
    };
    // Add Normal move (by 1 tile)
    pushMove(x, y + moveDirection, !isTileOccupied(new Position(x, y + moveDirection), boardState));
    // Special move (by 2 tiles at the start)
    if(y === pawnRow){
        pushMove(x, y + 2 * moveDirection, !isTileOccupied(new Position(x, y + 2 * moveDirection), boardState));
    };
    // Attacking moves
    const attackPositions = [new Position(x- 1, y + moveDirection), new Position(x + 1, y + moveDirection)];

    attackPositions.forEach(pos => {
        if(tileOccupiedByOpponent(pos, boardState, piece.team)){
            possibleMoves.push(pos);
        } else {
            const pieceForEnPassant = boardState.find(p => p.samePos(new Position(pos.x - moveDirection, pos.y)));
            if(pieceForEnPassant && (pieceForEnPassant as Pawn).enPassant){
                possibleMoves.push(pos);
            }
        }
    });
    return possibleMoves;
}