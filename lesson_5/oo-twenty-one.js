/* eslint-disable max-lines-per-function */
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

  getPoints() {
    return this.points;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }

  static availableSuits = ['♣️', '♦️', '♥️', '♠️'];
  static availableRanks = {
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

  deal() {
    return this.deck.shift();
  }

  resetDeck() {
    this.deck = [];
    const suits = Deck.availableSuits;
    const ranks = Deck.availableRanks;
    let deck = this.deck;

    const numberOfSuits = suits.length;

    for (let suitCount = 0; suitCount < numberOfSuits; suitCount++) {
      for (let rank in ranks) {
        deck.push(new Card(suits[suitCount], rank, ranks[rank]));
      }
    }
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

  calculateScore() {
    let score;
    let aceCount = this.countAces();

    score = this.hand
      .map(card => card.getPoints())
      .reduce((sum, value) => sum + value, 0);

    while (score > Participant.POINTS_TO_WIN && aceCount > 0) {
      score -= Deck.availableRanks.Ace - 1;
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

  setScore() {
    this.score = this.calculateScore();
  }

  getBustStatus() {
    return this.busted;
  }

  setBustStatus() {
    this.busted = this.score > Participant.POINTS_TO_WIN;
  }

  hit(card) {
    this.hand.push(card);
  }

  reset() {
    this.hand = [];
    this.busted = false;
  }

  showHand() {
    return this.hand.map(card => card.getName()).join(', ');
  }
}

class Player extends Participant {
  static INITIAL_FUNDS = 5;

  constructor() {
    super();
    this.funds = Player.INITIAL_FUNDS;
  }

  decrementFunds(wager) {
    this.funds -= wager;
  }

  getFunds() {
    return this.funds;
  }

  incrementFunds(wager) {
    this.funds += wager;
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
  static RICH = 10;
  static WAGER = 1;

  start() {
    this.displayWelcomeMessage();
    this.startMatch();
    this.displayGoodbyeMessage();
  }

  prompt(message) {
    console.log('');
    console.log(message);
    console.log('');
  }

  displayInstructions() {
    console.log(
      `You'll start with $${this.player.getFunds()}. You'll earn $${
        TwentyOneGame.WAGER
      } if you win and you'll lose $${TwentyOneGame.WAGER} if you don't.`
    );
    console.log(
      `The match is over once you're rich ($${TwentyOneGame.RICH}) or you run out of money!`
    );
    console.log('');
  }

  playOneRound() {
    this.resetRound();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    if (!this.player.getBustStatus()) this.dealerTurn();
    this.displayResult();
  }

  isWinner(player, opponent) {
    const playerScore = player.getScore();
    const opponentScore = opponent.getScore();

    return (
      !player.getBustStatus() &&
      (playerScore === Participant.POINTS_TO_WIN ||
        playerScore > opponentScore ||
        opponent.getBustStatus())
    );
  }

  displayResult() {
    if (this.player.getBustStatus()) {
      this.prompt(
        `Oh no, you busted! (${this.player.getScore()}) -$${
          TwentyOneGame.WAGER
        }`
      );
    } else if (this.dealer.getBustStatus()) {
      this.prompt(
        `Yay! The dealer busted! (${this.dealer.getScore()}) +$${
          TwentyOneGame.WAGER
        }`
      );
    } else if (this.isWinner(this.player, this.dealer)) {
      this.prompt(
        `Congratulations! You won this round! +$${TwentyOneGame.WAGER}`
      );
    } else if (this.isWinner(this.dealer, this.player)) {
      this.prompt(`Nice try human! -$${TwentyOneGame.WAGER}`);
    } else {
      this.prompt(`Oh look, a tie!`);
    }
  }

  displayFunds() {
    console.log(`Funds: $${this.player.getFunds()}`);
  }

  updateFunds() {
    if (this.isWinner(this.player, this.dealer)) {
      this.player.incrementFunds(TwentyOneGame.WAGER);
    } else if (this.isWinner(this.dealer, this.player)) {
      this.player.decrementFunds(TwentyOneGame.WAGER);
    }
  }

  startMatch() {
    this.displayInstructions();

    while (true) {
      this.playOneRound();
      this.updateFunds();

      if (this.matchOver() || !this.playAgain()) break;
    }

    this.displayMatchResults();
  }

  matchOver() {
    let funds = this.player.getFunds();
    return funds === 0 || funds === TwentyOneGame.RICH;
  }

  displayMatchResults() {
    let funds = this.player.getFunds();

    if (funds === 10) {
      this.prompt(`Congratulations you're rich!`);
    } else if (funds === 0) {
      this.prompt(`Looks like you ran out of money! Better luck next time!`);
    } else {
      this.prompt(`It looks like you left early! You earned $${funds}!`);
    }
  }

  resetRound() {
    this.deck.resetDeck();
    this.deck.shuffle();
    this.player.reset();
    this.dealer.reset();
  }

  dealCards() {
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
  }

  showCards() {
    this.displayFunds();
    console.log('');
    console.log(
      `Your Hand: ${this.player.showHand()} (${this.player.getScore()})`
    );
    console.log(`Dealer: Card, ${this.dealer.showHandHidden()}`);
  }

  showAllCards() {
    console.log(
      `Your Hand: ${this.player.showHand()} (${this.player.getScore()})`
    );
    console.log(
      `Dealer: ${this.dealer.showHand()} (${this.dealer.getScore()})`
    );
  }

  playerTurn() {
    let choice = this.getPlayerAction();

    while (choice === 'h') {
      this.player.hit(this.deck.deal());

      console.clear();

      this.player.setScore();
      this.showCards();
      this.player.setBustStatus();

      if (this.player.getBustStatus()) break;

      choice = this.getPlayerAction();
    }
  }

  dealerTurn() {
    this.showAllCards();

    while (this.dealer.getScore() < TwentyOneGame.DEALER_HIT_THRESHOLD) {
      this.dealer.hit(this.deck.deal());
      this.prompt(`The dealer hit!`);
      this.showAllCards();

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

  getPlayerAction() {
    let answer;

    while (true) {
      console.log();
      answer = readline
        .question(`Would you like to hit or stay? (h/s): `)
        .toLowerCase();
      console.log();
      if (['h', 's'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    return answer;
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline
        .question('Would you like to play again? (y/n): ')
        .toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    console.clear();
    return answer === 'y';
  }
}

let game = new TwentyOneGame();
game.start();
