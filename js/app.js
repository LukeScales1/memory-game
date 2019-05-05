/*
 * Create a list that holds all of your cards
 */
let guesses = 0;
let currentTargets = [];

const cardDeck = document.querySelector('.container');
const repeatBtn = document.querySelector('.repeat');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function hideCards(cardsArray) {
	for (var i = cardsArray.length - 1; i >= 0; i--) {
		cardsArray[i].classList.remove('open', 'show')
	}
}


function matchCheck(targetArray) {
	console.log(targetArray)
	cardOne = targetArray[0].innerHTML;
	console.log(cardOne);
	cardTwo = targetArray[1].innerHTML;
	console.log(cardTwo);
	// if (targetArray[0].classList == targetArray[1].classList) {
	if (cardOne === cardTwo) {
		console.log('True');
	} else {
		console.log('False');
		// TODO: add browser delay thing
		hideCards(targetArray);
	}
	// Remove cards from guesses/current array, reset guesses
	setTimeout(function() {
		currentTargets = [];
		guesses = 0;
	}, 0);

}

// Function for showing card (toggle show class)
function show(target) {
	// target.classList.toggle('show');
	// target.classList.toggle('open');
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

cardDeck.addEventListener('click', function (evt) {
	console.log(evt);
	if (evt.target.className === 'fa fa-repeat') {
		console.log('Repeat button clicked!')
	}
	if (evt.target.className === 'card') {
		console.log('Card clicked!')
	}
	// if (evt.target.nodeName === 'LI') {  // ← verifies target is desired element
 //        // console.log(evt.target);
 //        show(evt.target);
 //    }
});

// repeatBtn.addEventListener('click', function (event) {
// 	console.log(event);
// });
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
