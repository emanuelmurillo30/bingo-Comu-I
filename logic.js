let called = []
let win = false;
let filledCard = document.getElementsByTagName("TD")

let newCard = ()=>{
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
}

let createNumber = (array, pos, min, max)=>{
    do {
        if(max != 15){
            boxNum = Math.floor(Math.random()*(max-min))
            boxNum = boxNum + min + 1
        }else{
            boxNum = Math.floor(Math.random()*14)+1
        }
    } while (array.includes(boxNum));
    array.push(boxNum)
    document.getElementById("box"+pos).innerHTML=boxNum
}

let checkBingo = () =>{
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
}

document.addEventListener("click", function(event){
    if (event.target.tagName == "TD"){
        if(called.includes(parseInt(event.target.innerHTML))){
            event.target.classList.add("selected");
            if(checkBingo()){
                alert("GANASTE")
            }
        }
    }
}, false);

