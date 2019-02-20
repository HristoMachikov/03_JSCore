const assert = require('chai').assert;
const expect = require('chai').expect;
const isSymmetric = require('./5. Check for Symmetry');

describe("Is Symmetric Array", function () {

    it("with empty Array as param should return 'true'", function () {
        let arr = [];
        let expected = isSymmetric(arr);
        assert.equal(expected, true);
    })
    it("with symmetric Array as param should return 'true'", function () {
        //Arrange
        let arr = [1, 2, 3, 2, 1];
        //Act
        let expected = isSymmetric(arr);
        //Assert 
        assert.equal(expected, true);
    })
    it("with symmetric Array as param should return 'true'", function () {
        let arr = [1, 2, 2, 1];
        let expected = isSymmetric(arr);
        assert.equal(expected, true);
    })
    it("with symmetric Array as param should return 'true'", function () {
        //Arrange
        let arr = [1, -2, {}, [], "", function () { }, "", [], {}, -2, 1];
        //Act
        let expected = isSymmetric(arr);
        //Assert
        assert.equal(expected, true);
    })
    it("with Not symmetric Array as param should return 'false'", function () {
        let arr = [1, 2, 1, 1];
        let expected = isSymmetric(arr);
        assert.equal(expected, false);
    })
    it("with null as param should return 'false'", function () {
        let input = null;
        let expected = isSymmetric(input);
        assert.equal(expected, false);
    })
    it("with NaN as param should return 'false'", function () {
        let input = NaN;
        let expected = isSymmetric(input);
        assert.equal(expected, false);
    })
    it("with undefined as param should return 'false'", function () {
        let input = undefined;
        let expected = isSymmetric(input);
        assert.equal(expected, false);
    })
    it("with String as param should return 'false'", function () {
        let str = "HIIH";
        let expected = isSymmetric(str);
        assert.equal(expected, false);
    })
    it("with Number as param should return 'false'", function () {
        let num = 3;
        let expected = isSymmetric(num);
        assert.equal(expected, false);
    })
    it("with Object as param should return 'false'", function () {
        let obj = { name: "Pesho" }
        let expected = isSymmetric(obj);
        assert.equal(expected, false);
    })
    it("with Function as param should return 'false'", function () {
        let func = function () { name: "Pesho" }
        let expected = isSymmetric(func);
        assert.equal(expected, false);
    })
})