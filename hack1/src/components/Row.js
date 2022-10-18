/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    const color = (letter) => {
        if(letter.color === 'green')
            return 'green';
        else if(letter.color === 'yellow')
            return 'yellow';
        else
            return 'grey';
    }

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div id={rowIdx + '-0'} key={rowIdx + '-0'} className={'Row-wordbox ' + color(guess[rowIdx][0])}>{guess[rowIdx][0]}</div>
                <div id={rowIdx + '-1'} key={rowIdx + '-1'} className={'Row-wordbox ' + color(guess[rowIdx][0])}>{guess[rowIdx][1]}</div>
                <div id={rowIdx + '-2'} key={rowIdx + '-2'} className={'Row-wordbox ' + color(guess[rowIdx][0])}>{guess[rowIdx][2]}</div>
                <div id={rowIdx + '-3'} key={rowIdx + '-3'} className={'Row-wordbox ' + color(guess[rowIdx][0])}>{guess[rowIdx][3]}</div>
                <div id={rowIdx + '-4'} key={rowIdx + '-4'} className={'Row-wordbox ' + color(guess[rowIdx][0])}>{guess[rowIdx][4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;