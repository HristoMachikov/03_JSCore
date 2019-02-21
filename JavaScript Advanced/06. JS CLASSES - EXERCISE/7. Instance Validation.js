class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId
        this.email = email
        this.firstName = firstName
        this.lastName = lastNamed
    }
    get clientId() {
        return this._clientId;
    }

    set clientId(clientId) {
        if (!Number.isInteger(+clientId) || clientId.length !== 6) {
            throw new TypeError("Client ID must be a 6-digit number")
        }
        this._clientId = clientId;
    }
    get email() {
        return this._email
    }
    set email(value) {
        let pattern = /([\w]+@[a-zA-Z\.]+)/gm
        if (!pattern.test(value)) {
            throw new TypeError("Invalid e-mail");
        }
        this._email = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value.length >= 3 && value.length <= 20) {
            let pattern = /^([a-zA-Z]+)$/gm;
            if (!pattern.test(value)) {
                throw new Error("First name must contain only Latin characters");
            }
            this._firstName = value;
        } else {
            throw new Error("First name must be between 3 and 20 characters long")
        }
    }
}