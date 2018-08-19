const icons = [
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-bomb",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-diamond"
];

//shuffle cards
const iconsShuffle = shuffle(icons);

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// timer variable
const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;

//set the default value to the timers container
timerContainer.innerHTML = totalSeconds;

//start the timer
function startTimer() {
  liveTimer = setInterval(function() {
    //increase the total seconds by 1
    totalSeconds++;
    //update the HTML container with the new time
    timerContainer.innerHTML = totalSeconds;
  }, 1000);
}

//creating the deck
const cardsContainer = document.querySelector(".deck");

// array to compare cards
let openedCards = [];
let matchedCards = [];

//Initialize the game

function main() {
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Add click event to each card
    click(card);
  }
}

/*
*click event
*/
let isFirstClick = true;

function click(card) {
  //card click event
  card.addEventListener("click", function() {
    if (isFirstClick) {
      //start timer
      startTimer();
      //change our first click bolean
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

    if ( document.getElementsByClassName("flipped").length >= 2 ) {
      return false;
    }

    //if we have an exisiting opened card
    if (openedCards.length === 1) {
      //show cards
      card.classList.add("open", "show", "flipped");
      //compare cards
      openedCards.push(this);

      //we should compare our 2 open cards
      compare(currentCard, previousCard);
    } else {
      // we dont have any opened cards
      //show cards
      currentCard.classList.add("open", "show", "flipped");
      //compare cards
      openedCards.push(this);
    }
  });
}

//compare the cards
function compare(currentCard, previousCard) {
  //matcher

  if (currentCard.innerHTML === previousCard.innerHTML) {
    //matched cards
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    //remove click protector
    currentCard.classList.remove("flipped");
    previousCard.classList.remove("flipped");

    openedCards = [];

    //check if the game is over
    isOver();
  } else {
    //delay event of card flipping. wait 500 ms
    setTimeout(function() {
      currentCard.classList.remove("show");
      previousCard.classList.remove("show");
      currentCard.classList.add("incorrect");
      previousCard.classList.add("incorrect");
    }, 800);
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "flipped", "incorrect");
      previousCard.classList.remove("open", "show", "flipped", "incorrect");
      openedCards = [];
    }, 2000);
  }
  //add new move
  addMove();
}

//check if the game has been completed

function isOver() {
  if (matchedCards.length === icons.length) {
    modal.style.display = "block";

    //stop timer
    stopTimer();
    //timerContainer = "0";
  }
}

//stop timer
function stopTimer() {
  clearInterval(liveTimer);
}

/*
* Rating 
*/
let stars = 0;
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

function rating() {
  if (moves > 17 && moves < 25) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
    stars = 2;
  } else if (moves >= 25) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    stars = 1;
  } else {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    stars = 3;
  }
}

//add move

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  //set the rating
  rating();

  //set the final moves for the modal
  const modalMoves = document.querySelector("#moves");

  modalMoves.innerHTML = moves;

  //set the final stars for the modal
  const modalStars = document.querySelector("#stars");

  modalStars.innerHTML = stars;

  //set the final time for the modal
  const finalTime = document.querySelector("#seconds");

  finalTime.innerHTML = totalSeconds;

  //set the rating for the modal

  const starRating = document.querySelector(".stars");
  const ratingSpan = document.querySelector("#rating");

  ratingSpan.innerHTML = starRating.innerHTML;
}

//restart button

const restartBtn = document.querySelector(".restart");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

restartBtn.addEventListener("click", function() {
  //delete all cards
  cardsContainer.innerHTML = "";

  //timer reset
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds;
  stopTimer();

  //shuffle cards
  shuffle(icons);

  //call "main" to create new cards
  main();

  //reset any related varibles (matched cards)
  matchedCards = [];
  moves = 0;
  stars = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
});

// Get the modal
var modal = document.getElementById("result");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

//Start the game for the first time
main();
