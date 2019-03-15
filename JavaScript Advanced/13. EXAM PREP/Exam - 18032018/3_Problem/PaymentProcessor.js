class PaymentProcessor {
    constructor(options) {
        this.options = options, // Object
            this.collection = []
    }

    get options() {
        return this._options;
    }

    set options(value) {
        let currObj = {
            types: ["service", "product", "other"],
            precision: 2
        }
        if (value) {
            if (value.hasOwnProperty("types")) {
                currObj.types = value.types;
            }
            if (value.hasOwnProperty("precision")) {
                currObj.precision = value.precision;
            }
        }
        return this._options = currObj;
    }

    get collection() {
        return this._collection;
    }

    set collection(value) {
        return this._collection = value;
    }

    registerPayment(id, name, type, value) {

        if (id !== "" && name !== ""
            && typeof value === "number"
            && this.options.types.includes(type)) {
            if (this.collection.length > 0) {
                let isIdExist = this.collection.filter(x => x.id === id);
                if (isIdExist.length !== 0) {
                    //console.log(isIdExist)
                    throw "Id exist!";
                }
            }
            let currPayment = { id, name, type, value };
            currPayment.value = Number(currPayment.value).toFixed(this.options.precision);
            this.collection.push(currPayment);

        } else {
            throw "Error!";
        }

    }

    deletePayment(id) {
        if (this.collection.length > 0) {
            let isIdDele = this.collection.filter(x => x.id !== id);
            if (isIdDele.length !== this.collection.length) {
                this.collection = isIdDele
                return this;
            } else {
                throw "ID not found!"
            }
        } else {
            throw "Collection is empty!"
        }

    }

    get(id) {
        let result = "";
        let isIdExist = this.collection.filter(x => x.id === id);
        if (isIdExist.length > 0) {
            result += `Details about payment ID: ${id}\n`
            result += `- Name: ${isIdExist[0].name}\n`;
            result += `- Type: ${isIdExist[0].type}\n`
            result += `- Value: ${isIdExist[0].value}\n`;

        } else {
            throw "ID not found";
        }
        return result.trim();
    }

    setOptions(options) {
        let currObj = {
            types: this.options.types,
            precision: this.options.precision
        }
        if (options) {
            if (options.hasOwnProperty("types")) {
                currObj.types = options.types;
            }
            if (options.hasOwnProperty("precision")) {
                currObj.precision = options.precision;
            }
        }
        return this._options = currObj;
    }

    toString() {
        let output = "";
        if (this.collection.length > 0) {
            let sum = 0
            this.collection.forEach(obj => {
                sum += +obj.value;
            });
            output += "Summary:\n"
            output += `- Payments: ${this.collection.length}\n`;
            output += `- Balance: ${sum.toFixed(this.options.precision)}\n`;
        } else {
            output += "Summary:\n"
            output += "- Payments: 0\n";
            output += `- Balance: ${Number(0).toFixed(this.options.precision)}\n`;
        }
        return output.trim();
    }

}
// const servicePyaments = new PaymentProcessor({ types: ['service'] });
// const transactionLog = new PaymentProcessor({ precision: 5 });
// const generalPayments = new PaymentProcessor();

// console.log(servicePyaments)
// console.log(transactionLog)
// console.log(generalPayments)
// let obj = { types: ['service', "product"], precision: 3 }
// generalPayments.setOptions(obj)
// console.log(generalPayments)
// generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
// console.log(generalPayments)
// generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000.3336);
// console.log(generalPayments.get('01A3'));




// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

//// Should throw an error (invalid type)
//generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({ types: ['product', 'material'] });
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

//// Should throw an error (ID not found)
//generalPayments.deletePayment('E027');
//// Should throw an error (ID not found)
//generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({ types: ['service'] });
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({ precision: 5 });
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
