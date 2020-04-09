// Set up a bunch of variables
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var reversedDeck = getDeck(values, suits);
var forwardDeck = new Array();
var gameEnd = false;
var winner = false;
var bigLoser = false;
var move = true;
var moveCounter = 0;
var leftOverArr = [];
var tempArr;

shuffle(reversedDeck);

/**
 * Function to flip a card from the revered deck to the forward deck
 */
function flip() {
    if(forwardDeck.length < 4) {
        while(forwardDeck.length < 4 && reversedDeck.length > 0) {
            forwardDeck.push(reversedDeck[reversedDeck.length - 1]);
            reversedDeck.pop();
        }
    } else {
        forwardDeck.push(reversedDeck[reversedDeck.length - 1]);
        reversedDeck.pop();
    }
}

/**
 * Function to determine if the current hand of cards can be played on 
 */
function determine() {
    var go = true;
    move = true;

    while(go && forwardDeck.length >= 4) {
        if(forwardDeck[forwardDeck.length-1].Suit === forwardDeck[forwardDeck.length-4].Suit) {
            forwardDeck.splice(forwardDeck.length-3, 2);
            go = true;
            moveCounter = 0;
            continue;
        }

        if(forwardDeck[forwardDeck.length-1].Value === forwardDeck[forwardDeck.length-4].Value) {
            forwardDeck.splice(forwardDeck.length-4, 4);
            go = true;
            moveCounter = 0;
            continue;
        }

        go = false;

        if(gameEnd == true && moveCounter == 3) {
            move = false;
        }
    }

    if(reversedDeck.length == 0) {
        gameEnd = true; 
    }
}

/**
 * Function to start the process of the "End Game". This is when there are no more cards in the reversed
 * deck but play still continues with the cards at the back of the forward deck
 */
function initiateEndGame() {
    while(move) {
        forwardDeck.push(forwardDeck.shift());
        moveCounter++;
        determine();
        if(forwardDeck.length < 4) {
            break;
        } else {
            initiateEndGame();
        }
    }
}

/**
 * Shuffle a "deck of cards". It is just an array of objects
 * @param {Array} deck 
 */
function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
    }
    // console.log(`Starting deck:\n ${reversedDeck}`)
}

/**
 * Function to create the initial deck of cards
 */
function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

/**
 * Function to play the actual game
 */
function play() {
    while(!gameEnd) {
        flip();
        determine();
    }

    if(forwardDeck.length >= 4) {
        initiateEndGame();
    }

    if(forwardDeck.length == 0) {
        winner = true;
    }
    if(forwardDeck.length == 52) {
        bigLoser = true;
    }
    console.log(forwardDeck);
    console.log(`You had ${forwardDeck.length} cards left.`)
    leftOverArr.push(forwardDeck.length);
}

/**
 * Play one round of the game
 */
play();

/**
 * Play games until you win. Print how many games it took to win
 */
// var counter = 0;
// while(!bigLoser) {
//     reversedDeck = getDeck(values, suits);
//     shuffle(reversedDeck);
//     tempArr = reversedDeck.slice(0);
//     forwardDeck = new Array();
//     gameEnd = false;
//     winner = false;
//     counter++;
//     moveCounter = 0;
//     play();
// }

// console.log(`It took ${counter} games to get a game where you had 52 cards left over.`);
// console.log(`This was the deck for that:\n ${tempArr}`);

/**
 * Play a lot of games to get some statistical data
 * Takes about a minute to run, could be optimized but I just wanted data
 */

// var averagesArr = [];
// var medianArr = [];
// for(let j = 0; j < 100; j++) {
//     var counterArr = [];
//     var counter = 0;
//     for(var i = 0; i < 100; i++) {
//         reversedDeck = getDeck(values, suits);
//         shuffle(reversedDeck);
//         forwardDeck = new Array();
//         gameEnd = false;
//         winner = false;
//         moveCounter = 0;
//         counter = 0;
    
//         while(!winner) {
//             reversedDeck = getDeck(values, suits);
//             shuffle(reversedDeck);
//             forwardDeck = new Array();
//             gameEnd = false;
//             winner = false;
//             counter++;
//             moveCounter = 0;
//             play();
//         }
//         counterArr.push(counter);
//         medianArr.push(counter);
//     }
        
//     var totalGames = counterArr.reduce((a, b) => a + b, 0);
//     var averageGames = totalGames/100;
    
//     averagesArr.push(averageGames);
// }

// // Mean of all games needed to play to win
// var totalMeans = averagesArr.reduce((a, b) => a + b, 0);
// var grandMean = totalMeans/100;

// // Median number of games needed to win
// const arrSort = medianArr.sort((a, b) => a - b);
// const mid = Math.ceil(medianArr.length / 2);
// const median = medianArr.length % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];

// // Mean of left over cards
// var totalCards = leftOverArr.reduce((a, b) => a + b, 0);
// var leftOverMean = totalCards/leftOverArr.length;

// // Median number of left over cards
// var sortedLeftOverArr = leftOverArr.sort((a, b) => a - b);
// const leftOverMid = Math.ceil(leftOverArr.length / 2);
// const leftOverMedian = leftOverArr.length % 2 == 0 ? (sortedLeftOverArr[mid] + sortedLeftOverArr[mid - 1]) / 2 : sortedLeftOverArr[mid - 1];

// console.log(`Average games needed to win: ${grandMean}`);
// console.log(`Median games needed to win: ${median}`);
// console.log(`Min games played: ${arrSort[0]}`)
// console.log(`Max games played: ${arrSort[arrSort.length-1]}`)
// console.log(`Average left over cards: ${leftOverMean}`);
// console.log(`Median left over cards: ${leftOverMedian}`);
// console.log(`Min left over cards: ${sortedLeftOverArr[0]}`);
// console.log(`Max left over cards: ${sortedLeftOverArr[sortedLeftOverArr.length-1]}`);
