import React from 'react';
import { Position } from './Position';
import { PieceType, Player } from './Types';
import { Piece } from './Pieces';

export class Referee{
    isValidMove(position: Position, destination: Position, type: PieceType, team: Player): boolean{
       console.log('checking for moves');
       console.log(position);
       console.log(destination);
       console.log(team);
       if(type === PieceType.Pawn){

       }
        return false;
    }
};

// export const Referee = () => {
//   return (
//     <div>Referee</div>
//   )
// }
