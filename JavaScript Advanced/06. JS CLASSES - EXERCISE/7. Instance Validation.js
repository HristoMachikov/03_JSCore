class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
    }

    // get clientId() {
    //     return this._clientId;
    // }
    set clientId(clientId) {
        if (Number.isInteger(+clientId) && clientId.length === 6) {
            this._clientId = clientId;
        } else {
            throw new TypeError("Client ID must be a 6-digit number");
        }

    }

    // get email() {
    //     return this._email;
    // }
    set email(value) {
        let pattern = /([\w]+@[a-zA-Z\.]+)/gm;
        if (!pattern.test(value)) {
            throw new TypeError("Invalid e-mail");
        }
        this._email = value;
    }

    // get firstName() {
    //     return this._firstName;
    // }
    set firstName(value) {
        if (value.length >= 3 && value.length <= 20) {
            let pattern = /^([a-zA-Z]+)$/gm;
            if (!pattern.test(value)) {
                throw new TypeError("First name must contain only Latin characters");
            }
            this._firstName = value;
        } else {
            throw new TypeError("First name must be between 3 and 20 characters long");
        }
    }

    // get lastName() {
    //     return this._lastName;
    // }
    set lastName(value) {
        if (value.length >= 3 && value.length <= 20) {
            let pattern = /^([a-zA-Z]+)$/gm;
            if (!pattern.test(value)) {
                throw new TypeError("Last name must contain only Latin characters");
            }
            this._lastName = value;
        } else {
            throw new TypeError("Last name must be between 3 and 20 characters long");
        }
    }
}

let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov')
console.log(acc)