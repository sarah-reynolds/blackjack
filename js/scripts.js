// GLOBALS

var theDeck = createDeck();
var playersHand = [];
var dealersHand = [];
var handSize = 7;
var cardHandHTML = '';


// var topOfDeck = 4;

// console.log("the deck length on page load:" + theDeck.length)

$(document).ready(function(){

	
	buildDivs();

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
		$('.dealer-total-number').html('?');
		// console.log("the deck length on deal:" + theDeck.length)
		// $(this).toggleClass('flip');
	})

	$('.hit-button').click(function(){
		if(calculateTotal(playersHand, 'player') < 21){

		playersHand.push(theDeck.shift());
		var slotForNewCard = playersHand.length;


		placeCard('player',playersHand.length,playersHand[playersHand.length-1])

		calculateTotal(playersHand,'player')
		}

		playerTotal = calculateTotal(playersHand,'player');
		dealerTotal = calculateTotal(dealersHand,'dealer');

		if((playerTotal > 21) || (dealerTotal > 16 && (playerTotal >= dealerTotal))){
			checkWin();
		};

		$('.dealer-total-number').html('?');

		// if($('#message-alert').html.length >0){
		// 	$('.dealer-cards').html(cardHandHTML);
		// }

		// console.log("the deck length on hit:" + theDeck.length)
		
	})

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer')

		$(".dealer-cards .card-2 .card-container").toggleClass('flip');

		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift())
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',dealersHand.length,dealersHand[dealersHand.length-1])
			dealerTotal = calculateTotal(dealersHand,'dealer')
		}
		checkWin();
		// console.log("the deck length on stand:" + theDeck.length)
	});


	$('.reset-button').click(function(){
		reset();
		// console.log("the deck length on reset:" + theDeck.length)
	});

});


//===== END DOC READY =====//



function checkWin(){
	playerTotal = calculateTotal(playersHand,'player');
	dealerTotal = calculateTotal(dealersHand,'dealer');

	if(playerTotal > 21){
		// player busted
		$('#message-alert').html("You busted. DEALER WINS.");
	}else if(dealerTotal > 21){
		// dealer busted, player wins
		$('#message-alert').html("Dealer busted. YOU WIN!");
	}else{
		//no one busted, see who's higher
		if(playerTotal>dealerTotal){
			//player won
			$('#message-alert').html("YOU WIN!");
		}else if(dealerTotal>playerTotal){
			// dealer won
			$('#message-alert').html("You lost.");
		}else{
			// it's a tie
			$('#message-alert').html("It's a tie.");
		}
	}
};


function shuffleDeck(){
for(let i = 0; i < 9000; i++){

	var random1 = Math.floor(Math.random() * theDeck.length);
	var random2 = Math.floor(Math.random() * theDeck.length);
	var temp = theDeck[random1];
	theDeck[random1] = theDeck[random2];
	theDeck[random2] = temp;
	}
};

function reset(){
	theDeck = createDeck();
	playersHand = [];
	dealersHand = [];
	handSize = 7;
	cardHandHTML = '';
	$('.card').html('');
	$('.message span').html('');
	playerTotal = calculateTotal(playersHand,'player');
	dealerTotal = calculateTotal(dealersHand,'dealer');
	buildDivs();
};


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
	var classSelector =  '.' + who + '-cards .card-' + where + ' .card-container .card-front';
	var classSelector2 =  '.' + who + '-cards .card-' + where + ' .card-container';
	// .dealer-cards .card-where .card-container .card-front

	$(classSelector).html('<img src="images/' + whatCard + '.png">');

	if(classSelector !== ".dealer-cards .card-2 .card-container .card-front"){
	$(classSelector2).toggleClass('flip');
	}
};

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

