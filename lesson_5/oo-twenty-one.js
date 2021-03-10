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
  constructor() {
    this.availableSuits = ['♣️', '♦️', '♥️', '♠️'];
    this.availableRanks = {
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
  }

  deal() {
    return this.deck.shift();
  }

  resetDeck() {
    this.deck = [];
    const suits = this.availableSuits;
    const ranks = this.availableRanks;
    let deck = this.deck;

    const numberOfSuits = suits.length;

    for (let suitCount = 0; suitCount < numberOfSuits; suitCount++) {
      for (let rank in ranks) {
        deck.push(new Card(suits[suitCount], rank, ranks[rank]));
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

  shuffle() {
    // Fisher-Yates Shuffle from Twenty-One Procedural
    const deck = this.deck;

    for (let index = deck.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]];
    }
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.score = 0;
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  calculateScore() {
    let score;
    let aceCount = this.countAces();

    score = this.hand
      .map(card => card.getPoints())
      .reduce((sum, value) => sum + value, 0);

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  }

  countAces() {
    return this.hand.map(card => card.getRank()).filter(rank => rank === 'Ace')
      .length;
  }

  getScore() {
    this.setScore();
    return this.score;
  }

  hit(card) {
    this.addCardToHand(card);
  }

  isBusted() {
    return this.score > 21;
  }

  setScore() {
    this.score = this.calculateScore();
  }
}

class Player extends Participant {
  constructor() {
    super();
  }

  showHand() {
    return this.hand.map(card => card.getName()).join(', ');
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  hit() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  showHand() {
    return this.hand[1].getName();
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
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
  }

  prepareDeck() {
    this.deck.resetDeck();
    this.deck.shuffle();
  }

  dealCards() {
    this.player.addCardToHand(this.deck.deal());
    this.dealer.addCardToHand(this.deck.deal());
    this.player.addCardToHand(this.deck.deal());
    this.dealer.addCardToHand(this.deck.deal());
  }

  showCards() {
    console.log(`Your Hand: ${this.player.showHand()}`);
    console.log(`Dealer: Card, ${this.dealer.showHand()}`);
    console.log('');
  }

  playerTurn() {
    let choice = this.getPlayerAction();

    while (choice === 'h') {
      this.player.hit(this.deck.deal());

      console.clear();

      this.showCards();
      choice = this.getPlayerAction();
    }
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to 21!`);
    console.log(`The player that gets closest to 21 without going over, wins!`);
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing 21! Goodbye!`);
  }

  displayResult() {
    //STUB
  }

  getPlayerAction() {
    let answer;

    while (true) {
      answer = readline
        .question(
          `You are currently at ${this.player.getScore()}. Would you like to hit or stay? (h/s): `
        )
        .toLowerCase();

      if (['h', 's'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    return answer;
  }
}

let game = new TwentyOneGame();
game.start();
