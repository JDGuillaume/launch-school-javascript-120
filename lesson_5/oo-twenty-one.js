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
    this.busted = false;
    this.hand = [];
    this.score = 0;
  }

  static POINTS_TO_WIN = 21;

  addCardToHand(card) {
    this.hand.push(card);
  }

  calculateScore() {
    let score;
    let aceCount = this.countAces();

    score = this.hand
      .map(card => card.getPoints())
      .reduce((sum, value) => sum + value, 0);

    while (score > Participant.POINTS_TO_WIN && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  }

  countAces() {
    return this.hand.map(card => card.getRank()).filter(rank => rank === 'Ace')
      .length;
  }

  getBustStatus() {
    return this.busted;
  }

  getScore() {
    this.setScore();
    return this.score;
  }

  hit(card) {
    this.addCardToHand(card);
  }

  setBustStatus() {
    this.getScore();
    this.busted = this.score > Participant.POINTS_TO_WIN;
  }

  setScore() {
    this.score = this.calculateScore();
  }

  showHand() {
    return this.hand.map(card => card.getName()).join(', ');
  }
}

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  showHandHidden() {
    return this.hand[1].getName();
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  static DEALER_HIT_THRESHOLD = 17;

  start() {
    this.displayWelcomeMessage();
    this.playOneRound();
    this.displayGoodbyeMessage();
  }

  playOneRound() {
    this.prepareDeck();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    if (!this.player.getBustStatus) this.dealerTurn();
    this.displayResult();
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
    console.log(`Dealer: Card, ${this.dealer.showHandHidden()}`);
    console.log('');
  }

  playerTurn() {
    let choice = this.getPlayerAction();

    while (choice === 'h') {
      this.player.hit(this.deck.deal());

      console.clear();

      this.showCards();

      this.player.setBustStatus();
      if (this.player.getBustStatus()) break;

      choice = this.getPlayerAction();
    }
  }

  dealerTurn() {
    while (this.dealer.score < TwentyOneGame.DEALER_HIT_THRESHOLD) {
      this.dealer.hit(this.deck.deal());

      this.dealer.setBustStatus();
      if (this.dealer.getBustStatus()) break;
    }
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
    console.log(
      `Player - ${this.player.getScore()} Dealer - ${this.dealer.getScore()}`
    );
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
