const assert = require('chai').assert;
const expect = require('chai').expect;
const rgbToHexColor = require('./6. RGB to Hex.js');

describe("RBG TO HEX", function () {
    it("with 3 integer arguments should return corecct result", function () {
        let arg = 10;
        let expected = rgbToHexColor(arg, arg, arg);
        expect(expected).to.be.equal("#0A0A0A");
    })
    it("with 3 integer arguments should return corecct result", function () {
        expect(rgbToHexColor(10, 100, 55)).to.be.equal("#0A6437");
    })
    it("with 3 integer arguments = 255 should return corecct result", function () {
        let arg = 255;
        let expected = rgbToHexColor(arg, arg, arg);
        expect(expected).to.be.equal("#FFFFFF");
        
    })
    it("with 3 integer arguments = 0 should return corecct result", function () {
        let arg = 0;
        let expected = rgbToHexColor(arg, arg, arg);
        expect(expected).to.be.equal("#000000");
    })
    it("with 3 bigger than 255 arguments should return undefined", function () {
        let arg = 256;
        let expected = rgbToHexColor(arg, arg, arg);
        expect(expected).to.be.equal(undefined, "some args is bigger than 255");
    })
    it("with 3 smaller than 0 arguments should return undefined", function () {
        let arg = -11;
        let expected = rgbToHexColor(arg, arg, arg);
        expect(expected).to.be.equal(undefined, "some args is smaller than 0");
    })
    it("with Not scolpe integer arguments should return undefined", function () {
        expect(rgbToHexColor(-10, 10, 10)).to.be.equal(undefined, "some args is out of scope");
        expect(rgbToHexColor(50, 10, 257)).to.be.equal(undefined, "some args is out of scope");
        expect(rgbToHexColor(300, 1150, 257)).to.be.equal(undefined, "some args is out of scope");
        expect(rgbToHexColor(-300, -50, -57)).to.be.equal(undefined, "some args is out of scope");
    })
    it("with Not Integer arguments should return undefined", function () {
        expect(rgbToHexColor({}, 10, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(NaN, 10, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(null, 10, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor([], 10, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(10, 3.15, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(2.15, 3.15, 6.15)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor({1:2}, {1:2}, {1:2})).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor("hi", true, 1)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(true, true, true)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor("hi", "true", "1")).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(null, false, NaN)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor([1], [2], [3])).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(function(){return 1}, function(){return 1}, function(){return 1})).to.be.equal(undefined, "some args is not Integer");
    })
    it("with some missing arguments should return undefined", function () {
        expect(rgbToHexColor(10, 10)).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor()).to.be.equal(undefined, "some args is not Integer");
        expect(rgbToHexColor(10)).to.be.equal(undefined, "some args is not Integer");
    })
})