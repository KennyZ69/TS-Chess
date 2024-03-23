import { Position } from './Position';
import { PieceType, Player } from './Types';
import { Piece } from './Pieces';
import { isTileOccupied, tileOccupiedByOpponent, tileEmptyOrOccupiedByOpponent } from './TileOccupation';
import { pawnMove } from './pawnRules';

export class Referee{
    

    isValidMove(position: Position, destination: Position, type: PieceType, team: Player, boardState: Piece[]): boolean{
        // if(type === PieceType.Pawn){
        //     return pawnMove(position, destination, team, boardState);
        // } else{
        //     return false;
        // } 
       if(type === PieceType.Pawn && team === Player.White){
            if(position.y === 1){
                if(position.x === destination.x && (destination.y - position.y === 1 || destination.y - position.y === 2)){
                    if(!isTileOccupied(destination, boardState)){
                        console.log('valid white move there');
                        return true;
                    }
                }
            } else if(position.x === destination.x && destination.y - position.y === 1){
                if(!isTileOccupied(destination, boardState)) {
                    return true;
                }
            }
       }
       else if(type === PieceType.Pawn && team === Player.Black){
        if(position.y === 6){
            if(position.x === destination.x && (destination.y - position.y === -1 || destination.y - position.y === -2)){
                console.log('valid black move right there')
                return true
            }
        } else if(position.x === destination.x && position.y - destination.y === 1){
            return true;
        }
       }
        return false;
    }
};

// export const Referee = () => {
//   return (
//     <div>Referee</div>
//   )
// }
