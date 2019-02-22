class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString
        this.innerLength = innerLength
    }

    increase(length) {
        return this.innerLength += length;
    }

    decrease(length) {

        if (this.innerLength - length > 0) {
            return this.innerLength -= length;
        } else {
            return this.innerLength = 0;
        }
    }

    toString() {
        let result = this.innerString;
        if (this.innerString.length > this.innerLength) {
            result = this.innerString.substr(0, this.innerLength);
            result += "...";
        } else if (this.innerLength === 0) {
            result = "...";
        }
        return `${result}`;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); 
test.decrease(3);
console.log(test.toString()); 
test.decrease(5);
console.log(test.toString()); 
test.increase(4);
console.log(test.toString()); 

