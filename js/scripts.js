$(document).ready(function(){

// Get deal working
// Need a way to make the deck
// Shuffle the new deck
// Update the DOM with the player cards
// Get hit working
// Put the card in the right place
// Update the total
// Check if the player busted
// Get stand working
// Run the dealer “hit” until it has more than 16
// Once dealer has more than 16, checkwin
// Post a message after checkwin



// ======== GLOBALS =========


	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];
	var total = 0;

	createDeck();

	$('.deal-button').click(function(){
		// console.log(this)
		
		shuffleDeck();
		playersHand.push(theDeck[0]);
		dealersHand.push(theDeck[1]);
		playersHand.push(theDeck[2]);
		dealersHand.push(theDeck[3]);

		// put the first card in the players hand
		placeCard(playersHand[0], 'player', 'one')
		// put the second card in the players hand
		placeCard(playersHand[1], 'player', 'two')
		// put the first card in the delaers hand
		placeCard(dealersHand[0], 'dealer', 'one')
		// put the second card in the dealers hand
		placeCard(dealersHand[1], 'dealer', 'two')

		calculateTotal('player',playersHand);
		calculateTotal('dealer',dealersHand);

	})

	$('.hit-button').click(function(){
	// console.log(this)
	})

	$('.stand-button').click(function(){
	// console.log(this)
	})




	function createDeck(){
		// fill deck with 52 cards
		// - 4 suits
		// - 1-13, 11=j, 12=q, 13=k

		var suits = ['h', 's', 'd', 'c'];
		for(let s = 0; s < suits.length; s++){
			// loop through all 4 suits
			// loop through all 13 cards for each suit
			for(let c = 1; c <= 13; c++){
				theDeck.push(c+suits[s])
			}
		}
	// console.log(theDeck)

	}

	function shuffleDeck(){

		for(let i = 0; i < 500; i++){
			var card1ToSwitch = Math.floor(Math.random() * theDeck.length);
			var card2ToSwitch = Math.floor(Math.random() * theDeck.length);
				var temp = theDeck[card1ToSwitch];
				theDeck[card1ToSwitch] = theDeck[card2ToSwitch]
				theDeck[card2ToSwitch] = temp;
					
		}
		console.log(theDeck)
	}

	function placeCard(whatCard, who, whichSlot){
		var classToTarget = '.'+who+'-cards .card-'+whichSlot;
		// console.log(classToTarget);
		$(classToTarget).html('<img src="images/'+whatCard+'.png">');
	}

	function calculateTotal(who, theirHand){
	
		var cardValue = 0;
		for(let i = 0; i<theirHand.length; i++){
			cardValue = Number(theirHand[i].slice(0,-1));
			if(cardValue > 10){
				cardValue = 10;
			}

			if(cardValue === 1 && total <11){
				cardValue === 11
			}
			console.log(cardValue);
			total += cardValue;
		}
		var classToTarget = '.'+who+'-total-number';
		$(classToTarget).text(total);
	}



});

