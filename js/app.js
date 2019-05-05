/*
 * Create a list that holds all of your cards
 */
let deckOfCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bomb']
let moveCount = 0;
let currentGuesses = 0;
let currentTargets = [];

const container = document.querySelector('.container');
const moves = document.querySelector('.moves');

function updateMoves() {
	moves.textContent = moveCount;
}

updateMoves();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function updateCards(cardsArray, match) {
	for (var i = cardsArray.length - 1; i >= 0; i--) {
		cardsArray[i].classList.remove('open', 'show');
		if (match) {
			cardsArray[i].classList.add('match');
		}
	}
	moveCount += 1;
	updateMoves();
}


function matchCheck(targetArray) {
	isMatch = false;
	cardOne = targetArray[0].innerHTML;
	cardTwo = targetArray[1].innerHTML;
	if (cardOne === cardTwo) {
		isMatch = true;
	}
	updateCards(targetArray, match=isMatch);

	// Remove cards from current guesses/card array, reset currentGuesses
	setTimeout(function() {
		currentTargets = [];
		currentGuesses = 0;
	}, 0);

}

// Function for showing cards and tracking number of cards shown - pass pair to matchCheck()
function show(target) {
	currentTargets.push(target);
	target.classList.add('open', 'show');
	currentGuesses += 1;
	if (currentGuesses === 2 ) {
		setTimeout(function() {
			matchCheck(currentTargets)}, 1000);

	}
}

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

container.addEventListener('click', function (evt) {
	const clickedClass = evt.target.className;
	if (clickedClass === 'fa fa-repeat') {
		console.log('Repeat button clicked!')
	}
	// Only show 2 cards - if another card is clicked quickly after pair is selected, ignore
	if (clickedClass === 'card' && currentGuesses < 2) {
		show(evt.target);
	}
});

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
