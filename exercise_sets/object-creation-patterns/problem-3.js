class CircularQueue {
  static EMPTY_QUEUE = 'empty';

  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.queue = new Array(bufferSize).fill(CircularQueue.EMPTY_QUEUE);
    this.writeLocation = 0;
    this.deleteLocation = 0;
  }

  getNextIndex(index) {
    if (index === this.bufferSize - 1) {
      index = 0;
    } else {
      index += 1;
    }

    return index;
  }

  enqueue(value) {
    if (this.queue[this.writeLocation] !== 'empty') {
      this.deleteLocation = this.getNextIndex(this.writeLocation);
    }

    this.queue[this.writeLocation] = value;
    this.writeLocation = this.getNextIndex(this.writeLocation);
  }

  dequeue() {
    if (this.queue.every(position => position === CircularQueue.EMPTY_QUEUE)) {
      return null;
    } else {
      let returnValue = this.queue[this.deleteLocation];

      this.queue[this.deleteLocation] = 'empty';

      this.deleteLocation = this.getNextIndex(this.deleteLocation);

      return returnValue;
    }
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
