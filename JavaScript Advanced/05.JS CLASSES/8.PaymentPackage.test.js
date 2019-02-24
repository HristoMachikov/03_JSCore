const PaymentPackage = require('./8.PaymentPackage.js');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("Payment Package", function () {
    let pp;
    beforeEach(function () {
        pp = new PaymentPackage("Pesho", 20);
    });
    it('will check defaut value of "VAT"', function () {
        pp = new PaymentPackage("Pesho", 20);
        expect(pp.VAT).to.be.equal(20, "The defaut VAT is wrong!")
    })
    it('will check defaut value of "active"', function () {
        pp = new PaymentPackage("Pesho", 20);
        expect(pp.active).to.be.equal(true, "The defaut VAT is wrong!")
    })
    //NAME
    describe('name tests', function () {
        it('whit string param should pass correct', function () {
            pp = new PaymentPackage("Pesho", 30);
            pp.name = "Gosho";
            expect(pp.name).to.be.equal("Gosho", "Name should be string longer than 0");
        })
        it('whit Not string param should throw error', function () {
            pp = new PaymentPackage("Pesho", 30);
            expect(() => pp.name = 2).to.throw(Error, 'Name must be a non-empty string');
        })
        it('whit empty string param should throw error', function () {
            expect(() => new PaymentPackage("", 30)).to.throw(Error, 'Name must be a non-empty string');
        })
    })

    //VALUE
    describe('value tests', function () {
        it('whit intiger param should pass correct', function () {
            pp = new PaymentPackage("Pesho", 30);
            pp.value = 0;
            expect(pp.value).to.be.equal(0, "Value should be a number biger than 0");
        })
        it('whit floting point param should pass correct', function () {
            pp = new PaymentPackage("Pesho", 1.25);
            pp.value += 1.30;
            expect(pp.value).to.be.equal(2.55, "Value should be a number biger than 0");
        })
        it('whit negative number param should throw error', function () {
            pp = new PaymentPackage("Pesho", 30);
            expect(() => pp.value = -2).to.throw(Error, 'Value must be a non-negative number');
        })
        it('whit not a number param should throw error', function () {
            expect(() => new PaymentPackage("Pesho", "")).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", [1, 2, 3])).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", () => { 1 })).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", { a: 1, b: 2, c: 2 })).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", undefined)).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", null)).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", -1.23)).to.throw(Error, 'Value must be a non-negative number');
            expect(() => new PaymentPackage("Pesho", false)).to.throw(Error, 'Value must be a non-negative number');
        })
    })

    //VAT
    describe('VAT tests', function () {
        it('whit adding a floting point number should pass correct', function () {
            pp = new PaymentPackage("Pesho", 30);
            pp.VAT += 1.2;
            expect(pp.VAT).to.be.equal(21.2, "VAT should be a number biger than 0");
        })
        it('whit not a number VAT should throw error', function () {
            pp = new PaymentPackage("Pesho", 30);
            expect(() => pp.VAT = "").to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = [1, 2, 3]).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = () => { 1 }).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = { a: 1, b: 2, c: 2 }).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = undefined).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = null).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = false).to.throw(Error, 'VAT must be a non-negative number');
            expect(() => pp.VAT = -1.23).to.throw(Error, 'VAT must be a non-negative number');
        })
        it('whit negative number VAT should throw error', function () {
            pp = new PaymentPackage("Pesho", 30);
            expect(() => pp.VAT = -2).to.throw(Error, 'VAT must be a non-negative number');
        })
    })

    //active
    describe('active tests', function () {
        it('whit changing a boolean active should pass correct', function () {
            pp = new PaymentPackage("Pesho", 30);
            pp.active = false;
            expect(pp.active).to.be.equal(false, "VAT should be a number biger than 0");
        })
        it('whit changing a not boolean active should throw error', function () {
            pp = new PaymentPackage("Pesho", 30);
            expect(() => pp.active = -2).to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = 2).to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = "").to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = "Pesho").to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = { a: 1, b: 2, c: 2 }).to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = undefined).to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = () => { 1 }).to.throw(Error, 'Active status must be a boolean');
            expect(() => pp.active = [1, 2, 3]).to.throw(Error, 'Active status must be a boolean');
        })
    })

    //TO STRING
    describe('toString tests', function () {
        it('whit correct params should return string', function () {
            pp = new PaymentPackage("Pesho", 30);
            let result = resultStr("Pesho", 30, 20, true);
            expect(pp.toString()).to.be.equal(result);
        })
        it('whit set new correct params should return string', function () {
            pp = new PaymentPackage("Pesho", 30);
            pp.active = false;
            pp.name = "Kiro";
            let result = resultStr("Kiro", 30, 20, false);
            expect(pp.toString()).to.be.equal(result);
        })
    })

    function resultStr(name, value, VAT, active) {
        let output = "";
        output += `Package: ${name}` + (active === false ? ' (inactive)' : '') + '\n';
        output += `- Value (excl. VAT): ${value}\n`;
        output += `- Value (VAT ${VAT}%): ${value * (1 + VAT / 100)}`
        return output;
    }
})