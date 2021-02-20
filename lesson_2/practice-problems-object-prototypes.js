function assignProperty(object, property, value) {
  if (property in object && object.hasOwnProperty(property)) {
    object[property] = value;
  } else if (property in object && !object.hasOwnProperty(property)) {
    object = Object.getPrototypeOf(object);
    assignProperty(object, property, value);
  }
}

let fooA = {bar: 1};
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, 'bar', 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, 'qux', 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty('qux')); // false
console.log(fooC.hasOwnProperty('qux')); // false
