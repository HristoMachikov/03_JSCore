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
        let currBook = { bookName, bookAuthor, genre };
        this.shelf.push(currBook);
        if (this.shelf.length > +this.shelfCapacity) {
            this.shelf.shift();
        }
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter(x => x.bookName !== bookName)
        return this;
    }

    showBooks(genre) {
        let output = `Results for search "${genre}":\n`;
        this.shelf.forEach(function (book) {
            if (book.genre === genre) {
                output += `\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"\n`;
            }
        });
        return output.trim();
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;;
    }
    toString() {
        if (this.shelf.length <= 0) {
            return "It's an empty shelf";
        } else {
            let output = `"${this.shelfGenre}" shelf in ${this.room} contains:\n`;
            this.shelf.forEach(function (book) {
                output += `\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}\n`;
            });
            return output.trim();
        }
    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
    .addBook("Introduction to Programming with C#", "Svetlin Nakov")
    .addBook("Introduction to Programming with Java", "Svetlin Nakov")
    .addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.toString());

let garden = new BookCollection("Programming", "garden");
