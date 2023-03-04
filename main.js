let contentLevelBtnAll = document.querySelector(".difcultBtn");
let levelAll = document.querySelectorAll(".level");
let levelEasy = document.querySelector(".easy");
let levelMedium = document.querySelector(".medium");
let levelHard = document.querySelector(".hard");
let answers = document.querySelectorAll(".answers div");
let timeGameMinutes = document.querySelector(".timeGame .minute");
let timeGameSeconds = document.querySelector(".timeGame .second");
let score = document.querySelector(".score span");
let counter = document.querySelector(".counter span");
let placeNumberOne = document.querySelector(".numOne");
let placeNumberTow = document.querySelector(".numTow");
let proces = document.querySelector(".proces");
let wrongAnswer = document.querySelector(".boxWrong");
let wrongScoreAnswer = document.querySelector(".scoreWrong");
let wrongCorectAnswereAnswer = document.querySelector(
  ".contentCorectAnswer .corectAnswer"
);
let startAgain = document.querySelector(".again");

let scoreGame = 0;
let counterEasy = 6,
  counterMedium = 5,
  counterHard = 4;
let clearIntervalTimer;

levelEasy.addEventListener("click", () => {
  additionLevel();
  timer();
  counterLevel(counterEasy);
  levelEasy.dataset.fun = "additionLevel";
  styleAfterClickLevel();
});

levelMedium.addEventListener("click", () => {
  levelMediumFunction();
  timer();
  counterLevel(counterMedium);
  levelMedium.dataset.fun = "levelMediumFunction";
  styleAfterClickLevel();
});

levelHard.addEventListener("click", () => {
  levelHardFunction();
  timer();
  counterLevel(counterHard);
  levelHard.dataset.fun = "levelHardFunction";
  styleAfterClickLevel();
});

// Inherit all function
function mainMath() {
  let soundCorect = new Audio("sound/interface-124464.mp3");
  let soundWrong = new Audio("sound/wrong-answer-126515.mp3");

  let numerOne = Math.floor(Math.random() * 10);
  let numerTow = Math.floor(Math.random() * 10);

  placeNumberOne.textContent = numerOne;
  placeNumberTow.textContent = numerTow;

  for (let i = 0; i < answers.length; i++) {
    answers[i].textContent = randomPlaceAnswroCorect(10);
    answers[i].onclick = () => {
      wrong();
      soundWrong.play();
    };
  }

  let corectAnswerPlace = randomPlaceAnswroCorect(4);

  answers[corectAnswerPlace].onclick = function () {
    let empty = [];
    levelAll.forEach((el) => {
      empty.push(el.dataset.fun);
    });
    let filtered = empty.filter((x) => x !== undefined);
    eval(filtered[0])();

    score.innerHTML = ++scoreGame;
    counter.textContent = counterEasy;
    soundCorect.play();
  };

  return [[numerOne, numerTow], [corectAnswerPlace]];
}

function additionLevel() {
  let funMainMath = mainMath();
  funMainMath[0].reduce((plusOne, plusTow) => {
    let resultoOeration = plusOne + plusTow;
    answers[funMainMath[1][0]].textContent = resultoOeration;
  });
  proces.textContent = `+`;
}

function subtractionLevel() {
  let funMainMath = mainMath();
  funMainMath[0].reduce((plusOne, plusTow) => {
    let resultoOeration = plusOne - plusTow;
    answers[funMainMath[1][0]].textContent = resultoOeration;
  });
  proces.textContent = `-`;
}

function portionLevel() {
  let funMainMath = mainMath();
  funMainMath[0].reduce((plusOne, plusTow) => {
    let resultoOeration = plusOne / plusTow;
    answers[funMainMath[1][0]].textContent = resultoOeration;
  });
  proces.textContent = `/`;
}

function multiplicationLevel() {
  let funMainMath = mainMath();
  funMainMath[0].reduce((plusOne, plusTow) => {
    let resultoOeration = plusOne * plusTow;
    answers[funMainMath[1][0]].textContent = resultoOeration;
  });
  proces.textContent = `*`;
}

// easy level
function levelEasyFunction() {
  additionLevel();
}

function levelMediumFunction() {
  let arrayEasy = [additionLevel, subtractionLevel];
  let choiseFun = Math.floor(Math.random() * arrayEasy.length);
  arrayEasy[choiseFun]();
}

function levelHardFunction() {
  let arrayhard = [
    additionLevel,
    subtractionLevel,
    portionLevel,
    multiplicationLevel,
  ];
  let choiseFun = Math.floor(Math.random() * arrayhard.length);
  arrayhard[choiseFun]();
}

function randomPlaceAnswroCorect(placeAnswer) {
  return Math.floor(Math.random() * placeAnswer);
}

function counterLevel(counterStart) {
  counter.textContent = counterStart;
  let intervalCounterLevel = setInterval(() => {
    counter.textContent -= 1;
    if (counter.textContent == 0) {
      wrong();
      clearInterval(intervalCounterLevel);
    }
  }, 1000);
}

function wrong() {
  wrongAnswer.style.visibility = "visible";
  wrongScoreAnswer.textContent = score.textContent;
  startAgain.addEventListener("click", () => {
    location.reload();
  });
  clearInterval(clearIntervalTimer);
}

function timer() {
  let minute = 0;
  let second = 0;

  clearIntervalTimer = setInterval(() => {
    timeGameSeconds.textContent = ++second;
    if (timeGameSeconds.textContent == 59) {
      second = 0;
      minute += 1;
      timeGameMinutes.textContent = minute;
    }
  }, 1000);
}

function styleAfterClickLevel() {
  contentLevelBtnAll.style.transform = "rotateX(90deg)";

  document.querySelector(".contentBoxAfterClickBeforeClick").style.width =
    "40%";

  document.querySelector(".question").classList.add("questionAfterChoose");

  document.querySelector(".chooseDifclut").style.display = "none";

  document
    .querySelector(".timerDivAfterCheckLevel")
    .classList.add("timerDivAfterCheckLevelActive");
}
