/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    const list = [0, 1, 2, 3, 4, 5];
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {list.map(l => {
                return(l === turn ? 
                    <CurRow id={'row_' + l} key={'row_' + l} curGuess={curGuess} rowIdx={l}></CurRow> 
                    : <Row id={'row_' + l} key={'row_' + l} guess={guesses[l]} rowIdx={l}></Row>)})}
        </div>
    )
};
export default Board;
