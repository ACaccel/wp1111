/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    //let letters = curGuess.split('');
    const fill = (emt) => {
        if(emt === undefined)
            return 'Row-wordbox';
        else
            return 'Row-wordbox filled';
    }
    const checkDefine = (emt) => {
        if(emt === undefined)
            return;
        else
            return emt;
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div id={rowIdx + '-0'} key={rowIdx + '-0'} className={fill(curGuess[0])}>{checkDefine(curGuess[0])}</div>
                <div id={rowIdx + '-1'} key={rowIdx + '-1'} className={fill(curGuess[1])}>{checkDefine(curGuess[1])}</div>
                <div id={rowIdx + '-2'} key={rowIdx + '-2'} className={fill(curGuess[2])}>{checkDefine(curGuess[2])}</div>
                <div id={rowIdx + '-3'} key={rowIdx + '-3'} className={fill(curGuess[3])}>{checkDefine(curGuess[3])}</div>
                <div id={rowIdx + '-4'} key={rowIdx + '-4'} className={fill(curGuess[4])}>{checkDefine(curGuess[4])}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
