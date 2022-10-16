/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver, mineNum, nonMineCount }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);
  
  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  //time
  useEffect(() => {
    if(!gameOver) {
      timeIntervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    else {
      setTime(0);
    }
    return () => clearInterval(timeIntervalId);
  }, [gameOver]);

  //sTime
  useEffect(() => {
    setSTime(time);
  }, [nonMineCount]);

  return (
    <div className="dashBoard">
      <div id='dashBoard_col1'>
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {mineNum - remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2'>
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
