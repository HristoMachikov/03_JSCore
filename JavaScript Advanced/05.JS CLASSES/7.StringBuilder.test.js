const StringBuilder = require('./7.StringBuilder.js');
const {expect} = require("chai");

describe('String Builder tests', function () {
    let sb;
    beforeEach(function () {
        sb = new StringBuilder();
    });
    describe('constructir tests', function () {
        it('is initialized with wrong params ',function(){
            
        })
        it('is initialized without params', function () {
            expect(sb._stringArray.join('')).to.be.equal("", "Expected empty string")
        });

        it('is initialized with params', function () {
            sb = new StringBuilder("Test");
            const expected = "Test"
            expect(sb._stringArray.join('')).to.be.equal(expected, "Expected to run Test")
        });
    })
});