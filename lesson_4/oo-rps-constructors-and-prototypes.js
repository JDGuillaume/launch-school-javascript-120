/* eslint-disable max-lines-per-function */
let readline = require('readline-sync');

function Player() {
  this.move = null;
  this.choices = ['rock', 'paper', 'scissors'];
}

function Computer() {
  this.prototype = new Player();
  this.constructor = Computer;
}

Computer.prototype.choose = function() {
  this.randomIndex = Math.floor(Math.random() * this.prototype.choices.length);
  this.move = this.prototype.choices[this.randomIndex];
};

function Human() {
  this.prototype = new Player();
  this.constructor = Human;
}

Human.prototype.choose = function() {
  this.choice = null;

  while (true) {
    console.log('Please choose rock, paper, or scissors:');
    this.choice = readline.question();
    if (this.prototype.choices.includes(this.choice)) break;
    console.log('Sorry, invalid choice.');
  }

  this.move = this.choice;
};

function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();

  this.displayWelcomeMessage = function() {
    console.log('Welcome to Rock, Paper, Scissors!');
  };

  this.displayGoodbyeMessage = function() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  };

  this.displayWinner = function() {
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
  };

  this.playAgain = function() {
    console.log('Would you like to play again? (y/n)');
    this.answer = readline.question();
    return this.answer.toLowerCase()[0] === 'y';
  };

  this.play = function() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  };
}

let game = new RPSGame();
game.play();
