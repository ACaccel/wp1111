# Web Programming HW#1

Date: 2022.09.17

## 1. 基本要求

- left-side包含了主畫面（你）的結構，從上至下以flex排列了靜音顯示、center-profile、釘選圖示。center-profile除了包含圓形的使用者圖像，還有三個按鈕的功能欄。

- right-side構成了五位參與者的畫面，由block把每位參與者的畫面包起來。

- bottom構成下方一整條的bar，bottom-left是時間與會議代碼的截圖，bottom-center是中下那五個按鈕，bottom-right是右下的五個按鈕。每個按鈕的div都包含按鈕本身的圖案與各自的提示訊息，詳細在進階要求的部分會講。

-  主畫面三個按鈕的功能欄利用opacity的改變來達成淡入淡出的效果。

## 2. 進階要求

- 當底部的功能按鈕被hover，會在按鈕上方顯示提示。各自的按鈕圖示與提示對話框是被各自包成一個div，這些div再排列成bottom-center或bottom-right。每個提示對話框在按鈕未被hover時opacity設為0，當被hover時再顯示。

- 麥克風靜音按鈕的切換效果，是利用checkbox與lable來實作，透過checkbox的點選來切換label的background-image，實現按鈕點擊的效果。

- RWD的部分相較於真正google meet的設計簡化了許多，高度與寬度的變化門檻各只有兩個，高度是550px與430px，寬度是1000px與780px。

    - 高度 < 550px：改變left-side與right-side在寬度上的比例配置，right-side的寬度變大，五位參與者畫面為橫向排列。


    - 高度 < 430px：直接讓top消失，整個版面只剩下包含功能按鈕與會議資訊的bottom。


    - 寬度 < 1000px：right-side消失，top的版面只剩下主畫面。


    - 寬度 < 430px：bottom-left與bottom-right消失，功能按鈕剩下正中五個主要按鈕（bottom-center）
