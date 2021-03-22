const bob = {
  name: 'bob',
  sayName() {
    console.log(`${this.name}`);
  },
};

const roger = {
  name: 'roger',
};

bob.sayName.call(roger);
const sayRoger = bob.sayName.bind(roger);
sayRoger();
