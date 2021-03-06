import { Injectable } from '@angular/core';
const Shuffle = require('fisher-yates-shuffle');
import { GetUserInfo } from './getUserInfo.service';
import { CompileMetadataResolver } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
  })
export class FlashcardsService {

    public deck;
    public todayDeck;
    public language;
    public fakeDeck = [
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c1185e0cbfa5e2b7eb5fe11", word: "ghgh", meaning: "lkguyy  uyyuk", howKnown: "4"},
        {nextReview: '2019-02-12T16:38:08.395Z',_id: "5c1185e3cbfa5e2b7eb5fe12", word: "fghfgh", meaning: "ffffffffffffffffffffff", howKnown: "2"},
        {nextReview: '2019-01-12T16:38:08.395Z',_id: "5c1fbee940599d4b1d29dba5", word: "understand ", meaning: "entender", howKnown: "5"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b0313d6481e2cbbe654", word: "culture’s ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b0513d6481e2cbbe655", word: "Christianity ", howKnown: "1"},
        {nextReview: '2019-02-13T16:38:08.395Z',_id: "5c659b0613d6481e2cbbe656", word: "possess ", howKnown: "1"},
        {nextReview: '2019-02-05T16:38:08.395Z',_id: "5c659b0913d6481e2cbbe657", word: "that ", howKnown: "1"},
        {nextReview: '2019-02-02T16:38:08.395Z',_id: "5c659b0d13d6481e2cbbe658", word: "important ", howKnown: "1"},
        {nextReview: '2019-02-06T16:38:08.395Z',_id: "5c659b0f13d6481e2cbbe659", word: "classical ", howKnown: "1"},
        {nextReview: '2019-02-14T16:38:08.395Z',_id: "5c659b1113d6481e2cbbe65a", word: "superbly ", howKnown: "1"},
        {nextReview: '2019-02-02T16:38:08.395Z',_id: "5c659b1313d6481e2cbbe65b", word: "to ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b1413d6481e2cbbe65c", word: "gesture ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b1c13d6481e2cbbe65d", word: "music ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b1d13d6481e2cbbe65e", word: "every ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b1f13d6481e2cbbe65f", word: "music ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b2113d6481e2cbbe660", word: "consider ", howKnown: "1"},
        {nextReview: '2019-01-23T16:38:08.395Z',_id: "5c659b2613d6481e2cbbe661", word: "model ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b2813d6481e2cbbe662", word: "morality ", howKnown: "1"},
        {nextReview: '2019-02-17T16:38:08.395Z',_id: "5c659b2a13d6481e2cbbe663", word: "human ", howKnown: "1"},
        {nextReview: '2019-02-04T16:38:08.395Z',_id: "5c659b2c13d6481e2cbbe664", word: "spirit ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b2e13d6481e2cbbe665", word: "for ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b4b13d6481e2cbbe666", word: "classical ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b4c13d6481e2cbbe667", word: "because ", howKnown: "1"},
        {nextReview: '2019-02-15T16:38:08.395Z',_id: "5c659b4f13d6481e2cbbe668", word: "the ", howKnown: "1"}
    ]

    constructor(private getInfo: GetUserInfo) {
        getInfo.getUserWords().map((wordList) => console.log(wordList)).subscribe((wordlist) => this.deck = wordlist);
    }

    setCardsLanguage(language) {
        this.language = language;
    }

    /**
     * Shuffle the cards array. Uses fisher-yates-shuffle package.
     * @link https://www.npmjs.com/package/fisher-yates-shuffle
     */
    public getCards(cardsQuantity) {
        return this.getInfo.getUserWords()
        .map((wordList) => {console.log(wordList); return wordList})
        .map((wordlist) => {this.deck = wordlist; return wordlist})
        .map((wordlist) => this.getTodayCards(wordlist, cardsQuantity))
        .map(() => this.shuffle());
    }

    /**
     * Shuffle the cards array. Uses fisher-yates-shuffle package.
     * @link https://www.npmjs.com/package/fisher-yates-shuffle
     */
    public shuffle() {
        const shuffledDeck = Shuffle(this.todayDeck);
        this.todayDeck = shuffledDeck;
        console.log(this.todayDeck);
        return shuffledDeck;
    }

    /**
     * @author Renan Garcia
     * @returns Array
     * Coloca as cartas por ordem de data e r etorna as cartas com data de review para o dia atual
     */
    public getTodayCards(cards, cardsQuantity) {
        console.log(cardsQuantity);
        console.log(this.deck);
        let ncards;
        if (this.language != "any") {
            ncards = cards.filter(this.filterByLanguage(this.language));
        } else {
            ncards = cards;
        }
        console.log(ncards);
        ncards.sort((a, b) => {
            let aDate = new Date(a.nextReview);
            let bDate = new Date(b.nextReview);
            if (aDate > bDate) {
                return 1;
            } else {
                return -1;
            }
        });
        let todayCards = ncards.filter(this.isDueToday);
        let newtodayCards = todayCards.slice(0, cardsQuantity - 1); // Permanece só o ´numero de cartas desejado
        
        /*Se as cartas devidas para o dia forem menos
        do que a quantidade escolhida pelo usuário,
        pega todas as cartas */
        if (todayCards.length < cardsQuantity) {
            newtodayCards = ncards.slice(0, cardsQuantity - 1);
        }
        console.log(newtodayCards);
        console.log(cardsQuantity);
        this.todayDeck = newtodayCards
        return newtodayCards;
    }

    filterByLanguage(lang) {
        return function(word) {
            console.log(word.lang + " - " + lang)
            return word.lang === lang;
        }
    }

    /**
     * Compara a datas das cartas com a do dia e retorna a carta com data menor que hoje.
     * @author Renan Garcia
     * @returns object
     */
    private isDueToday(card) {
        let today = new Date();
        today.setHours(23,59,59);
        let cardDate = new Date(card.nextReview);
        if (cardDate < today) {
            return card;
        }
    }
}
