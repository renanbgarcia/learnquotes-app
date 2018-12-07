const Shuffle = require('fisher-yates-shuffle');

export class Flashcards {

    public deck;

    constructor(deck) {
        this.deck = deck;
    }

    /**
     * Shuffle the cards array. Uses fisher-yates-shuffle package.
     * @link https://www.npmjs.com/package/fisher-yates-shuffle
     */
    public shuffle() {
        const shuffledDeck = Shuffle(this.deck);
        this.setDeck(shuffledDeck);
    }
    
    private setDeck(newdeck) {
        this.deck = newdeck;
    }
}
