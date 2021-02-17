/* eslint-disable max-lines-per-function */
const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    moveHistory: {},
    score: 0,
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    recordMove() {
      if (this.moveHistory[this.move]) {
        this.moveHistory[this.move]++;
      } else {
        this.moveHistory[this.move] = 1;
      }
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    move: null,

    choose() {
      let randomIndex = Math.floor(Math.random() * playerObject.choices.length);
      this.move = playerObject.choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log(
          `\nPlease choose one of the following: ${playerObject.choices.join(
            ', '
          )}`
        );
        choice = readline.question().toLowerCase();
        if (playerObject.choices.includes(choice)) break;
        console.log(`\nSorry, invalid choice.`);
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  GAMES_TO_WIN: 5,

  WIN_CONDITIONS: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  },

  updateComputerChoices() {
    const newChoices = [];

    for (let choice in this.human.moveHistory) {
      for (let count = this.human.moveHistory[choice]; count > 0; count--) {
        Object.keys(this.WIN_CONDITIONS).forEach(possibleChoice => {
          if (this.WIN_CONDITIONS[possibleChoice].includes(choice)) {
            newChoices.push(possibleChoice);
          }
        });
      }
    }

    this.computer.choices = newChoices;
  },

  displayWelcomeMessage() {
    console.log(
      `Welcome to Rock, Paper, Scissors, Lizard, Spock! You'll be playing best of ${this.GAMES_TO_WIN}.`
    );
  },

  displayMoves() {
    console.log(`\nYou chose: ${this.human.move}.`);
    console.log(`The computer chose: ${this.computer.move}.`);
  },

  recordMoves() {
    this.human.recordMove();
    this.computer.recordMove();
  },

  findWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let winner;

    if (this.WIN_CONDITIONS[humanMove].includes(computerMove)) {
      winner = 'human';
    } else if (this.WIN_CONDITIONS[computerMove].includes(humanMove)) {
      winner = 'computer';
    } else {
      winner = 'tie';
    }

    return winner;
  },

  incrementScore(winner) {
    switch (winner) {
      case 'human':
        this.human.score++;
        break;
      case 'computer':
        this.computer.score++;
    }
  },

  displayResults(winner) {
    switch (winner) {
      case 'human':
        console.log(`\nYou win!`);
        console.log(
          `Player - ${this.human.score} Computer - ${this.computer.score}`
        );
        break;
      case 'computer':
        console.log(`\nComputer wins!`);
        console.log(
          `Player - ${this.human.score} Computer - ${this.computer.score}`
        );
        break;
      default:
        console.log(`\nIt's a tie.`);
        console.log(
          `Player - ${this.human.score} Computer - ${this.computer.score}`
        );
        break;
    }
  },

  displayOverallWinner() {
    console.log(
      `${
        this.human.score === this.GAMES_TO_WIN ? `You` : `Computer`
      } won best of ${this.GAMES_TO_WIN}!`
    );

    console.log(`------------`);
    console.log(`Player Moves`);
    console.log(this.human.moveHistory);
    console.log();
    console.log(`Computer Moves`);
    console.log(this.computer.moveHistory);
  },

  displayGoodbyeMessage() {
    console.log(
      '\nThanks for playing Rock, Paper, Scissors, Lizard, Spock! Goodbye!'
    );
  },

  playAgain() {
    console.log(`\nWould you like to play again? (y/n)`);
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
    console.clear();
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      while (
        this.human.score < this.GAMES_TO_WIN &&
        this.computer.score < this.GAMES_TO_WIN
      ) {
        this.human.choose();
        this.computer.choose();

        this.displayMoves();
        this.recordMoves();

        const winner = this.findWinner();
        this.incrementScore(winner);
        this.displayResults(winner);
      }

      this.displayOverallWinner();

      if (!this.playAgain()) break;

      this.resetScore();
      this.updateComputerChoices();
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
