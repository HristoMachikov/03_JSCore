const assert = require('chai').assert;
const expect = require('chai').expect;
const sum = require('./4. Sum of Numbers');

describe('sum', function () {
    it('shiuld sum the nummbers of input array', function () {
        let arr = [1, 2, 3, 4, 5, 6];
        let result = sum(arr);
        assert.equal(result, 21);
    });
    it.skip('shiuld check if argument is array', function () {
        // let arr = [null];
        let result = sum({});
        let err = function () {
            throw new TypeError("arr is not iterable");
        }
        assert.equal(result, err());
        //expect(result).to.be.equal(err())//)'The argument is Not an Arrray!');
    });
    it('shiuld check if array is empty', function () {
        let arr = [];
        let result = sum(arr);
        assert.equal(result, 0);
        // assert.isNotArray(arr, "The array is empty!");
    });
});