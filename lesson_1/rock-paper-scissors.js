/* eslint-disable max-lines-per-function */
const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    move: null,

    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
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
        console.log(`Please choose rock, paper, or scissors`);
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log(`Sorry, invalid choice.`);
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createMove() {
  return {
    // possible state: type of move (rock, paper, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

/* Since we don't know yet where to put 'compare',
   let's define it as an ordinary function. */

compare = function(move1, move2) {
  // not yet implemented.
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  GAMES_TO_WIN: 5,

  displayWelcomeMessage() {
    console.log(
      `Welcome to Rock, Paper, Scissors! You'll be playing best of ${this.GAMES_TO_WIN}.`
    );
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}.`);
    console.log(`The computer chose: ${this.computer.move}.`);

    if (
      (humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')
    ) {
      this.human.score++;
      console.log(`You win!`);
      console.log(
        `Player - ${this.human.score} Computer - ${this.computer.score}`
      );
    } else if (
      (humanMove === 'rock' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'rock')
    ) {
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
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
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
    }
  },
};

RPSGame.play();
