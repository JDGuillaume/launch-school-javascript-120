const readline = require('readline-sync');

class Card {
  constructor(suit, rank, points) {
    this.suit = suit;
    this.rank = rank;
    this.points = points;
  }

  getName() {
    return `${this.suit} ${this.rank}`;
  }

  getRank() {
    return this.rank;
  }

  getPoints() {
    return this.points;
  }

  getSuit() {
    return this.suit;
  }
}

class Deck {
  // eslint-disable-next-line max-lines-per-function
  constructor() {
    this.suits = ['♣️', '♦️', '♥️', '♠️'];
    this.ranks = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      Jack: 10,
      Queen: 10,
      King: 10,
      Ace: 11,
    };

    this.deck = [];
    this.replenishDeck();
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }

  replenishDeck() {
    const numberOfSuits = this.suits.length;

    for (let suitCount = 0; suitCount < numberOfSuits; suitCount++) {
      for (let rank in this.ranks) {
        this.deck.push(new Card(this.suits[suitCount], rank, this.ranks[rank]));
      }
    }
  }

  showCardsInDeck() {
    return this.deck.map(card => card.getName());
  }

  showDeck() {
    return this.deck;
  }

  showDeckCount() {
    return this.deck.length;
  }

  shuffle() {}
}

class Participant {
  constructor() {
    //STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    super();
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    //STUB
    // What sort of state does the game need?
    // A deck? Two participants?
  }

  start() {
    //SPIKE
    this.prepareDeck();
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
    console.log(this.deck.showDeck());
    console.log(this.deck.showDeckCount());
    console.log(this.deck.showCardsInDeck());
  }

  prepareDeck() {
    // this.deck.replenishDeck();
    this.deck.shuffle();
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to 21!`);
    console.log('');
    console.log(`The player that gets closest to 21 without going over, wins!`);
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing 21! Goodbye!`);
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();
