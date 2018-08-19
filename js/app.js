const CARDS = [
  "fa-bicycle",
  "fa-bicycle",
  "fa-leaf",
  "fa-leaf",
  "fa-cube",
  "fa-cube",
  "fa-anchor",
  "fa-anchor",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-bolt",
  "fa-bolt",
  "fa-bomb",
  "fa-bomb",
  "fa-diamond",
  "fa-diamond"
];

const cardsContainer = document.querySelector(".deck");
const timerContainer = document.querySelector(".timer");
const movesContainer = document.querySelector(".moves");
const starsContainer = document.querySelector(".stars");
const restartButton = document.querySelector(".restart");
const modal = document.getElementById("result");
const CloseModal = document.getElementsByClassName("close")[0];
let openCards = [];
let matchCards = [];
let firstClick = true;
let seconds = 0;
let moves = 0;
movesContainer.innerHTML = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function main() {
  shuffle(CARDS);
  for (let i = 0; i < CARDS.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class=\"fa " + CARDS[i] + "\"></i>";
    cardsContainer.appendChild(card);
    
    click(card);
  }
  restart();
}

function click(card) {
  card.addEventListener("click", function() {
    const currentCard = this;
    const previousCard = openCards[0];

    if (firstClick) {
      startTimer();
      firstClick = false;
    }

    if ( document.getElementsByClassName("flipped").length >= 2 ) {
      return false;
    }

    if (openCards.length === 1) {
      card.classList.add("open", "show", "flipped");
      openCards.push(this);
      compare(currentCard, previousCard);
    } else {
      currentCard.classList.add("open", "show", "flipped");
      openCards.push(this);
    }
  });
}

function compare(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchCards.push(currentCard, previousCard);

    currentCard.classList.remove("flipped");
    previousCard.classList.remove("flipped");

    openCards = [];
    end();
  } else {
    setTimeout(function() {
      currentCard.classList.remove("show");
      previousCard.classList.remove("show");
      currentCard.classList.add("incorrect");
      previousCard.classList.add("incorrect");
    }, 800);
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "flipped", "incorrect");
      previousCard.classList.remove("open", "show", "flipped", "incorrect");
      openCards = [];
    }, 2000);
  }
  addMove();
}

function end() {
  if (matchCards.length === CARDS.length) {
    stopTimer();
    stats();
    modal.style.display = "block";
  }
}

function startTimer() {
  timer = setInterval(function() {
    seconds++;
    timerContainer.innerHTML = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  rating();
}

function rating() {
  if (moves >= 23) {
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
  } else if (moves > 10 && moves < 23) {
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
                               '<li><i class="fa fa-star"></i></li>';
  } else {
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
                               '<li><i class="fa fa-star"></i></li>' +
                               '<li><i class="fa fa-star"></i></li>';
  }
}

function stats() {
  const modalMoves = document.querySelector("#moves");
  modalMoves.innerHTML = moves;

  const modalStars = document.querySelector("#stars");
  modalStars.innerHTML = document.querySelector(".stars").childElementCount;

  const finalTime = document.querySelector("#seconds");
  finalTime.innerHTML = seconds;
}

function restart() {
  restartButton.addEventListener("click", function() {
    matchCards = [];
    moves = 0;
    stars = 0;
    seconds = 0;
    firstClick = true;

    stopTimer();

    movesContainer.innerHTML = moves;
    timerContainer.innerHTML = seconds;
    cardsContainer.innerHTML = "";
    starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>' +
                               '<li><i class="fa fa-star"></i></li>' +
                               '<li><i class="fa fa-star"></i></li>';
    main();
  });
}

CloseModal.onclick = function() {
  modal.style.display = "none";
};

main();
