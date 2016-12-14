// GLOBALS

var theDeck = createDeck();
var playersHand = [];
var dealersHand = [];
var topOfDeck = 4;

console.log("the deck length on page load:" + theDeck.length)

$(document).ready(function(){

	$('.deal-button').click(function(){
		shuffleDeck();
		playersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		placeCard('player',1,playersHand[0]);
		placeCard('player',2,playersHand[1]);
		placeCard('dealer',1,dealersHand[0]);
		placeCard('dealer',2,dealersHand[1]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
		console.log("the deck length on deal:" + theDeck.length)
	})

	$('.hit-button').click(function(){
		if(calculateTotal(playersHand, 'player') < 21){

		 playersHand.push(theDeck.shift());
		var slotForNewCard = playersHand.length;


		placeCard('player',playersHand.length,playersHand[playersHand.length-1])

		calculateTotal(playersHand,'player')
		}

		console.log("the deck length on hit:" + theDeck.length)
		
	})

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer')
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift())
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',dealersHand.length,dealersHand[dealersHand.length-1])
			dealerTotal = calculateTotal(dealersHand,'dealer')
		}
		checkWin();

		console.log("the deck length on stand:" + theDeck.length)

	})


	$('.reset-button').click(function(){
		reset();
		console.log("the deck length on reset:" + theDeck.length)

	})

	function shuffleDeck(){
	for(let i = 0; i < 9000; i++){


		var random1 = Math.floor(Math.random() * theDeck.length);
		var random2 = Math.floor(Math.random() * theDeck.length);

		

		var temp = theDeck[random1];

		theDeck[random1] = theDeck[random2];
		theDeck[random2] = temp;

		}

	}

});

function checkWin(){
	playerTotal = calculateTotal(playersHand,'player');
	dealerTotal = calculateTotal(dealersHand,'dealer');

	if(playerTotal > 21){
		// player busted
	}else if(dealerTotal > 21){
		// dealer busted, player wins
	}else{
		//no one busted, see who's higher
		if(playerTotal>dealerTotal){
			//player one
		}else if(dealerTotal>playerTotal){
			// dealer won
		}else{
			// it's a tie
		}
	}
}


function reset(){

	//deck needs to be reset
	//reset player and dealers arrays (hands) need to be reset
	//reset the dom
		// -cards
		// -totals
	theDeck = createDeck();
	playersHand = [];
	dealersHand = [];
	$('.card').html('');
	playerTotal = calculateTotal(playersHand,'player');
	dealerTotal = calculateTotal(dealersHand,'dealer');

}


function createDeck(){
	var newDeck = [];
	var suits = ['h', 's', 'd', 'c'];

	for(let s = 0; s<suits.length; s++){
		for(let c = 1; c <= 13; c++){
			newDeck.push(c+suits[s]);
		}
	}
	return(newDeck);
	// console.log(newDeck);
};

function placeCard(who, where, whatCard){
	var classSelector =  '.' + who + '-cards .card-' + where;

	$(classSelector).html('<img src="images/' + whatCard + '.png">');
};

function calculateTotal(hand, who){
    var total = 0; //running total
    var cardValue = 0; //temp value of card
    var countAce = 0; //ace counter
    for(let i = 0; i < hand.length; i++){
        cardValue = Number(hand[i].slice(0,-1));
        if(cardValue > 10){
            cardValue = 10;
        }
        if(cardValue == 1){
            countAce++;
        }
        if(cardValue === 1 && total <= 10){
            cardValue = 11;
        }
        total += cardValue;
        while((total > 21)&&(countAce !== 0)){
            total -= 10;
            countAce--;
        }
    }
    var classSelector = '.' + who + '-total-number';
    $(classSelector).text(total);
    return total;
}

