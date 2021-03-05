// ES6 Syntax
class Animal {
  constructor(name) {
     this.name = name;
  }
  eat() {
    console.log('eating');
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() {
    console.log('woof!');
  }
}
let cheetah = new Animal('speedy');
let henry = new Dog('henry');

cheetah.eat(); // => ?
cheetah.name; // => ?
// What will happen when we invoke the next method?
// When eat is invoked, JS will check the _____ for the method. If it doesn't find it, it will then traverse the _____ to look for the method.
henry.eat(); // => ?
henry.bark(); // => ?
henry.name; // => ?
console.log(cheetah instanceof Animal); // => true -> cheetah.__proto__ -> Animal.prototype -> Animal found
console.log(cheetah instanceof Dog); // => false -> cheetah.__proto__ -> Animal.prototype -> ... -> Dog not found
console.log(henry instanceof Animal); // => true -> henry.__proto__ -> Dog.prototype -> Dog.prototype.__proto__ -> Animal.prototype -> Animal found
console.log(henry instanceof Dog); // => true -> henry.__proto__ -> Dog.prototype -> Dog found
// Where does getPrototypeOf fit in?
// What is the difference between Object.getPrototypeOf(someObj) and someObj.prototype?
// Answer: JS will automatically create a _____ when declaring a function,
// and link the _____ to it, example:
function SomeConstructor() {}
console.log(`SomeConstructor:`, SomeConstructor);
console.log(`.prototype:`, SomeConstructor.prototype)
console.log(`.prototype.constructor:`, SomeConstructor.prototype.constructor);
// Then, when an object is created, it's _____ will reference the _____ of its constructor
let someObj = new SomeConstructor();
console.log('someObj [[Prototype]]:', Object.getPrototypeOf(someObj));
// Important note:
console.log('type of SomeConstructor.prototype:', typeof SomeConstructor.prototype);
console.log('type of SomeConstructor [[Prototype]]:', typeof Object.getPrototypeOf(SomeConstructor));
console.log('type of someObj.prototype:', typeof someObj.prototype);
console.log('type of someObj [[Prototype]]:', typeof Object.getPrototypeOf(someObj));
Object.getPrototypeOf(cheetah) === Animal.prototype; // => true
Object.getPrototypeOf(henry) === Dog.prototype; // => true
// Are either of these possible?
Object.getPrototypeOf(cheetah) === [using Dog]; // => true -> yes, but why?
Object.getPrototypeOf(henry) === [using Animal]; // => true -> no, but why?
// Let's look at OLOO now
let Animal = {
  eat() {
    console.log('eating');
  },
  init(name='') {
    this.name = name;
    return this;
  },
};
let Dog = {
  bark() {
    console.log('bark!');
  },
  init(name='') {
    this.name = name;
    return this;
  },
};
let cheetah = Object.create(Animal).init('speedy');
let henry = Object.create(Dog).init('henry');
cheetah.eat(); // => ?
henry.eat(); // => ?
// How do we fix this?
Object.setPrototypeOf(Dog, Animal);
// OR
Dog = Object.create(Animal);
Dog.bark = function() {
  console.log('woof!');
};
henry.eat(); // => ?
henry.bark(); // => ?
// Any changes we should make to Dog?
// init() method is redundant since it overrides the default to do the same thing
let Dog = {
  bark() {
    console.log('woof!');
  },
  // what would happen?
  eat() {
    console.log('dog is eating');
  },
};
// What will happen in these logs and why?
console.log(cheetah instanceof Animal); // => ?
console.log(cheetah instanceof Dog); // => ?
console.log(henry instanceof Animal); // => ?
console.log(henry instanceof Dog); // => ?
Object.getPrototypeOf(cheetah) === [using Animal]; // => true
Object.getPrototypeOf(henry) === [using Dog]; // => true
// Let's make a function that handles both
function isInstanceOf(obj, parent) {
  // ...
}