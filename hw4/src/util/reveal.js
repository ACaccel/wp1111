/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) => {
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    const changeStatus = (x, y) => {
      if(!board[x][y].flagged) {
        board[x][y].revealed = true;
        newNonMinesCount--;
      }
    }

    const checkStatus = (x, y) => {
      if(!board[x][y].revealed && !board[x][y].flagged)
        return true;
      return false;
    }
    
    const recReveal = (x, y) => {
      if(board[x][y].value === 0) {
        changeStatus(x, y);
        if(x - 1 >= 0 && checkStatus(x - 1, y)) // top
          recReveal(x - 1, y);
        if(x - 1 >= 0 && y + 1 < boardSize && checkStatus(x - 1, y + 1)) // top right
          recReveal(x - 1, y + 1);
        if(y + 1 < boardSize && checkStatus(x, y + 1)) // right
          recReveal(x, y + 1);
        if(x + 1 < boardSize && y + 1 < boardSize && checkStatus(x + 1, y + 1)) // bottom right
          recReveal(x + 1, y + 1);
        if(x + 1 < boardSize && checkStatus(x + 1, y)) // bottom
          recReveal(x + 1, y);
        if(x + 1 < boardSize && y - 1 >= 0 && checkStatus(x + 1, y - 1)) // bottom left
          recReveal(x + 1, y - 1);
        if(y - 1 >= 0 && checkStatus(x, y - 1)) // left
          recReveal(x, y - 1);
        if(x - 1 >= 0 && y - 1 >= 0 && checkStatus(x - 1, y - 1)) // top left
          recReveal(x - 1, y - 1);
      }
      else {
        changeStatus(x, y);
      }
      return;
    }
    
    recReveal(x, y);

    return { board, newNonMinesCount };
};
