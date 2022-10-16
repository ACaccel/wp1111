# Web Programming HW#4

Date: 2022.10.16

*備註：由於我電腦node.js v18版本的問題，我是重新create-react-app hw4建置，因此package.json裡一些package的版本跟助教提供的不太一樣，並且有刪除一些cypass等不必要的package與添加seedrandom。若yarn/npm install後跑不起來，可以用助教提供的package.json覆蓋* (`∀´)σ

## 基本要求
- switchPage(MineSweeper.js): 當按下start按鈕時，切換顯示homePage與Board

- freshBoard(Board.js): 將createBoard回傳的值設定到Board, nonMineCount, 和MineLocations

- displayCell(Board.js): map出整個board

- updateFlag(Board.js): 插旗子，另外當旗子已經插到地雷數量的上限，就不能在插旗，除非拔掉其他旗子

- reveal.js: 下面進階要求的部份會提到

## 進階要求
- displayPanel(HomePage.js): 控制panel的顯示，並將整個panel刻在controlPanel。另外，當panel被關閉後若再被開啟，mine和boardsize的值會被重設回初始值

- reveal.js: 利用dfs從按下的起始點開始，往外持續直到search到該格的值不為0時停止，並且會避開有插旗子的格子（因此若利用旗子將空格區域切開，將只會reaveal一半的區域）

- modal.js: 負責遊戲結束時的畫面處理

- DashBoard.js: 計時器，time為遊戲開始後經過的時間，sTime為每次踩一個地雷當下的時間，因此當gameOver時顯示的會是踩到地雷的時間（最後一次踩）
