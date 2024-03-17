import React from 'react';

interface Props{
    tileId: number,
    img?: string,
    highlight: boolean
}

export const Tile = ({ tileId, img, highlight }: Props) => {

    // This checks wheter the tile should be black or white and other props of it using conditional statement
    const className = ['tile',
        tileId % 2 === 0 && 'black-tile',
        tileId % 2 !== 0 && 'white-tile',
        highlight && 'tile-highlight',
        img && 'tile-with-piece'    
        ].filter(Boolean).join(' ');

  return (
    <div className={className}>
        {img && <div style={{ backgroundImage: `url(${img})` }} className='chess-piece'></div>}
        {/* <img src="../assets/black_pawn.png" alt="" /> */}
    </div>
  )
}
