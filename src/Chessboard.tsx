import React, {useState, useEffect, useRef} from 'react';
import { Tile } from './Tile';
import { Position } from './Position';
import { Piece } from './Pieces';
import { PieceType, Player } from './Types';
import { Pawn } from './Pawn';

const vertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const grid = 100;

const pieceImages = {
  [Player.Black]: {
      [PieceType.Rook]: "../assets/black_rook.png",
      [PieceType.Knight]: "../assets/black_knight.png",
      [PieceType.Bishop]: "../assets/black_bishop.png",
      [PieceType.Queen]: "../assets/black_queen.png",
      [PieceType.King]: "../assets/black_king.png",
      [PieceType.Pawn]: "../assets/black_pawn.png"
  },
  [Player.White]: {
      [PieceType.Rook]: "../assets/white_rook.png",
      [PieceType.Knight]: "../assets/white_knight.png",
      [PieceType.Bishop]: "../assets/white_bishop.png",
      [PieceType.Queen]: "../assets/white_queen.png",
      [PieceType.King]: "../assets/white_king.png",
      [PieceType.Pawn]: "../assets/white_pawn.png"
  }
};

function createPieces(team: Player, row: number, pawnRow: number){
  const pieces: Piece[] = [
    PieceType.Rook,
    PieceType.Knight,
    PieceType.Bishop,
    PieceType.Queen,
    PieceType.King, 
    PieceType.Bishop,
    PieceType.Knight,
    PieceType.Rook
  ].map((type, col) => new Piece(new Position(col, row), pieceImages[team][type], type, team, false));
  // Push pawns in there
  pieces.push(...horizontal.map((file, col) => new Pawn(pieceImages[team][PieceType.Pawn], new Position(col, pawnRow), PieceType.Pawn, team, false )))

  return pieces;
}

const Chessboard = () => {

  const blackPieces = createPieces(Player.Black, 7, 6);
  const whitePieces = createPieces(Player.White, 0, 1);

    let initialBoard: JSX.Element[]  = [];

    for(let i = vertical.length - 1; i >= 0; i-- ){
      for(let j = 0; j < horizontal.length; j++){
        // We are checking the tileId just if its odd or even to know the color, dont try to find non more behind it
        const tileId = j + i + 2;
        let piece: any = null;
       
        blackPieces.forEach(p => {
          if(p.position.x === j && p.position.y === i){
            piece = p;
          }
        });

        whitePieces.forEach(p => {
          if(p.position.x === j && p.position.y === i){
            piece = p;
          }
        });

        const image = piece ? piece.img : null;

        initialBoard.push(
          <Tile tileId={tileId} highlight={false} img={image} key={`${horizontal[j]}${vertical[i]}`}/>
        )
      }
    };

  return (
    <div className='chessboard'>
      {initialBoard}
    </div>
    )
}

export default Chessboard;

