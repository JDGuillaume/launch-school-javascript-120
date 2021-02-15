function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read: read,

    getDescription() {
      return `${this.title} was written by ${this.author}. I ${
        this.read ? 'have' : `haven't`
      } read it.`;
    },

    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
console.log(book1.getDescription());

let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
console.log(book2.getDescription());

let book3 = createBook(`Aunts aren't Gentlemen`, 'PG Wodehouse', true);
console.log(book3.getDescription());
