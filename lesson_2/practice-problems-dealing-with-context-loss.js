// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return (
//       this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.'
//     );
//   },
// };

// let getTurkDescription = turk.getDescription.bind(turk);

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(getTurkDescription);

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(title => console.log(this.seriesTitle + ': ' + title));
//   },
// };

// TESgames.listGames();

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  },
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);
