let called = []
let win = false;
let filledCard = document.getElementsByTagName("TD")
let card=[];
let gameMode = "";
let autoPlay=null;

let createNumber = (array, pos, min, max)=>{
    do{
        if(max != 15){
            boxNum = Math.floor(Math.random()*(max-min))
            boxNum = boxNum + min + 1
        }else{
            boxNum = Math.floor(Math.random()*14)+1
        }
    }while (array.includes(boxNum));
    array.push(boxNum)
    let cardPos = "box"+pos
    let selected = false
    card.push({cardPos, boxNum, selected})
    document.getElementById(cardPos).innerHTML=boxNum
}

let newCard = (mode)=>{
    gameMode = mode;
    let existingNums = [];
    for (let index = 0; index < 24; index++) {
        if (index >= 0 && index <=4) {
            if(existingNums.length == 0){
                existingNums.push(Math.floor(Math.random()*15)+1)
            }
            createNumber(existingNums, index, 1, 15)
        }else if(index >= 5 && index <=9){
            createNumber(existingNums, index, 16, 30)
        }else if(index >= 10 && index <=13){
            createNumber(existingNums, index, 31, 45)
        }else if(index >= 14 && index <=18){
            createNumber(existingNums, index, 46, 60)
        }else{
            createNumber(existingNums, index, 61, 75)
        }
    }
    document.getElementById('bingotable').style.visibility="visible"
    document.getElementById('bingotable').classList.add("visibleCard")
    document.getElementById("lleno").remove();
    document.getElementById("linea").remove();
    document.getElementById("modalidad-title").remove();
    autoPlay = setInterval(callNumber, 500);
    return card
}

let getCard = ()=> { return card } 


let checkBingoOnline = () => {

    // Validation for columns
    if((card[0].selected && card[1].selected && card[2].selected && card[3].selected && card[4].selected)==true){
        return "c"
    }
    if((card[5].selected && card[6].selected && card[7].selected && card[8].selected && card[9].selected)==true){
        return "c"
    }
    if((card[10].selected && card[11].selected && card[12].selected && card[13].selected)==true){
        return "c"
    }
    if((card[14].selected && card[15].selected && card[16].selected && card[17].selected && card[18].selected)==true){
        return "c"
    }
    if((card[19].selected && card[20].selected && card[21].selected && card[22].selected && card[23].selected)==true){
        return "c"
    }
        
    //Validation for Rows
    if((card[0].selected && card[5].selected && card[10].selected && card[14].selected && card[19].selected)==true){
        return "f"
    }
    if((card[1].selected && card[6].selected && card[11].selected && card[15].selected && card[20].selected)==true){
        return "f"
    }
    if((card[2].selected && card[7].selected && card[16].selected && card[21].selected)==true){
        return "f"
    }
    if((card[3].selected && card[8].selected && card[12].selected && card[17].selected && card[22].selected)==true){
        return "f"
    }
    if((card[4].selected && card[9].selected && card[13].selected && card[18].selected && card[23].selected)==true){
        return "f"
    }
    
    
    //Validation for Diagonal
    if((card[0].selected && card[6].selected && card[17].selected && card[23].selected)==true || (card[19].selected && card[15].selected && card[8].selected && card[4].selected)==true){
        return "d"
    }

    return "";
}

let checkBingoFull = () =>{
    for (element of filledCard) {
        if(element.getAttribute("class") != "selected" && element.getAttribute("id")!="free"){
            win = false
            break
        }else{
            win = true
        }
    }
    return win
}

let callNumber = ()=>{
    do{
        newNum = Math.floor(Math.random()*75)+1
    }while(called.includes(newNum) && called.length<=74)
    if(called.length<=74){
        called.push(newNum);
        document.getElementById("newNumber").innerHTML=newNum
        document.getElementById('called').innerHTML=called.sort((a, b)=> {return a-b})
    }
    card.find(item => {
        if(item.boxNum == newNum){
            let box = document.getElementById(item.cardPos)
            item.selected = true
            if(item.selected){
                box.classList.add("selected")
            }

        } 
    })
    if(gameMode == "line"){
        if(checkBingoOnline() !== ""){
            clearInterval(autoPlay);
            document.getElementById("won").innerHTML="HAS GANADO!"
        }
    }else{
        if(checkBingoFull()){
            clearInterval(autoPlay);
            document.getElementById("won").innerHTML="HAS GANADO!"
        }
    }
}



