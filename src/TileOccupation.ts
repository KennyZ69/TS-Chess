import { Piece } from "./Pieces";
import { Position } from "./Position";
import { Player } from "./Types";

export const isTileOccupied = (position: Position, boardState: Piece[]): boolean => {
    const tile = boardState.find(p => p.samePos(position));
    if(tile){
        return true;
    } else return false;
};

export const tileOccupiedByOpponent = (position: Position, boardState: Piece[], team: Player): boolean => {
    const tile = boardState.find(p => p.samePos(position) && p.team !== team);
    if(tile){
        return true;
    } else return false;
};

export const tileEmptyOrOccupiedByOpponent = (position: Position, boardState: Piece[], team: Player): boolean => {
    return ( !isTileOccupied(position, boardState) || tileOccupiedByOpponent(position, boardState, team));
};