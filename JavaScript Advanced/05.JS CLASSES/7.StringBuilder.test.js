const StringBuilder = require('./7.StringBuilder');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe('String Builder', function () {
    let sb;
    beforeEach(function () {
        sb = new StringBuilder();
    });
    it('with own property "constructor" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("constructor");
        expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    })
    it('with own property "append" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("append");
        expect(check).to.be.equal(true, "This object has not own property 'append'")
    })
    it('with own property "prepend" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("prepend");
        expect(check).to.be.equal(true, "This object has not own property 'prepend'")
    })
    it('with own property "insertAt" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("insertAt");
        expect(check).to.be.equal(true, "This object has not own property 'insertAt'")
    })
    it('with own property "remove" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("remove");
        expect(check).to.be.equal(true, "This object has not own property 'remove'")
    })
    it('with own property "toString" should pass correct', function () {
        sb = new StringBuilder();
        let proto = Object.getPrototypeOf(sb);
        let check = proto.hasOwnProperty("toString");
        expect(check).to.be.equal(true, "This object has not own property 'toString'")
    })
    //CONSTRUCTOR
    describe('constructor tests', function () {
        it('throw Type Error whit param diffrtent from string and undefined ', function () {
            let notStrParam = function () { 1 };
            expect(() => new StringBuilder(notStrParam)).to.throw(TypeError, 'Argument must be string');
        })
        it('is initialized without param', function () {
            expect(sb._stringArray.join('')).to.be.equal("", "Expecte empty string")
        });

        it('is initialized with param', function () {
            const expected = "Test"
            sb = new StringBuilder("Test");
            expect(sb._stringArray.join('')).to.be.equal(expected, "Expected to run Test")
        });
        it('is initialized with "undefined" param', function () {
            sb = new StringBuilder(undefined);
            expect(sb._stringArray.join('')).to.be.equal("", "Expected to create empty string")
        });
    })
    //APPEND
    describe('append tests', function () {
        it('whit string param should append correct', function () {
            let result = "Hello JS!";
            let sb = new StringBuilder("Hello");
            sb.append(" JS!")
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string param");
        })
        it('whit empty string param should append correct', function () {
            let result = "Hello";
            let sb = new StringBuilder("Hello");
            sb.append("")
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string param");
        })
        it('throw Type Error whit param diffrtent from string', function () {
            let notStrParam = function () { 1 };
            sb = new StringBuilder();
            expect(() => sb.append(notStrParam)).to.throw(TypeError, 'Argument must be string');
        })
    });
    //PREPEND
    describe('prepend tests', function () {
        it('whit string param should prepend correct', function () {
            let result = "Hello JS!";
            let sb = new StringBuilder("JS!");
            sb.prepend("Hello ")
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string param");
        })
        it('whit empty string param should prepend correct', function () {
            let result = "Hello JS!";
            let sb = new StringBuilder("Hello JS!");
            sb.prepend("")
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string param");
        })
        it('throw Type Error whit param diffrtent from string', function () {
            let notStrParam = function () { 1 };
            sb = new StringBuilder();
            expect(() => sb.prepend(notStrParam)).to.throw(TypeError, 'Argument must be string');
        })
    })

    //INSERT AT
    describe('insertAt tests', function () {
        it('whit params [str, index]=[string, number] should insert str at middle', function () {
            let result = "Hello from me JS!";
            let sb = new StringBuilder("Hello JS!");
            sb.insertAt(" from me", 5)
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string, number params");
        })
        it('whit params [str, index]=["", number] should insert str at correct index', function () {
            let result = "Hello JS!";
            let sb = new StringBuilder("Hello JS!");
            sb.insertAt("", 5)
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect string, number params");
        })
        it('throw Type Error whit first param diffrtent from string', function () {
            let notStrParam = function () { 1 };
            sb = new StringBuilder("Hello JS!");
            expect(() => sb.insertAt(notStrParam, 3)).to.throw(TypeError, 'Argument must be string');
        })
        it('throw Type Error whit first param diffrtent from string', function () {
            let str = " from";
            sb = new StringBuilder("Hello JS!");
            expect(() => sb.insertAt(5, str)).to.throw(TypeError, 'Argument must be string');
        })
        it('insert new test', function () {
            let str = 'wtf';
            let builder = new StringBuilder('lol');
            builder.insertAt(str, 0);
            let expected = Array.from('lol');
            expected.splice(0, 0, ...str);
            compareArray(builder._stringArray, expected);
        });
    })
    function compareArray(source, expected) {
        expect(source.length).to.equal(expected.length, "Arrays don't match");
        for (let i = 0; i < source.length; i++) {
            expect(source[i]).to.equal(expected[i], 'Element ' + i + ' mismatch');
        }
    }
    //REMOVE
    describe('remove tests', function () {
        it('whit params [index, num]=[number, number] should remove correct at middle', function () {
            let result = "Hello from JS!";
            let sb = new StringBuilder("Hello from me JS!");
            sb.remove(10, 3)
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect number, number params");
        })
        it('whit params [index, num]=["number", number] should remove correct', function () {
            let result = "Hello from JS!";
            let sb = new StringBuilder("Hello from me JS!");
            sb.remove("10", 3)
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect number, number params");
        })
        it('whit params [index, num]=[0, 0] should return the same', function () {
            let result = "Hello from me JS!";
            let sb = new StringBuilder("Hello from me JS!");
            sb.remove(0, 0)
            expect(sb._stringArray.join('')).to.be.equal(result, "Expect number, number params");
        })
    })
    //TO STRING
    describe('toString tests', function () {
        it('whit not empty array should return string', function () {
            let result = "Hello from JS!";          
            let sb = new StringBuilder(" from me ");
            sb.prepend("Hello")
            sb.remove(10, 3)
            sb.append("JS!")
            expect(sb.toString()).to.be.equal(result);
        })
        it('whit empty array should return string', function () {
            let result = "";
            let sb = new StringBuilder();
            expect(sb.toString()).to.be.equal(result);
        })
    })
})