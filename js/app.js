/*
* List that holds all the cards
*/

const listOfCards = [ "fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];

const cardContainer = document.querySelector('.deck');

let displayCard = [];
let matchedCards = [];

/*
* - Create the cards
* - loop through each card and create its HTML
* - Function to intialize the game
*/

function init() {
for(let i = 0; i < listOfCards.length; i++){
  const card  = document.createElement('li');
  card.classList.add("card");
  card.innerHTML = "<i class='" + listOfCards[i] + "'</i>" ;
  cardContainer.appendChild(card);
//add click event to each card
  click(card);
}
};
///____________________________________________

/*
* - Clock display
* - Displays the current game time in seconds
*/

  let seconds = 00;
  let tens = 00;
  let appendTens = document.getElementById("tens")
  let appendSeconds = document.getElementById("seconds")
  let buttonStop = document.getElementById('button-stop');
  let Interval ;

    buttonStop.onclick = function() {
       clearInterval(Interval);
  }


  function startTimer () {
    tens++;

    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  }

///____________________________________________

/*
* - Invoke click event
* - Display the cards on the page
*/

function click(card) {

  // Event listener for a card. If a card is clicked, card's symbol is displayed
  card.addEventListener("click", function() {
    if (displayCard.length === 1){

      // Clicking in a card starts the clock
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);

      card.classList.add("open", "show");
      displayCard.push(this);

      // Adding the cards to a *list* of "open" cards.
      // If the cards do match, lock the cards in the open position
      if (this.innerHTML === displayCard[0].innerHTML) {

        this.classList.add("match");
        displayCard[0].classList.add("match");
        matchedCards.push(this, displayCard[0]);
        displayCard = [];
        // check if all cards have matched

          finishedGame();

       // If the cards do not match, remove the cards from the list and hide the card's symbol
      } else {
        let liveCard = this;
        let openCard = displayCard[0];

        addMove();

        setTimeout(function() {
          liveCard.classList.remove("open", "show","prevent");
          openCard.classList.remove("open", "show","prevent");
          displayCard = [];

        },200);

      }
    } else {
      this.classList.add("open", "show", "prevent");
      displayCard.push(this);
    }

  });
};
// ______________________________________________________

/*
* - Final Modal
* - If all cards have matched, display a message with the final score
* - POPUP BOX from https://sweetalert2.github.io/
*/
function finishedGame(){
if (listOfCards.length === matchedCards.length) {
  clearInterval(Interval);
  swal( "Good Job!",
  "You Finished in " + seconds +":" + tens + " with "  + move + " Moves " + "\n \n" + "Wanna Play Again?" ,
  "success")
}
};
// ____________________________________________________

//invoke init() to start the Game

shuffle();
init();

/*
* - Moves Panel
* - Increment the move counter and display it on the page
*/
const moveContainer = document.querySelector(".moves");
let move = 0;
function addMove() {
  move++;
  moveContainer.innerHTML = move;

  score();
}
// ____________________________________________

/*
* - Score
* - Decrease number of stars according to moves
*/
const starsContainer = document.querySelector(".stars");
function score() {
  if ( move > 8) {
starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li>`;

}else if( move > 6) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li>`;
  }
};
// ____________________________________________

/*
* - Restart method
*/

const restartButton = document.querySelector('.restart');
restartButton.addEventListener("click", function() {
  // Clear the clock
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;

  // reset Score
  score()
  starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li>`;

  // reset cards
  cardContainer.innerHTML = "";

  // invoke init to star new game
  init();

  // shufle cards after reset
  shuffle();

  // reset matched cards
  matchedCards = [];

  // reset the Moves
  move = 0;
  moveContainer.innerHTML = "";

});
// ____________________________________________

/*
* - shuffle the list of cards using the provided "shuffle" method
* - Shuffle function from http://stackoverflow.com/a/2450976
*/


function shuffle(array) {
  let currentIndex = listOfCards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = listOfCards[currentIndex];
    listOfCards[currentIndex] = listOfCards[randomIndex];
    listOfCards[randomIndex] = temporaryValue;
  }

  return listOfCards;
}
// ____________________________________________
