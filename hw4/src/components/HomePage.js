/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, setMineNum, setBoardSize, mineNum, boardSize}) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  useEffect(() => {
    if(mineNum > boardSize * boardSize)
      setError(true);
    else
      setError(false);
  }, [mineNum, boardSize]);

  useEffect(() => {
    setMineNum(10);
    setBoardSize(8);
  }, [showPanel]);

  const displayPanel = () => {
    if(showPanel) {
      return controlPanel;
    }
    else
      return;
  };

  const controlPanel = 
  <div className='controlWrapper'>
    <div className='error' style={error ? { opacity: 1, color: '#880000' } : { opacity: 0 }}>
      ERROR: Mines number and board size are invalid! 
    </div>
    <div className='controlPanel'>
      <div className='controlCol'>
        <p className='controlTitle'> Mines Number </p>
        <input type='range' 
              onInput={(e) => mineNumOnChange(e.target.value)} 
              step='1' 
              min='5' 
              max='200' 
              defaultValue='10' />
        <p className='controlNum' style={error ? { color: '#880000' } : {}}> {mineNum} </p>
      </div>
      <div className='controlCol'>
        <p className='controlTitle'> Board Size (nxn) </p>
        <input type='range' 
              onInput={(e) => boardSizeOnChange(e.target.value)} 
              step='1' 
              min='5' 
              max='20' 
              defaultValue='8' />
        <p className='controlNum' style={error ? { color: '#880000' } : {}}> {boardSize} </p>
      </div>
    </div>
  </div>;

  return (
    <div className='HomeWrapper'>
      <p className='title'> MineSweeper </p>
      {/* Basic TODO:  Implemen start button */}
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <button className='btn' onClick={startGameOnClick} disabled={error}> Start Game </button>
      <div className='controlContainer'>
        <button className='btn' onClick={() => {setShowPanel(!showPanel)}}> Difficulty Adjustment </button>
      </div>
      {displayPanel()}
    </div>
  );
}
export default HomePage;   