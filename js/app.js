
const availableCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bicycle', 'fa-leaf', 'fa-bomb']
let deckOfCards = availableCards.concat(availableCards);

let moveCount = 0;  // < 15 = 3 stars; < 20 = 2 stars; >25 = 0 stars;
let currentTargets = [];

let noOfPairs = 0;

let gameStart = false;

const container = document.querySelector('.container');
const moves = document.querySelector('.moves');
const timer = document.querySelector('.timer');
let time = 0;

const stars = document.getElementsByClassName('fa-star');
const cardElements = document.getElementsByClassName('card');

function resetDeck() {
	// No matches on deck reset
	noOfPairs = 0;

	// Remove old fa icon and any open/show/match classes, reassign with new fa icons
	for (var i = cardElements.length - 1; i >= 0; i--) {
		let card = cardElements[i];
		let cardIcon = card.getElementsByTagName('i');
		cardIcon[0].classList = ['fa'];
		card.classList.remove('open', 'show', 'match');
		cardIcon[0].classList.add(deckOfCards[i]);
	}
}


function toggleStar(star) {
	star.classList.toggle('fa-star-o');
}

function updateTime() {
	++time;
	timer.textContent = time;
}


function updateMoves() {
	moves.textContent = moveCount;

	// Reset the stars if game is reset
	if (moveCount === 0) {
		for (var i = stars.length - 1; i >= 0; i--) {
			stars[i].classList.remove('fa-star-o');
		}
	}

	// Update star rating as game progresses
	if (moveCount === 15) {
		toggleStar(stars[2]);
	} else if (moveCount === 20) {
		toggleStar(stars[1]);
	} else if (moveCount === 25) {
		toggleStar(stars[0]);
	}
}


shuffle(deckOfCards);
resetDeck();

updateMoves();

// Function to lock in matches or return cards that don't match
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

// Check if chosen pair of cards match
function matchCheck(targetArray) {
	isMatch = false;
	cardOne = targetArray[0].innerHTML;
	cardTwo = targetArray[1].innerHTML;
	if (cardOne === cardTwo) {
		isMatch = true;
		++noOfPairs;
		if (noOfPairs === 8) {
			// Game won!

		}
	}
	updateCards(targetArray, match=isMatch);

	// Remove cards from current guesses/card array, reset currentGuesses
	setTimeout(function() {
		currentTargets = [];
	}, 0);

}

// Function for showing cards and tracking number of cards shown - pass pair to matchCheck()
function show(target) {
	currentTargets.push(target);
	target.classList.add('open', 'show');
	if (currentTargets.length === 2 ) {
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
	const clickedClass = evt.target.className;
	if (clickedClass === 'fa fa-repeat') {
		shuffle(deckOfCards);
		resetDeck();
		currentTargets = [];
		
		moveCount = 0;
		updateMoves();

		clearInterval(timerIntervalId);
		time = 0;
		timer.textContent = time;
		gameStart = false;

	}
	// Only show 2 cards - if another card is clicked quickly after pair is selected, ignore
	if (clickedClass === 'card' && currentTargets.length < 2) {
		// If card clicked, start timer
		if (gameStart === false) {
			timerIntervalId = setInterval(updateTime, 1000);
			gameStart = true;
		}
		show(evt.target);
	}
});
