/*
 * Create a list that holds all of your cards
 */
const availableCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bicycle', 'fa-leaf', 'fa-bomb']
let deckOfCards = availableCards.concat(availableCards);

let moveCount = 0;  // < 15 = 3 stars; < 20 = 2 stars; >25 = 0 stars;
let currentGuesses = 0;
let currentTargets = [];

const container = document.querySelector('.container');
const moves = document.querySelector('.moves');

const stars = document.getElementsByClassName('fa-star');
const cardElements = document.getElementsByClassName('card');

function resetDeck() {
	for (var i = cardElements.length - 1; i >= 0; i--) {
		let card = cardElements[i];
		let cardIcon = card.getElementsByTagName('i');
		cardIcon[0].classList = ['fa'];
		card.classList.remove('open', 'show', 'match');
	}
}

function setDeck() {
	for (var i = cardElements.length - 1; i >= 0; i--) {
		let card = cardElements[i];
		let cardIcon = card.getElementsByTagName('i');
		cardIcon[0].classList.add(deckOfCards[i]);
	}
}

function updateMoves() {
	moves.textContent = moveCount;
	stars[2].classList.add('fa-star-o');
	stars[2].classList.remove('fa-star');
	if (moveCount > 15) {
		stars[2].classList = ['fa'];
	}
}


shuffle(deckOfCards);
setDeck();

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
			matchCheck(currentTargets)}, 800);

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
	console.log(evt.target.classList);
	const clickedClass = evt.target.className;
	if (clickedClass === 'fa fa-repeat') {
		shuffle(deckOfCards);
		resetDeck();
		setDeck();
		currentTargets = [];
		currentGuesses = 0;
		moveCount = 0;
		updateMoves();

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
