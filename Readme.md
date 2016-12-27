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
  * When the hit button is clicked, 