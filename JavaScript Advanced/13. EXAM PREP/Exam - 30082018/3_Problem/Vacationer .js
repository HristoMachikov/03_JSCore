class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName, // Object
            this.idNumber = this.generateIDNumber(), // String
            this.creditCard = creditCard, // Object
            this.wishList = [] // Array
    }

    get fullName() {
        return this._fullname;
    }

    set fullName(value) {
        if (Array.isArray(value) && value.length >= 3) {
            value.forEach(name => {
                if (!/^[A-Z][a-z]+$/g.test(name)) {
                    throw "Invalid full name";
                }
            });
            return this._fullname = { firstName: value[0], middleName: value[1], lastName: value[2] };
        } else {
            throw "Name must include first name, middle name and last name";
        }
    }

    get idNumber() {
        return this._idNumber;
    }

    set idNumber(value) {
        return this._idNumber = value;
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(value) {
        if (value) {
            if (typeof value[0] !== "number" || typeof value[2] !== "number") {
                throw "Invalid credit card details";
            }
            return this._creditCard = { cardNumber: value[0], expirationDate: value[1], securityNumber: value[2] };
        } else {
            value = [1111, "", 111];
            return this._creditCard = { cardNumber: value[0], expirationDate: value[1], securityNumber: value[2] };
        }
    }

    get wishList() {
        return this._wishList;
    }

    set wishList(value) {
        return this._wishList = value;
    }

    generateIDNumber() {
        let number = 231 * +this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length;
        let checkArr = ['a', 'e', 'o', 'i', 'u'];
        let lastName = this.fullName.lastName
        let lastNameEndChar = lastName[lastName.length - 1];
        return number + (checkArr.includes(lastNameEndChar) ? 8 : 7).toString();
    }

    addCreditCardInfo(input) {
        if (Array.isArray(input) && input.length >= 3) {
            if (typeof input[0] !== "number" || typeof input[2] !== "number") {
                throw "Invalid credit card details";
            }
            return this._creditCard = { cardNumber: input[0], expirationDate: input[1], securityNumber: input[2] };
        } else {
            throw "Missing credit card information";
        }
        return this._creditCard = { cardNumber: input[0], expirationDate: input[1], securityNumber: input[2] };
    }

    addDestinationToWishList(destination) {
        if (!this.wishList.includes(destination)) {
            //if (/^[A-Za-z]+$/g.test(destination)) {
                this.wishList.push(destination);
                this.wishList.sort((a, b) => a.length - b.length);
            //}
        } else {
            throw "Destination already exists in wishlist";
        }
        return this;
    }

    getVacationerInfo() {
        let output = `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n`;
        output += `ID Number: ${this.idNumber}\n`;
        output += `Wishlist:\n`;
        output += `${this.wishList.length ? this.wishList.join(', ') : "empty"}\n`;
        output += "Credit Card:\n";
        output += `Card Number: ${this.creditCard.cardNumber}\n`;
        output += `Expiration Date: ${this.creditCard.expirationDate}\n`;
        output += `Security Number: ${this.creditCard.securityNumber}`;
        return output;
    }
}

let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777]); 3

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());


let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
