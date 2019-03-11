class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.shelfGenre = shelfGenre,
            this.room = room,
            this.shelfCapacity = shelfCapacity,
            this.shelf = []
    }
    get shelf() {
        return this._shelf;
    }
    set shelf(value) {
        return this._shelf = value;
    }

    get shelfGenre() {
        return this._shelfGenre;
    }
    set shelfGenre(value) {
        return this._shelfGenre = value;
    }
    get room() {
        return this._room;
    }
    set room(value) {
        switch (value) {
            case "livingRoom":
            case "bedRoom":
            case "closet":
                return this._room = value;
            default:
                throw `Cannot have book shelf in ${value}`;
        }
    }
    get shelfCapacity() {
        return this._shelfCapacity;
    }
    set shelfCapacity(value) {
        return this._shelfCapacity = value;
    }

    addBook(bookName, bookAuthor, genre) {
        let currBook = { bookName, bookAuthor };
        this.shelf.push(currBook);
        if (this.shelf.length > +this.shelfCapacity) {
            this.shelf.shift();
        }
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        console.log(this.shelf)
        return this;
    }

    throwAwayBook(bookName) {

    }

    showBooks(genre) {

    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
livingRoom.addBook("Introduction to Programming with C#", "Svetlin Nakov")
livingRoom.addBook("Introduction to Programming with Java", "Nvetlin Nakov")
livingRoom.addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.shelf[0])
console.log(livingRoom.shelf[1])
console.log(livingRoom.shelf[2])