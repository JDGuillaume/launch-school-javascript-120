/* eslint-disable max-lines-per-function */
/* eslint-disable no-mixed-operators */
const readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[String(counter)] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  // eslint-disable-next-line max-lines-per-function
  display(humanScore, computerScore) {
    console.log('');
    console.log(`Score: Player - ${humanScore} Computer - ${computerScore}`);
    console.log('     |     |');
    console.log(
      `  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`
    );
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(
      `  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`
    );
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(
      `  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`
    );
    console.log('     |     |');
    console.log('');
  }

  displayWithClear(humanScore, computerScore) {
    console.clear();
    console.log('');
    console.log('');
    this.display(humanScore, computerScore);
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  joinOr(array, delimiter = ',', separator = 'or') {
    const length = array.length;

    if (length > 2) {
      return (
        array.slice(0, -1).join(`${delimiter} `) +
        `${delimiter} ${separator} ` +
        array[length - 1]
      );
    } else if (length === 2) {
      return array[0] + ` ${separator} ` + array[1];
    } else {
      return String(array[0]);
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    //STUB
    // Need a board and two players
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'], // top row of board
    ['4', '5', '6'], // center row of board
    ['7', '8', '9'], // bottom row of board
    ['1', '4', '7'], // left column of board
    ['2', '5', '8'], // middle column of board
    ['3', '6', '9'], // right column of board
    ['1', '5', '9'], // diagonal: top-left to bottom-right
    ['3', '5', '7'], // diagonal: bottom-left to top-right
  ];

  static GAMES_TO_WIN = 3;

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    let possibleComputerWins = this.isPossibleWin(this.computer, this.human);
    let possibleHumanWins = this.isPossibleWin(this.human, this.computer);

    if (possibleComputerWins.length) {
      choice = possibleComputerWins[0].find(element =>
        validChoices.includes(element)
      );
    } else if (possibleHumanWins.length) {
      choice = possibleHumanWins[0].find(element =>
        validChoices.includes(element)
      );
    } else if (validChoices.includes('5')) {
      choice = '5';
    } else {
      do {
        choice = Math.floor(9 * Math.random() + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to Tic Tac Toe!`);
    console.log(`You'll be playing best of 3!`);
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayOverallWinner() {
    if (this.human.score === 3) {
      console.log(`You won it all! Congratulations!`);
      console.log(``);
    } else {
      console.log(`The computer won! Better luck next time!`);
      console.log(``);
    }
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A time game. How boring.');
    }
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.board.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log(`Sorry, that's not a valid choice.`);
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  isPossibleWin(player, opponent) {
    return TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return (
        this.board.countMarkersFor(player, row) === 2 &&
        this.board.countMarkersFor(opponent, row) === 0
      );
    });
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (
      this.human.getScore() !== TTTGame.GAMES_TO_WIN &&
      this.computer.getScore() !== TTTGame.GAMES_TO_WIN
    ) {
      this.board.display(this.human.getScore(), this.computer.getScore());

      while (true) {
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear(
          this.human.getScore(),
          this.computer.getScore()
        );
      }

      this.board.displayWithClear(
        this.human.getScore(),
        this.computer.getScore()
      );
      this.displayResults();

      this.reset();
    }

    this.displayOverallWinner();
    this.displayGoodbyeMessage();
  }

  reset() {
    this.board = new Board();
    console.clear();
  }

  someoneWon() {
    this.updateWinCount();
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  updateWinCount() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }
}

let game = new TTTGame();
game.play();
