const assert = require('chai').assert;
const expect = require('chai').expect;
const createCalculator = require('./7. Add Subtract');

describe("Create Calculator", function () {
    let calculator;
    beforeEach(function () {
        calculator = createCalculator();
    })
    it('with calc function should return object', function(){
        assert.isObject(calculator);
    })
    it('with add integer number should return correct result', function () {
        let arg = 1;
        calculator.add(arg);
        assert.equal(calculator.get(), 1)
    })
    it('with subtract integer number should return correct result', function () {
        let arg = 1;
        calculator.subtract(arg);
        assert.equal(calculator.get(), -1)
    })
    it('with add negative integer number should return correct result', function () {
        let arg = -1;
        calculator.add(arg);
        assert.equal(calculator.get(), -1)
    })
    it('with subtract negative integer number should return correct result', function () {
        let arg = -1;
        calculator.subtract(arg);
        assert.equal(calculator.get(), 1)
    })
    it('with add string number should return correct result', function () {
        let arg = "6";
        calculator.add(arg);
        assert.equal(calculator.get(), 6)
    })
    it('with subtract string number should return correct result', function () {
        let arg = "5";
        calculator.subtract(arg);
        assert.equal(calculator.get(), -5)
    })
     it('with add string floating point should return correct result', function () {
        let arg = "-6.5";
        calculator.add(arg);
        assert.equal(calculator.get(), -6.5)
    })
    it('with add floating point number should return correct result', function () {
        let arg = 3.5;
        calculator.add(arg);
        assert.equal(calculator.get(), 3.5)
    })
    it('with subtract floating point number should return correct result', function () {
        let arg = 0.5;
        calculator.subtract(arg);
        assert.equal(calculator.get(), -0.5)
    })
    it('with add and subtract floating point number should return correct result', function () {
        let argF = 0.5;
        let argS = 2.5;
        calculator.add(argF);
        calculator.subtract(argS);
        assert.equal(calculator.get(), argF - argS)
    })
    it('with add object should return NaN', function () {
        let obj = { name: "pesho" };
        calculator.add(obj);
        assert.isNaN(calculator.get())
    })
    it('with subtract object number should return NaN', function () {
        let obj = { name: "pesho" };
        calculator.subtract(obj);
        assert.isNaN(calculator.get())
    })
     it('with add string should return NaN', function () {
        let str = "pesho" ;
        calculator.add(str);
        assert.isNaN(calculator.get())
    })
    it('with subtract string should return NaN', function () {
        let str = "pesho" ;
        calculator.subtract(str);
        assert.isNaN(calculator.get())
    })
    it('with add true should return 1', function () {
        let num = true;
        calculator.add(num);
        assert.equal(calculator.get(), 1)
    })
    it('with subtract false number should return 0', function () {
        let num = false;
        calculator.subtract(num);
        assert.equal(calculator.get(), 0)
    })
    it('with add str 1 Arr number should return number', function () {
        let obj = ['1'];
        calculator.add(obj);
        assert.equal(calculator.get(), 1)
    })
    it('with subtract str 1 Arr number should return number', function () {
        let obj = ['1'];
        calculator.subtract(obj);
        assert.equal(calculator.get(), -1)
    })
    it('with add 1 Arr fl point should return number', function () {
        let obj = [2.1];
        calculator.add(obj);
        assert.equal(calculator.get(), 2.1)
    })
    it('with subtract 1 Arr fl point  should return number', function () {
        let obj = [3.1];
        calculator.subtract(obj);
        assert.equal(calculator.get(), -3.1)
    })
    it('with add 1 Arr integer should return number', function () {
        let obj = [1];
        calculator.add(obj);
        assert.equal(calculator.get(), 1)
    })
    it('with subtract 1 Arr integer should return number', function () {
        let obj = [567];
        calculator.subtract(obj);
        assert.equal(calculator.get(), -567)
    })
})