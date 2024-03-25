import React, {useState, useEffect, useRef} from 'react';
import { Tile } from './Tile';
import { Position } from './Position';
import { Piece } from './Pieces';
import { PieceType, Player } from './Types';
import { Pawn } from './Pawn';
import {Referee} from './Referee';

const vertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const grid: number = 100;
const referee = new Referee;

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
  pieces.push(...horizontal.map((file, col) => new Pawn(pieceImages[team][PieceType.Pawn], new Position(col, pawnRow), PieceType.Pawn, team, [], false )))

  return pieces;
}
let pieces: Piece[] = [...createPieces(Player.Black, 7, 6), ...createPieces(Player.White, 0, 1)];

const Chessboard = () => {
  // // ! Try to make it work with the state of piece array... working on te grid snapping still
  const [active, setActive] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1, -1));
  const [draggingPiece, setDraggingPiece] = useState<Piece | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  function grabPiece(e: React.MouseEvent){
    const target = e.target as HTMLElement;
    const board = boardRef.current;

    if(target.classList.contains('chess-piece') && board){
      const grabX = Math.floor((e.clientX - board.offsetLeft) / grid);
      // // ? It works just fine when i omit the 800 - out of there, so idk? it is there only for the position of Y to be inverted ?
      const grabY = Math.abs(
        Math.ceil((e.clientY - board.offsetTop - 800) / grid)
      );; 
      setGrabPosition(new Position(grabX, grabY));

      const x = e.clientX - grid / 2;
      const y = e.clientY - grid / 2;
      target.style.position = "absolute";
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
      
      setActive(target);  
      const piece = pieces.find(p => p.position.x === grabX && p.position.y === grabY);
      setDraggingPiece(piece || null)
    };
  };
  
  function movePiece(e: React.MouseEvent){
    const board = boardRef.current;
    if(active && board){
      const minX = board.offsetLeft - 25;
      const minY = board.offsetTop - 25;
      const maxX = board.offsetLeft + board.clientWidth - 75;
      const maxY = board.offsetTop + board.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      
      active.style.position = "absolute";
      // Checking if the x is lower or higher than the set extremes
      if(x < minX) {
        active.style.left = `${minX}px`;
      } else if (x > maxX) {
        active.style.left = `${maxX}px`;
      } else {
        active.style.left = `${x}px`;
      };
      
      if(y < minY){
        active.style.top = `${minY}px`;
      } else if(y > maxY){
        active.style.top = `${maxY}px`;
      } else{
        active.style.top = `${y}px`;
      };
    };
  };
  
  function dropPiece(e: React.MouseEvent){
    const board = boardRef.current;
    if(active && board){
      const x = Math.floor((e.clientX - board.offsetLeft) / grid) * grid ;
      const y = Math.floor((e.clientY - board.offsetTop) / grid) * grid ;
      // Checking (if im moving pawns) if there is possible enPassant move and finding the attacked piece by enPassant to remove it
      const enPassantDirection = draggingPiece?.team === Player.White ? 1 : -1;
      // ? Maybe could rewrite every new Position that uses this to the const of newPos (if i'll be still using all of them)
      const newPos = new Position(x / grid, 7 - y / grid)
      const enPassantPiece = pieces.find(p => p.position.y === newPos.y - enPassantDirection && p.position.x === newPos.x && (p as Pawn).enPassant)

      const enemyOnTile = pieces.find(p => p.samePos(newPos));
      if(draggingPiece) {
        const isEnPassant = referee.isEnPassant(grabPosition, newPos, pieces, draggingPiece.type, draggingPiece.team)
        const validMove = referee.isValidMove(grabPosition, newPos, draggingPiece.type, draggingPiece.team, pieces);
        if(isEnPassant){
          pieces = pieces.filter(p => p !== enPassantPiece)
          draggingPiece.position = newPos;
          active.style.left = `${board.offsetLeft + x }px`;
          active.style.top = `${board.offsetTop + y }px`;
        } else if(validMove){
          draggingPiece.position = newPos;
          active.style.left = `${board.offsetLeft + x }px`;
          active.style.top = `${board.offsetTop + y }px`;
          // Check if there is a enemy piece in the way of a validMove, so that you can take it with the pawn
          if(enemyOnTile) pieces = pieces.filter(p => p !== enemyOnTile);
        } else{
          active.style.position = "relative"; 
          active.style.removeProperty("top");
          active.style.removeProperty("left");
        }
    };
      setActive(null);
      setDraggingPiece(null);
    };
  };


    const board: JSX.Element[]  = [];

    for(let i = vertical.length - 1; i >= 0; i-- ){
      for(let j = 0; j < horizontal.length; j++){
        // We are checking the tileId just if its odd or even to know the color, dont try to find non more behind it
        const tileId = j + i + 2;
        let piece: any = null;
       
        pieces.forEach(p => {
          if(p.position.x === j && p.position.y === i){
            piece = p;
          }
        });
        const image = piece ? piece.img : undefined;
        const currentPiece = active != null ? pieces.find((p) => p.samePos(grabPosition)) : undefined;
        // const highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => p.samePos(new Position(i, j))) : false;

        board.push(
          <Tile tileId={tileId} highlight={false} img={image} key={`${horizontal[j]}${vertical[i]}`}/>
        )
      }
    };

  return (
    <div className='chessboard' onMouseDown={(e) => grabPiece(e)} onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => dropPiece(e)} ref={boardRef} >
      {board}
    </div>
    )
}

export default Chessboard;

