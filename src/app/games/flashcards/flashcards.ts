const Shuffle = require('fisher-yates-shuffle');

export class Flashcards {

    shuffle() {
        const shuffledDeck = Shuffle(this.deck);
        console.log(shuffledDeck);
    }

    public deck;

    constructor() {
        //this.deck = deck;
        this.deck = [
            { word: "test1", level: 1},
            { word: "test2", level: 1},
            { word: "test3", level: 5},
            { word: "test4", level: 1},
            { word: "test5", level: 2},
            { word: "test6", level: 4},
        ]

        this.shuffle();
            
        }
    }
