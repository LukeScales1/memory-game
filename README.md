# Memory Game

This is a game whereby the player tries to match all of the paired cards in the displayed deck. The game starts with all cards turned over (i.e. without the cards icon being shown). The player can select two cards at a time: if the cards match, the matched pair will remain shown; if they do not match both cards will return to the starting position without their icon being shown. When the player clicks the first card the game begins and a timer starts. Upon selecting a pair of cards, the move counter increments. As the move counter increments, the players star rating reduces. If the player solves the game and matches all cards within 15 moves, the player will receive a star rating of 3 stars. Between 15 and 20 stars the player receives a star rating of 2 stars, while over 20 results in a star rating of 1 star.
Upon completing the game a modal is shown asking the player if they would like to play again. If the player chooses to play again, a restart function is called which shuffles the deck and resets it. This also resets the move counter to, the timer to 0, and the star rating to 3 stars. The player can also call this restart function by hitting the restart/repeat button at the top right of the deck. See `js/app.js` for more detail on how the game functions.

This game was created as the second project in Udacity's Front-End Web Development Nanodegree course. It was modified from starter code (which can be found at https://github.com/udacity/fend-project-memory-game) that was provided as part of the course.

## Usage
To try the game, clone the directory and open `index.html` using your favourite web browser. Click/tap a card to start the game - find all pairs to win.#
