import { Position } from './Position';
import { Player } from './Types';
import { Piece } from './Pieces';
import { isTileOccupied, tileOccupiedByOpponent } from './TileOccupation';

export const pawnMove = (startPos: Position, destination: Position, team: Player, boardState: Piece[]): boolean => {
    const pawnRow = team === Player.White ? 1 : 6;
    const moveDirection = team === Player.White ? 1 : -1;

    // ! For some fucking reason, when i input this into to ref file, i cannot move the black pieces up 2 tiles
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
}