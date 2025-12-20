let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let NewGameBtn = document.querySelector("#new-game");
let msgContainer= document.querySelector(".msg-container");
let msg =document.querySelector("#msg");
let turn = true; // x, o

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box)=> {
    box.addEventListener("click", ()=>{
        if(turn){
            box.innerHTML="O";
            turn = false;
        }else{
            box.innerHTML= "X";
            turn = true;
        }
        box.disabled= true;
        checkWinner();
    });
});
const disableboxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const resetGame = ()=>{
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled= false;
        box.innerHTML="";
    }
};

const showWinner = (winner)=> {
     msg.innerHTML =`congratulation, Winner is ${winner}`;
     msgContainer.classList.remove("hide");
     disableboxes();
};
const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerHTML;
        let posVal2 = boxes[pattern[1]].innerHTML;
        let posVal3 = boxes[pattern[2]].innerHTML;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                return; // winner mil gaya → yahin stop
            }
        }
    }

    // agar koi box khaali hai to draw nahi
    for (let box of boxes) {
        if (box.innerHTML === "") {
            isDraw = false;
            break;
        }
    }

    // sab bhare hue + koi winner nahi
    if (isDraw) {
        showDraw();
    }
};
const showDraw = () => {
    msg.innerHTML = "Match Draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
};
NewGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);




