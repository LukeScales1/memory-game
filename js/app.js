/*
 * Create a list that holds all of your cards
 */
let guesses = 0;
let currentTargets = [];

const container = document.querySelector('.container');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function updateCards(cardsArray, hide, match) {
	const startTime = performance.now();
	if (hide) {
		for (var i = cardsArray.length - 1; i >= 0; i--) {
			cardsArray[i].classList.remove('open', 'show');
		}
	} else if (match) {
		for (var i = cardsArray.length - 1; i >= 0; i--) {
			cardsArray[i].classList.remove('open', 'show');
			cardsArray[i].classList.add('match');
		}
	} else {
		console.log('Logic error')
	}
	const endTime = performance.now();
	console.log(endTime - startTime);
}


function matchCheck(targetArray) {
	console.log(targetArray)
	cardOne = targetArray[0].innerHTML;
	console.log(cardOne);
	cardTwo = targetArray[1].innerHTML;
	console.log(cardTwo);
	if (cardOne === cardTwo) {
		console.log('True');
		updateCards(targetArray, hide=false, match=true);
	} else {
		console.log('False');
		updateCards(targetArray, hide=true, match=false);
	}
	// Remove cards from guesses/current array, reset guesses
	setTimeout(function() {
		currentTargets = [];
		guesses = 0;
	}, 0);

}

// Function for showing cards and tracking number of cards shown - pass pair to matchCheck()
function show(target) {
	currentTargets.push(target);
	console.log(target);
	target.classList.add('open', 'show');
	guesses += 1;
	if (guesses === 2 ) {
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
	console.log(evt);
	if (clickedClass === 'fa fa-repeat') {
		console.log('Repeat button clicked!')
	}
	if (clickedClass === 'card') {
		console.log('Card clicked!')
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
