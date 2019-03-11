const Calculator = require('./Calculator');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Calculator', function () {
    let calc;
    beforeEach(function () {
        calc = new Calculator;
    })
    //CONSTRUCTOR
    describe("Constructor", function () {
        it("should contains a property expenses that is initialized to an empty array", function () {
            assert.deepEqual(calc.expenses, []);
        });
    })
    describe("Constructor", function () {
        it("should throw type error if set argument to calc", function () {
            expect(() => calc(5)).to.throw(TypeError)
        });
    })
    //ADD
    describe("add", function () {
        it("should adds two passed item (of any type) to the expenses", function () {
            calc.add("str")
            calc.add(1);
            assert.deepEqual(calc.expenses, ["str", 1]);
        });
        it("should adds three passed item (of same type) to the expenses", function () {
            calc.add(20)
            calc.add(1);
            calc.add(3);
            assert.deepEqual(calc.expenses, [20, 1, 3]);
        });
        it("should adds five passed item (of any type) to the expenses", function () {
            calc.add(20.23)
            calc.add(-1);
            calc.add({ d: 2 });
            calc.add([2, 3]);
            assert.deepEqual(calc.expenses, [20.23, -1, { "d": 2 }, [2, 3]]);
        });
    })
    //DIVIDENUMS
    describe("divideNums", function () {
        it("divides one number from the expenses and returns the result", function () {
            calc.add("str")
            calc.add(1);
            //console.log(calc.divideNums())
            assert.equal(calc.divideNums(), 1);
        });
        it("divides two numbers from the expenses and returns the result", function () {
            calc.add(20)
            calc.add(2);
            calc.add(3);
            //console.log(calc.divideNums())
            assert.closeTo(calc.divideNums(), 3.33, 0.01);
        });
        it("divides numbers from the expenses by zero should returns message", function () {
            calc.add("str")
            calc.add(1);
            calc.add(20)
            calc.add(2);
            calc.add(0);
            //console.log(calc.divideNums())
            assert.equal(calc.divideNums(), "Cannot divide by zero");
        });
        it("divides three numbers from the expenses and returns the result", function () {
            calc.add(20.23)
            calc.add(-1);
            calc.add({ d: 2 });
            calc.add([2, 3]);
            //console.log(calc.divideNums())
            calc.divideNums()
            assert.deepEqual(calc.expenses, [-20.23]);
        });
        it("if there are no numbers in the array, should throws error", function () {
            calc.add({ d: 2 });
            expect(() => calc.divideNums()).to.throw(Error, "There are no numbers in the array!")
        });
    })
    //TOSTRING
    describe("toString", function () {
        it("returns a string, containing a list of str and num from the expenses, joined with an arrow", function () {
            calc.add("str")
            calc.add(1);
            let expected = "str -> 1";
            assert.deepEqual(calc.toString(), expected);
        });
        it("returns a string, containing a list of all items from the expenses, joined with an arrow", function () {
            calc.add(20.23)
            calc.add(-1);
            calc.add({ d: 2 });
            calc.add([2, 3]);
            let expected = "20.23 -> -1 -> [object Object] -> 2,3";
            assert.deepEqual(calc.toString(), expected);
        });
        it("it should return the string, if there are no items stored", function () {
            let expected = "empty array";
            assert.equal(calc.toString(), expected);
        });
    })
    //ORDERBY
    describe("orderBy", function () {
        it("returns a string joined with comma which is the sorted expenses, sorting by numbers", function () {
            calc.add("str")
            calc.add(1);
            calc.add(20.23)
            calc.add(-1);
            calc.add({ d: 2 });
            calc.add([50, 5, 4]);
            //console.log(calc.orderBy())
            let expected = "-1, 1, 20.23, 50,5,4, [object Object], str";
            assert.equal(calc.orderBy(), expected);
        });
    })
}) 