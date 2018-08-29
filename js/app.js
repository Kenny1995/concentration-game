/*
 * Create a list that holds all of your cards
 */
let cardIcons = [
  "diamond",
  "paper-plane-o",
  "anchor",
  "bolt",
  "cube",
  "anchor",
  "leaf",
  "bicycle",
  "diamond",
  "bomb",
  "leaf",
  "bomb",
  "bolt",
  "bicycle",
  "paper-plane-o",
  "cube"
];

// Select the ul of cards
const cardDeck = document.querySelector("#card-deck");

//Opened Cards
let openedCards = [];

// match cards
let matchedCards = [];

let lastFlipped = null;

// Creating and appending card to the ul tag
function createCard() {
  cardIcons = shuffle(cardIcons);
  for (let i = 0; i < cardIcons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="fa fa-${cardIcons[i]}"></i>`;
    cardDeck.appendChild(card);

    //Add a Click event on each of the cards
    onClick(card);
  }
}

//Calling the function to create the card
createCard();

// Click Event on each card
function onClick(card) {
  //Click Event on card
  card.addEventListener("click", function () {
    const cardA = this;
    const cardB = openedCards[0];
    //When there is an existing card opened
    if (openedCards.length === 1) {
      card.classList.add("open", "show", "disabled");
      openedCards.push(this);

      // Compare the cards
      compareCards(cardA, cardB);
    } else {
      //when there is no card opened.
      cardA.classList.add("open", "show", "disabled");
      openedCards.push(this);
    }
  });
}


function gameOver() {
  if (matchedCards.length === cardIcons.length) {
    alert("Congratulations YOU WON!!!")
  }
}

// function generateGameboard() {}

// Compare card function
function compareCards(cardA, cardB) {
  // we are to compare our opened cards
  if (cardA.innerHTML === cardB.innerHTML) {
    cardA.classList.add("match", "animated", "bounce");
    cardB.classList.add("match", "animated", "bounce");

    //matched Cards
    matchedCards.push(cardA, cardB);

    openedCards = [];
    //Check if game over
    gameOver();
  } else {
    //Timer delay to before closing cards

    cardA.classList.add("shake");
    cardB.classList.add("shake");

    setTimeout(function () {
      cardA.classList.remove("open", "show", "disabled", "shake");
      cardB.classList.remove("open", "show", "disabled", "shake");

    }, 400);

    openedCards = [];
  }

  //Impliment the move function
  moves();
}

// this add me move
const getMoves = document.querySelector(".moves");
getMoves.innerHTML = 0;
let countMoves = 0;

function moves() {
  countMoves++;
  getMoves.innerHTML = countMoves;

  //check rating
  rating();
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart);

function restart() {
  //Delete the cards
  cardDeck.innerHTML = "";

  // Create the card again
  createCard();

  //reset any related declared variables
  matchedCards = [];
  countMoves = 0;
  getMoves.innerHTML = 0;
  starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`
}

const starsRating = document.querySelector('.stars')

function rating() {
  switch (countMoves) {
    case 20:
      starsRating.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
      break;

    case 25:
      starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
      break;


  }
}
// This checks on two clicked cards

//store cards that are open

// console.log(cardList);
// list = Array.from(list);

// shuffle(list);

// console.log(list);
// dock.appendChild(list);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
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

// /*
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  *  - if the list already has another card, check to see if the two cards match
//  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
//  */