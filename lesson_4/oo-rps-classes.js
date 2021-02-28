/* eslint-disable max-lines-per-function */
let readline = require('readline-sync');

class Player {
  constructor() {
    this.move = null;
    this.choices = ['rock', 'paper', 'scissors'];
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  choose() {
    this.randomIndex = Math.floor(Math.random() * this.choices.length);
    this.move = this.choices[this.randomIndex];
  }
}

class Human extends Player {
  constructor() {
    super();
  }

  choose() {
    this.choice = null;

    while (true) {
      console.log('Please choose rock, paper, or scissors:');
      this.choice = readline.question();
      if (this.choices.includes(this.choice)) break;
      console.log('Sorry, invalid choice.');
    }

    this.move = this.choice;
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  }

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    this.humanMove = this.human.move;
    this.computerMove = this.computer.move;

    if (
      (this.humanMove === 'rock' && this.computerMove === 'scissors') ||
      (this.humanMove === 'paper' && this.computerMove === 'rock') ||
      (this.humanMove === 'scissors' && this.computerMove === 'paper')
    ) {
      console.log('You win!');
    } else if (
      (this.humanMove === 'rock' && this.computerMove === 'paper') ||
      (this.humanMove === 'paper' && this.computerMove === 'scissors') ||
      (this.humanMove === 'scissors' && this.computerMove === 'rock')
    ) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  }

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    this.answer = readline.question();
    return this.answer.toLowerCase()[0] === 'y';
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }
}

let game = new RPSGame();
game.play();
