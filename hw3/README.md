# Web Programming HW#3

Date: 2022.10.08

## 架構
    |-- index.js
        |-- main.js
            |-- header.js
            |-- section.js
                |-- input.js
                |-- list.js
            |-- footer.js
## main.js
- state：
    - mainCount：list的個數
    - mainUndone：未完成的list個數
## section.js
- ListInfo：定義每個list各自擁有的資料
    - id：list由上到下所在的編號
    - text：list的內容
    - checked：list是否已完成（若完成, checked = 1）
- state：
    - count, undone：同main.js（當值被更新過後，會呼叫main.js的function，去更新在main.js相對應的值）
    - secList：一個list的array，紀錄當前所有的lists
- addList：新增一筆資料成一個list
- handleCheck：處理當按下完成按鈕時，一些state值的更新。
## list.js
- handleClass：刪除線的樣式已在styles.css存成一個class，當checked的值被更新，確認是否要使用這個樣式的class
## input.js
- state：
    - text：輸入的字串
- pressKey：當按下enter時，呼叫section.js的addList，並更新text = ""
- changeText：當input box裡的字串有任何改變，更新text的值