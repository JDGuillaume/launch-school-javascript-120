// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

foo.ancestors = function() {
  const ancestorChain = [];

  let target = this;

  while (Object.getPrototypeOf(target) !== null) {
    ancestorChain.push(
      Object.getPrototypeOf(target).name || 'Object.prototype'
    );
    target = Object.getPrototypeOf(target);
  }

  return ancestorChain;
};

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
console.log(foo.ancestors()); // returns ['Object.prototype']
