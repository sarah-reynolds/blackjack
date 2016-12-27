# Blackjack game
## Made with JavaScript, jQuery, Bootstrap, and CSS

###JavaScript features
The game has 4 buttons: Deal, Hit, Stand, and Reset. JavaScript and jQuery are used to execute these 4 options -- as well as setting up the board upon page load -- through a series of functions and conditions. 
- Page load
  * Upon page load, a jQuery document ready function is run to setup the page. 
  * A function, called buildDivs, is immediately called. This function builds out the card placements for both the player and the dealer by a for loop, placing html for each necessary card spot. 
  * Another function, "createCeck", is also called. This creates and stores an array of the 52 cards in a deck. 
- Deal button
  * When the Deal button is clicked, a "shuffleDeck" function is called. This function runs a for loop to take the deck of cards previously created, and moves each card into a different random spot in the deck. Now the cards are out of order and ready. 
  * Next, two cards are played and flipped for the player, and two cards are played, but only one flipped, for the dealer.
  * The current total is then calculated for the dealer and player. However, the dealer's total is hidden.
- Hit button
  * When the hit button is clicked, the next card in the deck is pushed to the player's hand, and the player's total is recalculated.
  * If the player's total is over 20, or if the dealer's total is over 16 AND the player's total is greater than or equal to the dealer's total, the "checkWin function" is called. This function is a series of conditionals to see if the player busted, the dealer busted, if it's a tie, and who won. jQuery is used to update the DOM with a message, alerting the user who won or if it's a tie.
- Stand button
  * When the stand button is clicked, the dealer's cards are flipped to reveal their values, and the dealer's total is displayed.
  * Then, a while statement is run. While the dealer has a total less than 16, the dealer will play/flip more cards. Once the dealer has a total of 16 or higher, the dealer stops and their total is recalculated.
  * Once the dealer is finished, the checkWin function is called to see who won or if it was a tie, and to display the message on the DOM.
- Reset button
  * This button simply resets the game without needed to refresh the browser. 
    * The deck is re-created, and re-shuffled
    * The player's and dealer's hands' are reset
    * The HTML and DOM for the card placements, winner message, and player/dealer totals are cleared out
    * The "buildDivs" function is called to build the HTML for the card placements.