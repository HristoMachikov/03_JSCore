const assert = require('chai').assert;
const subsum = require('./1.SubSum');

describe("subsum", function () {
    it("should work properly - test 1", function () {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let result = subsum(arr, 3, 5);
        assert.equal(result, 15);
    });
    it.skip("should work properly - test 2", function () {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let result = subsum(arr, 3, 5);
        assert.equal(result, 16);
    });
});