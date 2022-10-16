/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Modal.css'
import React, { useEffect, useState } from "react";

export default function Modal({ restartGame, backToHome, win }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    const displayModal = () => {
        if(render) {
            return(
                <div className='modal'>
                    <div className='modalWrapper' style = {{opacity: 0 }}></div>
                    <div className='modalContent' style = {{opacity: 1 }}>
                        <div className='modalResult'>
                            {win ? 'Win' : 'Game Over'}
                        </div>
                        <div className='modalBtnWrapper' >
                            <div className='modalBtn' onClick={restartGame}>
                                {win ? 'New Game' : 'Try Again'}
                            </div>
                            <div className='modalBtn' onClick={backToHome}> Back to Home </div>
                        </div>
                    </div>
                    <div className='modalWrapper' style = {{opacity: 0 }}></div>
                </div>
            );
        }
        return;
    };

    return (
        // Advanced TODO: Implement the structure of Modal
        // Useful Hint: style = {{opacity: 1 or 0 }}
        <>
            {displayModal()}
        </>
    );
}