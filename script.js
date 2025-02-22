// get access of elements
let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#new-btn");
let cong = document.querySelector("#msg-cong");
let win = document.querySelector("#msg-win");

// required variable
let player = true;
let clickCount = 0;
let draw = true;

// store the winning condition
const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8]
];


// Check and show winner (main logic)
const disableBox = () => {   // after win empty box doesn't clicked
    for(let tick of boxes) {
        tick.disabled = true;
    }
};
const showWinner = (winner) => {    // show winner
    cong.innerText = `Congratulation!`;
    win.innerText = `Player : ${winner} is winner...`;
    disableBox();   // after win empty box doesn't clicked
    draw = false;   // for draw condition
};
const checkWinner = () => {
    for(let pattern of winPatterns) {   // for each pattern, check condition
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if(pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);    // show winner in msg section
            draw = false;   // false the draw condition
        }
    }   
}
};
boxes.forEach((box) => {    // traverse on each box 
    box.addEventListener("click", () => {   // click event on each box
        clickCount++;   // for draw
        if(player) {    // click work
            box.innerText = "O";
            player = false;
        } else {
            box.innerText = "X";
            player = true;
        }
        box.disabled = true;  // one box doesn't click again
        checkWinner();  // check winner
        if(clickCount === 9 && draw === true) {   // draw condition
            cong.innerText = `Draw!`;
            win.innerText = `Play well next time...`;
        }

    });
});


// reset button
const enableBox = () => {   // to enable each box to play again
    for(let tick of boxes) {
        tick.disabled = false;  // enable click
        tick.innerText = "";    // clean the box
        cong.innerText = "";    //clean the msg
        win.innerText = "";     //clean the msg
        player = true;   // each time game start from player : O
        draw = true;    // to start the draw condition again
        clickCount = 0;     // reset the count to 0 to check the draw condition again
    }
};

// new button
newBtn.addEventListener("click", enableBox);    // to continue new game or reset game



