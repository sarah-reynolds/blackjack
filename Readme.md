# Blackjack game
## Made with JavaScript, jQuery, Bootstrap, and CSS

### JavaScript features 
The game has 4 buttons: Deal, Hit, Stand, and Reset. JavaScript and jQuery are used to execute these 4 options -- as well as setting up the board upon page load -- through a series of functions and conditions. 
- Page load
  * Upon page load, a jQuery document ready function is run to setup the page. 
  * A function, called buildDivs, is immediately called. This function builds out the card placements for both the player and the dealer by a for loop, placing html for each necessary card spot. 
  * Another function, "createDeck", is also called. This creates and stores an array of the 52 cards in a deck. 
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


### Code snippet 
Upon page load, the buildDivs function is called. This builds out the card divs HTML for the player and the dealer.
```
function buildDivs(){
  for(var i = 1; i < handSize; i++){
    cardHandHTML += '<div class="col-sm-1 card card-'+i+'">';
      cardHandHTML += '<div class="card-container">';
        cardHandHTML += '<div class="card-front"></div>';
        cardHandHTML += '<div class="card-back"></div>';
      cardHandHTML += '</div>';
    cardHandHTML += '</div>';
  }
  $('.dealer-cards').html(cardHandHTML);
  $('.player-cards').html(cardHandHTML);
};
```

When the calculateTotal function is called, several conditionals run to determine how the total should be calculated.
```
function calculateTotal(hand, who){
    var total = 0; //running total
    var cardValue = 0; //temp value of card
    var hasAce = false; //ace counter
    for(let i = 0; i < hand.length; i++){
        cardValue = Number(hand[i].slice(0,-1));
        if(cardValue > 10){
            cardValue = 10;
        }
        if(cardValue == 1){
            hasAce = true;
        }
        if(cardValue == 1 && total <= 10){
            cardValue = 11;
        }
        total += cardValue;

        if((total > 21)&&(hasAce)){
            total -= 10;
            hasAce = false;
        }
    }
    var classSelector = '.' + who + '-total-number';
    $(classSelector).text(total);
    return total;
};
```