function objectsEqual(object1, object2) {
  let equalStatus = true;

  const object1Pairs = Object.entries(object1);
  const object2Pairs = Object.entries(object2);

  if (object1Pairs.length !== object2Pairs.length) {
    return false;
  }

  if (object1Pairs.length === object2Pairs.length) {
    object1Pairs.forEach((array, arrayIndex) =>
      array.forEach((element, elementIndex) => {
        if (element !== object2Pairs[arrayIndex][elementIndex]) {
          equalStatus = false;
        }
      })
    );
  }
  return equalStatus;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'})); // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'})); // false
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1})); // false
