const assert = require('chai').assert;
const expect = require('chai').expect;
const sum = require('./4. Sum of Numbers');

describe('sum', function () {
    it('shiuld sum the nummbers of input array', function () {
        let arr = [1, 2, 3, 4, 5, 6];
        let result = sum(arr);
        assert.equal(result, 21);
    });
    // it('shiuld check if argument is array', function () {
    //     let arr = [1, 2, 3, 4, 5, 6];
    //     let result = sum(arr);
    //     assert.isArray(arr,'The argument is Not an Arrray!');
    // });
        it('shiuld check if argument is array', function () {
       // let arr = [null];
        let result = sum(null);
        expect(result).to.be.equal(NaN)//)'The argument is Not an Arrray!');
    });
    it('shiuld check if array is empty', function () {
        let arr = [];
        let result = sum(arr);
        assert.isNotEmpty(arr,"The array is empty!");
    });
});