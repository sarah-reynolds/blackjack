// GLOBALS


var theDeck = createDeck();
var playersHand = [];
var dealersHand = [];
console.log("Page load:"+theDeck);


$(document).ready(function(){

	$('.deal-button').click(function(){
		shuffleDeck();
		playersHand.push(theDeck[0]);
		playersHand.push(theDeck[2]);

		placeCard('player','one',playersHand[0]);
		placeCard('player','two',playersHand[1]);
		

		dealersHand.push(theDeck[1]);
		dealersHand.push(theDeck[3]);

		placeCard('dealer','one',dealersHand[0]);
		placeCard('dealer','two',dealersHand[1]);


	})

	$('.hit-button').click(function(){

	})

	$('.stand-button').click(function(){

	})


	function shuffleDeck(){
	for(let i = 0; i < 9000; i++){


		var random1 = Math.floor(Math.random() * theDeck.length);
		var random2 = Math.floor(Math.random() * theDeck.length);

		

		var temp = theDeck[random1];

		theDeck[random1] = theDeck[random2];
		theDeck[random2] = temp;

		}
		console.log("Shuffle:"+theDeck);

	}

});


function createDeck(){
	var newDeck = [];
	var suits = ['h', 's', 'd', 'c'];

	for(let s = 0; s<suits.length; s++){
		for(let c = 1; c <= 13; c++){
			newDeck.push(c+suits[s]);
		}
	}
	return(newDeck);
	console.log(newDeck);
};

function placeCard(who, where, whatCard){
	var classSelector =  '.' + who + '-cards .card-' + where;

	$(classSelector).html('<img src="images/' + whatCard + '.png">');
}
