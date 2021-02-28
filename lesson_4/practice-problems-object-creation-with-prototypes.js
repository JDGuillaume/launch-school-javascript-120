function createPet(animal, name) {
  return {
    animal,
    name,
    sleep() {
      return `I am sleeping.`;
    },
    wake() {
      return `I am awake`;
    },
  };
}

let pudding = createPet('Cat', 'Pudding');
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
console.log(pudding.sleep()); // I am sleeping
console.log(pudding.wake()); // I am awake

let neptune = createPet('Fish', 'Neptune');
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
console.log(neptune.sleep()); // I am sleeping
console.log(neptune.wake()); // I am awake

let PetPrototype = {
  sleep: function() {
    return `I am sleeping.`;
  },
  wake: function() {
    return `I am awake.`;
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },
};

let pudding = Object.create(PetPrototype).init('Cat', 'Pudding');
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
console.log(pudding.sleep()); // I am sleeping
console.log(pudding.wake()); // I am awake

let neptune = Object.create(PetPrototype).init('Fish', 'Neptune');
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
console.log(neptune.sleep()); // I am sleeping
console.log(neptune.wake()); // I am awake
