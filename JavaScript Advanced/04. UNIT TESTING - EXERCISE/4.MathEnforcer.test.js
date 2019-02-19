const expect = require('chai').expect;
const mathEnforcer = require('./4.MathEnforcer');
const assert = require('chai').assert;

describe("Math Enforcer", function () {
    describe('addFive Key', function () {
        it("with number param, should return correct result", function () {
            expect(mathEnforcer.addFive(8)).to.be.equal(13);
        });
        it("with floating point number param, should return correct result", function () {
            expect(mathEnforcer.addFive(8.75)).to.be.equal(13.75);
        });
        it("with negative number param, should return correct result", function () {
            expect(mathEnforcer.addFive(-8)).to.be.equal(-3);
        });
        it("with negative floating point number param, should return correct result", function () {
            expect(mathEnforcer.addFive(-18.75)).to.be.equal(-13.75);
        });
        it("with Not a number param, should return undefined", function () {
            let notNumb = "hi";
            expect(mathEnforcer.addFive(notNumb)).to.be.equal(undefined);
        });
        it("with an object param, should return undefined", function () {
            let object = { name: "Pesho" };
            let expected = mathEnforcer.addFive(object);
            expect(expected).to.be.equal(undefined);
        });
    });
    describe('subtractTen Key', function () {
        it("with number param, should return correct result", function () {
            expect(mathEnforcer.subtractTen(20)).to.be.equal(10);
        });
        it("with floating point number param, should return correct result", function () {
            expect(mathEnforcer.subtractTen(18.75)).to.be.equal(8.75);
        });
        it("with negative number param, should return correct result", function () {
            expect(mathEnforcer.subtractTen(-20)).to.be.equal(-30);
        });
        it("with negative floating point number param, should return correct result", function () {
            expect(mathEnforcer.subtractTen(-18.75)).to.be.equal(-28.75);
        });
        it("with Not a number param, should return undefined", function () {
            let notNumb = "hi";
            expect(mathEnforcer.subtractTen(notNumb)).to.be.equal(undefined);
        });
        it("with an object param, should return undefined", function () {
            let object = { name: "Pesho" };
            let expected = mathEnforcer.subtractTen(object);
            expect(expected).to.be.equal(undefined);
        });
    });
    describe('sum Key', function () {
        it("with two number params, should return correct result", function () {
            expect(mathEnforcer.sum(20, 12)).to.be.equal(32);
        });
        it("with two floating point params, should return correct result", function () {
            expect(mathEnforcer.sum(20.2, 12.2)).to.be.equal(32.4);
        });
        it("with first floating point param, should return correct result", function () {
            expect(mathEnforcer.sum(20.2, 12)).to.be.equal(32.2);
        });
        it("with second floating point param, should return correct result", function () {
            expect(mathEnforcer.sum(20, 12.2)).to.be.equal(32.2);
        });

        it("with first Not a number param, should return undefined", function () {
            let notNumb1 = "hi1";
            let notNumb2 = 3;
            expect(mathEnforcer.sum(notNumb1, notNumb2)).to.be.equal(undefined);
        });

        it("with second Not a number param, should return undefined", function () {
            let notNumb1 = 3;
            let notNumb2 = "hi2";
            let expecterd = mathEnforcer.sum(notNumb1, notNumb2);
            expect(expecterd).to.be.equal(undefined);
        });
        it("with first object param, should return undefined", function () {
            let notNumb1 = { name: "Pesho" };
            let notNumb2 = 3;
            let expecterd = mathEnforcer.sum(notNumb1, notNumb2);
            expect(expecterd).to.be.equal(undefined);
        });
        it("with second object param, should return undefined", function () {
            let notNumb1 = 3;
            let notNumb2 = { name: "Pesho" };
            let expecterd = mathEnforcer.sum(notNumb1, notNumb2);
            expect(expecterd).to.be.equal(undefined);
        });
    });
})