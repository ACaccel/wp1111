let lSide = document.getElementsByClassName("left-side")[0];
let rSide = document.getElementsByClassName("right-side")[0];
let routerBlock = document.getElementsByClassName("outer-block");
let louterBlock = document.getElementsByClassName("left-outer-block")[0];
let leftSideDisplay = true;

let nodeChild = (node, list) => {
    for (let i = 0; i < list.length; i++)
        node = node.children[list[i]];
    return node;
};
let addClass = (node, list, className) => {
    let curnode = nodeChild(node, list);
    curnode.classList.add(className);
};
let removeClass = (node, list, className) => {
    let curnode = nodeChild(node, list);
    curnode.classList.remove(className);
};
let modLastBlock = (op) => {
    if(op === "add"){
        addClass(routerBlock[routerBlock.length-1], [], "outer-block-last");
        addClass(routerBlock[routerBlock.length-1], [0], "block-last");
        addClass(routerBlock[routerBlock.length-1], [0, 1], "right-profile-big");
        addClass(routerBlock[routerBlock.length-1], [0, 1, 1], "rtb-big");
    }
    else if (op === "remove"){
        removeClass(routerBlock[routerBlock.length-1], [], "outer-block-last");
        removeClass(routerBlock[routerBlock.length-1], [0], "block-last");
        removeClass(routerBlock[routerBlock.length-1], [0, 1], "right-profile-big");
        removeClass(routerBlock[routerBlock.length-1], [0, 1, 1], "rtb-big");
    }
    else
        alert("fail to modify last-block");
}
let hideKick = (cur) => {
    if(nodeChild(cur, [0, 2, 0]).innerHTML === "你"){
        nodeChild(cur, [0, 0, 0]).style.display = "none";
        nodeChild(cur, [0, 0]).style.justifyContent = "flex-end";
    }
    else{
        nodeChild(cur, [0, 0, 0]).style.display = "block";
        nodeChild(cur, [0, 0]).style.justifyContent = "space-between";
    }
}
let reLeftSide = (cur) => {
    nodeChild(louterBlock, [0, 1, 0]).src = nodeChild(cur, [0, 1, 0]).src;
    nodeChild(louterBlock, [0, 2, 1]).innerHTML = nodeChild(cur, [0, 2, 0]).innerHTML;
    lSide.style.display = "block";
    leftSideDisplay = true;
    rSide.removeChild(cur);
}
let multifunc = (cur) => {
    //click to remove participants from the meet
    let curouterBlock = cur;
    let kick = nodeChild(curouterBlock, [0, 0, 0]);
    kick.addEventListener("click", function(){
        rSide.removeChild(curouterBlock);
        if(routerBlock.length === 1 && nodeChild(routerBlock[0], [0, 2, 0]).innerHTML === "你"){
            reLeftSide(routerBlock[0]);
            rSide.style.display = "none";
            lSide.style.width = "100%";
        }
        if(routerBlock.length === 0){
            rSide.style.display = "none";
            lSide.style.width = "100%";
        }
        //the odded last block on rightSide will have a wider block
        if(leftSideDisplay && routerBlock.length % 2 === 1){
            modLastBlock("add");
        }
        if(routerBlock.length % 2 === 0){
            modLastBlock("remove");
        }
    });
    //when clicking right-three-button
    let rightClick = nodeChild(curouterBlock, [0, 1, 1]);
    rightClick.addEventListener("click", function(){
        if(leftSideDisplay){
            //change the participant in right-side with the one in left-side
            let mainProSrc = nodeChild(louterBlock, [0, 1, 0]).src;
            nodeChild(louterBlock, [0, 1, 0]).src = nodeChild(curouterBlock, [0, 1, 0]).src;
            nodeChild(curouterBlock, [0, 1, 0]).src = mainProSrc;
            let mainUserName = nodeChild(louterBlock, [0, 2, 1]).innerHTML;
            nodeChild(louterBlock, [0, 2, 1]).innerHTML = nodeChild(curouterBlock, [0, 2, 0]).innerHTML;
            nodeChild(curouterBlock, [0, 2, 0]).innerHTML = mainUserName;
            //hide the kick button on your block
            hideKick(curouterBlock);
        }
        else{
            //restore left-side and renew informations
            reLeftSide(curouterBlock);
            //restore the style of the last block
            if(routerBlock.length % 2 === 1){
                modLastBlock("add");
            }
            else if(routerBlock.length % 2 === 0){
                modLastBlock("remove");
            }
            //restore right-side style
            rSide.style.width = "30%";
            for (let j = 0; j < routerBlock.length; j++) {
                removeClass(routerBlock[j], [], "outer-block-new");
                removeClass(routerBlock[j], [0, 1], "right-profile-new");
                removeClass(routerBlock[j], [0, 1, 1], "rtb-new");
            }
        }
    });
};
//apply multiple operations to all blocks
for (let i = 0; i < routerBlock.length; i++) {
    multifunc(routerBlock[i]);
}
//operations about leftSide
let leftClick = nodeChild(louterBlock, [0, 1, 1]);
leftClick.addEventListener("click", function(){
    //cancel outer-block-last style
    if(routerBlock.length % 2 === 1) {
        modLastBlock("remove");
    }
    //add the participant in leftSide as a new node to right-side and hide leftSide
    let newNode = routerBlock[0].cloneNode(true);
    nodeChild(newNode, [0, 1, 0]).src = nodeChild(louterBlock, [0, 1, 0]).src;
    nodeChild(newNode, [0, 2, 0]).innerHTML = nodeChild(louterBlock, [0, 2, 1]).innerHTML;
    hideKick(newNode);
    rSide.appendChild(newNode);
    lSide.style.display = "none";
    leftSideDisplay = false;
    //renew rightSide style
    rSide.style.width = "100%";
    let size = routerBlock.length;
    for (let i = 0; i < size; i++) {
        addClass(routerBlock[i], [], "outer-block-new");
        addClass(routerBlock[i], [0, 1], "right-profile-new");
        addClass(routerBlock[i], [0, 1, 1], "rtb-new");
    }
    //make all operations work for the newblock
    multifunc(newNode);
});