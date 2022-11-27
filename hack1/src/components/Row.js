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
    const color = (guess, id) => {
        if(guess === undefined)
            return '';
        else if(guess[id].color === 'green')
            return ' green';
        else if(guess[id].color === 'yellow')
            return ' yellow';
        else
            return ' grey';
    }

    const checkDefine = (guess, id) => {
        if(guess === undefined)
            return;
        else
            return guess[id].char;
    }

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div id={rowIdx + '-0'} key={rowIdx + '-0'} className={'Row-wordbox' + color(guess, 0)}>{checkDefine(guess, 0)}</div>
                <div id={rowIdx + '-1'} key={rowIdx + '-1'} className={'Row-wordbox' + color(guess, 1)}>{checkDefine(guess, 1)}</div>
                <div id={rowIdx + '-2'} key={rowIdx + '-2'} className={'Row-wordbox' + color(guess, 2)}>{checkDefine(guess, 2)}</div>
                <div id={rowIdx + '-3'} key={rowIdx + '-3'} className={'Row-wordbox' + color(guess, 3)}>{checkDefine(guess, 3)}</div>
                <div id={rowIdx + '-4'} key={rowIdx + '-4'} className={'Row-wordbox' + color(guess, 4)}>{checkDefine(guess, 4)}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;