/*
* Create a list that holds all of your cards
*/
const listOfCards = [ "fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];

const cardContainer = document.querySelector('.deck');

let displayCard = [];
matchedCards = [];

//create the cards
//function to intialize the game
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


  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStop = document.getElementById('button-stop');
  var Interval ;



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
*invoke click event
*/

function click(card) {

  //Click Event to display cards
  card.addEventListener("click", function() {
    //fliping the cards
    if (displayCard.length === 1){

      //start the clock
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);

      card.classList.add("open", "show");
      displayCard.push(this);

      //comparing cards to see if they match
      if (this.innerHTML === displayCard[0].innerHTML) {

        this.classList.add("match");
        displayCard[0].classList.add("match");
        matchedCards.push(this, displayCard[0]);
        displayCard = [];
        //check if all cards have matched
          finishedGame();

        //if cards didn't match
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
////______________________________________________________
function finishedGame(){
if (listOfCards.length === matchedCards.length) {
  clearInterval(Interval);
  swal( "Good Job!",
  "You Finished in " + seconds +":" + tens + " with "  + move + " Moves " + "\n \n" + "Wanna Play Again?" ,
  "success")

}
};
/////____________________________________________________

//invoke init() to start the Game

shuffle();
init();
/*
*Moves Panel
*/
const moveContainer = document.querySelector(".moves");
let move = 0;
function addMove() {
  move++;
  moveContainer.innerHTML = move;

  score();
}
//____________________________________________
/*
*Score
*/
const starsContainer = document.querySelector(".stars");
function score() {
  if ( move > 15) {
starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li>`;

}else if( move > 10) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li>`;
  }

};
//____________________________________________
/*
*Restart method
*/

const restartButton = document.querySelector('.restart');
restartButton.addEventListener("click", function() {
  //reset clock
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;

  //reset Score
  score()
  starsContainer.innerHTML = `<li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li><li><i class="fa fa-star"> </i></li>`;

  //reset cards
  cardContainer.innerHTML = "";

  //invoke init to star new game
  init();

  //shufle cards after reset
  shuffle();

  //reset matched cards
  matchedCards = [];

  //reset the Moves
  move = 0;
  moveContainer.innerHTML = "";

});
//____________________________________________
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = listOfCards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = listOfCards[currentIndex];
    listOfCards[currentIndex] = listOfCards[randomIndex];
    listOfCards[randomIndex] = temporaryValue;
  }

  return listOfCards;
}



/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
