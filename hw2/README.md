# Web Programming HW#2

Date: 2022.10.01

## 1. HTML

- 每個參與者畫面的內容都被包在outer-block之下，藉著增減這個outer-block或修改outer-block之內的內容來實現之後javascript的功能。
- 所有參與者畫面分成left-side與right-side，left-side為被釘選的畫面，right-side為五位參與者排列的畫面。若取消釘選，left-side會消失，所有參與者都排列在100%寬度的right-side。若參與者只剩下「你」，right-side會消失，「你」的畫面會充滿在100%寬度的left-side。
## 2. CSS
- 保留有hw1進階要求的部分，包含：hover時浮現的按鈕說明提示框、麥克風按鈕的切換功能、依照視窗大小進行的排版改變（直接沿用，因此在取消釘選時畫面可能會稍微醜一點 -_-|||）。
## 3. JavaScript
- 整個js節點的控制主要透過routerBlock與louterBlock兩個變數去增減或修改下層的資料，另外兩個變數lSide與rSide只負責其本身的樣式變化。
- 總共有6個helper fucntions：
    - nodeChild：給定當前node與一個child list（表示目標child相對當前node的層級與位置），返回目標child。
    - addClass：為目標child新增classname。
    - removeClass：為目標child刪減classname。
    - modLastBlock：由於right-side參與者數量為奇數時，最後一個畫面會比較寬，因此藉此為最後一個畫面刪減帶有該效果的class。
    - hideKick：控制kick的按鈕是否要顯示。
    - reLeftSide：恢復left-side的顯示，以及將特定block從right-side移至left-side。
- multifunc：控制5個right-side畫面的觸發事件，包含：
    - kick：點擊kick按鈕
    - rightClick：點擊profile中間浮現的橢圓形按鈕，並依照left-side有無顯示有不同的行為
- leftClick：控制點擊left-side的profile中間浮現的橢圓形按鈕的觸發事件。