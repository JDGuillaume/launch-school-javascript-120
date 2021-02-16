/* eslint-disable max-lines-per-function */
const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    score: 0,
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
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
          `Please choose one of the following: ${playerObject.choices.join(
            ', '
          )}`
        );
        choice = readline.question();
        if (playerObject.choices.includes(choice)) break;
        console.log(`Sorry, invalid choice.`);
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

  displayWelcomeMessage() {
    console.log(
      `Welcome to Rock, Paper, Scissors, Lizard, Spock! You'll be playing best of ${this.GAMES_TO_WIN}.`
    );
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}.`);
    console.log(`The computer chose: ${this.computer.move}.`);

    if (this.WIN_CONDITIONS[humanMove].includes(computerMove)) {
      this.human.score++;
      console.log(`You win!`);
      console.log(
        `Player - ${this.human.score} Computer - ${this.computer.score}`
      );
    } else if (this.WIN_CONDITIONS[computerMove].includes(humanMove)) {
      this.computer.score++;
      console.log(`Computer wins!`);
      console.log(
        `Player - ${this.human.score} Computer - ${this.computer.score}`
      );
    } else {
      console.log(`It's a tie.`);
      console.log(
        `Player - ${this.human.score} Computer - ${this.computer.score}`
      );
    }
  },

  displayOverallWinner() {
    console.log(
      `${
        this.human.score === this.GAMES_TO_WIN ? `You` : `Computer`
      } won best of 5!`
    );
  },

  displayGoodbyeMessage() {
    console.log(
      'Thanks for playing Rock, Paper, Scissors, Lizard, Spock! Goodbye!'
    );
  },

  playAgain() {
    console.log(`Would you like to play again? (y/n)`);
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
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
        this.displayWinner();
      }

      this.displayOverallWinner();

      if (!this.playAgain()) break;

      this.resetScore();
      console.clear();
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
