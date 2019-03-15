const PaymentPackage = require('./PaymentPackage');
const assert = require('Chai').assert;
const expect = require('Chai').expect;

describe("PaymentPackage", function () {
    let pp;
    this.beforeEach(function () {
        pp = new PaymentPackage('Consultation', 800);
    })
    describe('Constructor', function () {
        it("if class is instantiated with two parameters – a string name and number value, should pass correct", function () {
            expect(pp.name).to.be.equal("Consultation", "Name have to be string!")
            expect(pp.value).to.be.equal(800, "Value have to be number!")
        });
        it("if VAT is non-negative number and active is boolean, should pass correct", function () {
            expect(pp.VAT).to.be.equal(20, "VAT default value is 20!")
            expect(pp.active).to.be.equal(true, "Active default value is true!")
        });
        it("if class is instantiated with two parameters – a string name and Zero value, should pass correct", function () {
            let ppp = new PaymentPackage(' ', 0);
            expect(ppp.name).to.be.equal(" ", "Name have to be string!")
            expect(ppp.value).to.be.equal(0, "Value have to be number!")
        });
        it("if change VAT with non-negative number and active with boolean, should pass correct", function () {
            pp.VAT = 30;
            pp.VAT = 0;
            pp.active = false;
            pp.active = true;
            pp.active = false;
            expect(pp.VAT).to.be.equal(0, "VAT must be a non-negative number!")
            expect(pp.active).to.be.equal(false, "Active status must be a boolean!")
        });
        it("if class is instantiated with two parameters wrong than a string name and number value, should throw error", function () {
            // let wrongNameParam = [""];
            let wrongValueParam = [-32, "", " ", "Gosho", { "Pesho": 7 }, false]
            //for (const param of wrongNameParam) {

            expect(() => new PaymentPackage("", 800)).to.throw(Error, "Name must be a non-empty string");
            //}
            for (const param of wrongValueParam) {
                expect(() => new PaymentPackage('Consultation', `${param}`)).to.throw(Error, "Value must be a non-negative number");
            }
        });
        it("if VAT is negative number, should throw error", function () {
            let wrongVATParam = [-32, "", " ", { "Pesho": 7 }, false]
            for (const param of wrongVATParam) {
                expect(() => pp.VAT = param).to.throw(Error, "VAT must be a non-negative number");
            }
        });
        it("if active is not boolean, should throw error", function () {
            let wrongActiveParam = [-32, 2, "", "Gosho", { "Pesho": 7 },]
            for (const param of wrongActiveParam) {
                expect(() => pp.active = param).to.throw(Error, "Active status must be a boolean");
            }
        });
    })
    describe('toString', function () {
        it("should return a string, containing an overview of the instance", function () {
            let output = 'Package: Consultation\n';
            output += "- Value (excl. VAT): 800\n";
            output += "- Value (VAT 20%): 960";
            assert.equal(pp.toString(), output)
        });
        it("should return a string, containing an overview of the instance", function () {
            pp.active = false;
            let output = 'Package: Consultation (inactive)\n';
            output += "- Value (excl. VAT): 800\n";
            output += "- Value (VAT 20%): 960";
            assert.equal(pp.toString(), output)
        });
    })
})


const packages = [
    new PaymentPackage('HR Services', 1500),
    new PaymentPackage('Consultation', 800),
    new PaymentPackage('Partnership Fee', 7000),
];
console.log(packages.join('\n'));
const wrongPack = new PaymentPackage('Transfer Fee', 100);
// Should throw an error
try {
    wrongPack.active = null;
} catch(err) {
    console.log('Error: ' + err.message);
}
try {
    const hrPack = new PaymentPackage('HR Services');
} catch(err) {
    console.log('Error: ' + err.message);
}
