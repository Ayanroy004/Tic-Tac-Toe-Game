let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
// let winStatus = document.querySelector("#win-para");
// let winhide = document.querySelector(".winSms");
let newGame = document.querySelector(".newgame");
let newGameBtn = document.querySelector("#newgame-btn");
let xScore = document.querySelector(".Xscore");
let oScore = document.querySelector(".Oscore");
let tieScore = document.querySelector(".Tiescore");
let resetScoreBtn = document.querySelector("#resetScoreBtn");

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

let Score = JSON.parse(localStorage.getItem("score")) || {
  X: 0,
  O: 0,
  tie: 0,
};

resetScoreBtn.onclick = () => {
  Score.X = 0;
  Score.O = 0;
  Score.tie = 0;
  localStorage.removeItem("score");
  defaultScore();
};

defaultScore();

function defaultScore() {
  xScore.innerText = `${Score.X}`;
  oScore.innerText = `${Score.O}`;
  tieScore.innerText = `${Score.tie}`;
}

let turnX = true;
let count = 0;

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    if (box.innerHTML === "X") {
      box.classList.add("c");
    } else {
      box.classList.remove("c");
    }
    count++;
    winCheckd(count);
  });
});

let checkTie = true;

function winCheckd() {
  winPatterns.forEach((value) => {
    if (
      boxs[value[0]].innerText === "X" &&
      boxs[value[1]].innerText === "X" &&
      boxs[value[2]].innerText === "X"
    ) {
      // winhide.classList.toggle("hide");
      
      // winStatus.innerText = "Congratulations X is Winner !!!";
      Score.X++;
      defaultScore();
     
      disableMethod();
    } else if (
      boxs[value[0]].innerText === "O" &&
      boxs[value[1]].innerText === "O" &&
      boxs[value[2]].innerText === "O"
    ) {
      // winhide.classList.toggle("hide");
      
      // winStatus.innerText = "Congratulations O is Winner !!!";
      Score.O++;
      defaultScore();

      disableMethod();
    }
  });
  if (count === 9 && checkTie) {
    Score.tie++;
    // winStatus.innerText = "Tie !!!";
    defaultScore();
    // winhide.classList.toggle("hide");
    disableMethod();
  }

  localStorage.setItem("score", JSON.stringify(Score));
}

function disableMethod() {
  resetBtn.disabled = true;
  newGame.classList.toggle("hide");
  checkTie = false;

  boxs.forEach((value) => {
    value.disabled = true;
  });
}

function enabledMethod() {
  boxs.forEach((dabba) => {
    dabba.innerText = "";
    dabba.disabled = false;
    dabba.classList.remove("c");
  });
  count = 0;
}

resetBtn.addEventListener("click", () => {
  enabledMethod();
});

newGameBtn.addEventListener("click", () => {
  newGame.classList.toggle("hide");
  // winhide.classList.toggle("hide");
  resetBtn.disabled = false;
  // winStatus.innerText = "";
  enabledMethod();
  checkTie = true;
});
