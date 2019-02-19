let lookupChar = require('./3.CharLookup');
let expect = require('chai').expect;

describe("Lookup Char", function () {
    it('should return undefined if we pass two param with type string', function () {
        let str1 = "First string";
        let str2 = "Second string";

        let expected = lookupChar(str1, str2);

        expect(expected).to.be.equal(undefined)
    });
    it('should return undefined if we pass two param with type number', function () {
        let num1 = 123;
        let num2 = 2;

        let expected = lookupChar(num1, num2);

        expect(expected).to.be.equal(undefined)
    });
    it('should return "Incorrect index" if we pass index biger than string length', function () {
        let str = "Some string";
        let num = 23;

        let expected = lookupChar(str, num);

        expect(expected).to.be.equal("Incorrect index")
    });
    it('should return undefined if we pass floating point number', function () {
        let str = "Some string";
        let num = 23.32;

        let expected = lookupChar(str, num);

        expect(expected).to.be.equal(undefined)
    });
    it('should return "Incorrect index" if we pass negative index number', function () {
        let str = "Some string";
        let num = -7;

        let expected = lookupChar(str, num);

        expect(expected).to.be.equal("Incorrect index")
    });
    it('should return undefined if we pass empty string', function () {
        let str = "Some string";
        let num = 7;

        let expected = lookupChar(str, num);

        expect(expected).to.be.equal("r")
    });
});