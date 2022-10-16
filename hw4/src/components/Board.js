/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';

const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(-1);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // reveal mine before displaying modal
    useEffect(() => {
        let bomb = false;
        for (let i = 0; i < mineLocations.length; i++) {
            let mine = board[mineLocations[i][0]][mineLocations[i][1]];
            if(mine.revealed) {
                bomb = true;
                for(let i = 0; i < boardSize; i++){
                    for(let j = 0; j < boardSize; j++) {
                        if(board[i][j].value === '💣')
                            board[i][j].revealed = true;
                    }
                }
                setGameOver(true);
            }
        }
        if(nonMineCount === 0 && !bomb) {
            setWin(true);
            setGameOver(true);
        }
    }, [nonMineCount]);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setNonMineCount(boardSize * boardSize - mineNum);
        setMineLocations(newBoard.mineLocations);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
        setRemainFlagNum(0);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if(!newBoard[x][y].revealed) {
            if(newBoard[x][y].flagged) {
                newBoard[x][y].flagged = false;
                newFlagNum--;
            }
            else {
                if(newFlagNum < mineNum) {
                    newBoard[x][y].flagged = true;
                    newFlagNum++;
                }
            }
            setBoard(newBoard);
            setRemainFlagNum(newFlagNum);
        }

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMinesCount = nonMineCount;

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        let newReveal = revealed(newBoard, x, y, newNonMinesCount, boardSize);
        setBoard(newReveal.board);
        setNonMineCount(newReveal.newNonMinesCount);
    };

    const displayCell = board.map((row, rowIdx) => <div id={`row${rowIdx}`} style={{display: 'flex'}}>
                        {row.map((col, colIdx) => 
                            <Cell rowIdx={rowIdx} 
                                colIdx={colIdx} 
                                detail={col} 
                                updateFlag={updateFlag} 
                                revealCell={revealCell} />
                        )}
                    </div>);

    return (
        <>
            <div className='boardPage'>
                <div className='boardWrapper'>
                    <div className='boardContainer'>
                        <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} mineNum={mineNum} nonMineCount={nonMineCount} />
                        {displayCell}
                    </div>
                </div>
            </div>
            {gameOver ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : <></>}
        </>
    );
}

export default Board