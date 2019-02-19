const isOddOrEven = require('./2.EvenOrOdd');
const expect = require('chai').expect;

describe ("Odd Or Even",function() {
    it('should return undefined if param is number', function() {
        let number = 7;
        let result = isOddOrEven(number);
        expect(result).to.equal(undefined);
    });
    it('should return undefined if param is object', function() {
        let object = {name: "pesho"};
        let result = isOddOrEven(object);
        expect(result).to.equal(undefined,"The returned result in Not correct!")
    });
    it('should return "odd" if param is an odd string', function() {
        let str = "pesho";
        let result = isOddOrEven(str);
        expect(result).to.equal("odd")
    });
    it('should return "even" if param is an even string', function() {
        let str = "pesho1";
        let result = isOddOrEven(str);
        expect(result).to.equal("even");
    });
});