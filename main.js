const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);

// select the letters div
let lettersDiv = document.querySelector(".letters");

// loop on letters and create spans
lettersArr.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  // append the letter in span
  span.appendChild(theLetter);
  // add class to the span
  span.className = "letter-box";
  // append the span to the letters container
  lettersDiv.appendChild(span);
});

// categories in object
const words = {
  Programming: [
    "html",
    "css",
    "javascript",
    "go",
    "r",
    "scala",
    "php",
    "python",
    "java"
  ],
  Movies: [
    "red",
    "inception",
    "kingsman",
    "thor",
    "interstellar",
    "avatar",
    "harry potter"
  ],
  Countries: [
    "egypt",
    "sudia aribia",
    "palestine",
    "france",
    "england",
    "usa",
    "qater"
  ],
  Scientists: ["Albert Einstein", "Ahmed Zewail", "Tesla", "Isaac Newton"]
};

let allKeys = Object.keys(words);
// create random number between 0 and length of keys and random word
let randomNumber = Math.floor(Math.random() * allKeys.length),
  randomProp = allKeys[randomNumber],
  randomPropValue = words[randomProp],
  randomWordNumber = Math.floor(Math.random() * randomPropValue.length),
  randomWord = randomPropValue[randomWordNumber];

// add the random category in span
document.querySelector(".catName").innerHTML = `${randomProp}`;

// Select letters guess element
let lettersGuessDiv = document.querySelector(".letters-guess");
// convert the chosen word to array
let lettersAndSpaces = randomWord.split("");

lettersAndSpaces.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "has-space";
  }
  lettersGuessDiv.appendChild(span);
});

// select all letter spans guess
let guessSpan = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0,
  rightAttempts = 0,
  attempts = 7,
  wordArray = [];

let attemptSpan = document.querySelector(".attempts span");
attemptSpan.innerHTML = attempts;

let scoreSpan = document.querySelector(".score span");

// Select the draw
let theDraw = document.querySelector(".hangman-draw");

// handle event
document.addEventListener("click", (e) => {
  // set the status
  let setStatus = false;
  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomWord.toLowerCase());
    let trimmedWord = theChosenWord.filter((e) => e !== " ");
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter) {
        wordArray.push(theClickedLetter);
        setStatus = true;
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    if (setStatus) {
      document.getElementById("success").play();
    } else {
      wrongAttempts++;
      attempts--;
      attemptSpan.innerHTML = attempts;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();

      if (wrongAttempts == 7) {
        gameOver();
        document.getElementById("lose").play();
        lettersDiv.classList.add("finished");
      }
    }

    if (wordArray.length === trimmedWord.length) {
      endGame();
      lettersDiv.classList.add("finished");
    }
  }
});

function gameOver() {
  let div = document.createElement("div");

  let divContent = document.createElement("p");
  divContent.innerHTML = `Game Over, The Word is ${randomWord.toUpperCase()}`;
  div.className = "pop-up";

  let btn = document.createElement("a");
  btn.className = "again";
  btn.innerHTML = "Play Again";

  btn.addEventListener("click", () => {
    btn.setAttribute("href", "index.html");
  });

  div.appendChild(divContent);
  div.appendChild(btn);
  document.body.appendChild(div);
}

let score = 0;
function endGame() {
  let div = document.createElement("div");
  div.style.backgroundColor = "#419197";

  if (wrongAttempts <= 2) {
    score = 15;
  } else if (wrongAttempts >= 3 && wrongAttempts < 5) {
    score = 10;
  } else if (wrongAttempts >= 5 && wrongAttempts < 7) {
    score = 5;
  } else {
    score = 0;
  }
  scoreSpan.innerHTML = score;
  let divContent = document.createElement("p");
  divContent.innerHTML = `Your Score is ${score}`;
  div.className = "pop-up";

  let btn = document.createElement("a");
  btn.className = "again";
  btn.innerHTML = "Play Again";

  btn.addEventListener("click", () => {
    btn.setAttribute("href", "index.html");
  });

  div.appendChild(divContent);
  div.appendChild(btn);
  document.body.appendChild(div);
}
