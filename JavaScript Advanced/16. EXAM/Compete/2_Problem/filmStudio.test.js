const FilmStudio = require('./filmStudio.js');
const assert = require('Chai').assert;
const expect = require('Chai').expect;

describe("FilmStudio", function () {
    let fs;
    beforeEach(function () {
        fs = new FilmStudio('Boyana');
    })
    it('with own property "constructor" should pass correct', function () {
       
        let proto = Object.getPrototypeOf(fs);
        let check = proto.hasOwnProperty("constructor");
        expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    })
    it('with own property "makeMovie" should pass correct', function () {
        
        let proto = Object.getPrototypeOf(fs);
        let check = proto.hasOwnProperty("makeMovie");
        expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    })
    it('with own property "casting" should pass correct', function () {
      
        let proto = Object.getPrototypeOf(fs);
        let check = proto.hasOwnProperty("casting");
        expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    })
    it('with own property "lookForProducer" should pass correct', function () {
       
        let proto = Object.getPrototypeOf(fs);
        let check = proto.hasOwnProperty("lookForProducer");
        expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    })
    describe("Constructor", function () {
        it("should be instantiation with one string parameter and empty array", function () {
            assert.equal(fs.name, "Boyana")
            assert.deepEqual(fs.films, [])
            //console.log(fs)
        });
        it("should be instantiation with any one parameter and empty array", function () {
            let passArr = ['', " ", '1', 3, -1, [1, 2, 45], { 'Pesho': 1 }, null, undefined, false, function () { 1 }]

            for (const el of passArr) {
                let ffs = new FilmStudio(el);
                expect(ffs.name).to.deep.equal(el);
            }
        });
        it("should be instantiation with any empty parameter and empty array", function () {
            let ffs = new FilmStudio();
        });
    })
    describe('makeMovie', function () {
        it("should pass corect if receives two parameters - a string(filmName) and an array(roles)", function () {
            fs.makeMovie('Hary Poter', [1, 2, 3])
            //fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            assert.equal(fs.films[0].filmName, "Hary Poter")
            // console.log(fs.films[0].filmName)
        });
        it("should pass corect if receives the same parameters many time - a string(filmName) and an array(roles)", function () {

            let resultRoles = [{ role: 1, actor: false },
            { role: 2, actor: false },
            { role: 3, actor: false }];

            fs.makeMovie('Hary Poter', [1, 2, 3])

            for (let i = 2; i <= 100; i++) {
                fs.makeMovie('Hary Poter', [1, 2, 3])
                assert.equal(fs.films[i - 1].filmName, `Hary Poter ${i}`)
                assert.deepEqual(fs.films[i - 1].filmRoles, resultRoles)
            }
            // fs.makeMovie('Hary Poter', [1, 2, 3])
            // fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            // assert.deepEqual(fs.films[0].filmRoles, resultRoles)
            // console.log(fs.films[0].filmRoles)
        });
        it("should throw error if do not receives parameters", function () {
            expect(() => fs.makeMovie()).to.throw("Invalid arguments count");
        });
        it("should throw error if receives only one parameter", function () {

            expect(() => fs.makeMovie('Hary Poter')).to.throw("Invalid arguments count");
        });
        it("should throw error if receives two wrong parameters", function () {
            let notPassArr = ['', " ", '1', 3, -1, { 'Pesho': 1 }, null, undefined, false, function () { 1 }]
            for (const el of notPassArr) {
                expect(() => fs.makeMovie('Hary Poter', el)).to.throw("Invalid arguments");
            }
        })
    })
    describe('casting', function () {
        it("should pass corect if receives two parameters - a string (actor) and another string (role) - when role exist", function () {
            fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            let output = 'You got the job! Mr. Brat Pit you are next 3 in the Hary Poter. Congratz!';
            assert.equal(fs.casting('Brat Pit', 3), output)
        });
        it("should pass corect if receives two parameters - a string (actor) and another string (role) - when role not exist", function () {
            let passArr = ['', " ", 'Brat Pit', 3, -1, { 'Pesho': 1 }, null, undefined, false, function () { 1 }]
            fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            for (const el of passArr) {
                let output = `${el}, we cannot find a 5 role...`;
                assert.equal(fs.casting(el, 5), output)
            }

        });
        it("should pass corect if receives one parameters - a string (actor) and another string (role)", function () {
            fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            let output = 'Brat Pit, we cannot find a undefined role...';
            assert.equal(fs.casting('Brat Pit'), output)
        });
        it("should pass corect if films is empty array", function () {
            let output = 'There are no films yet in Boyana.';
            assert.equal(fs.casting('Brat Pit'), output)
        });
        it("should pass corect whitout parameters", function () {
            let output = 'undefined, we cannot find a undefined role...';
            fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            assert.equal(fs.casting(), output)
            // console.log(fs)
        });
        it("should pass corect whitout parameters", function () {
            let output = 'You got the job! Mr. 1 you are next undefined in the Hary Poter. Congratz!';
            fs.makeMovie('Hary Poter', [undefined, 2, 3, 4])
            //assert.equal(fs.casting(), output)
            console.log(fs.casting(1))
        });

    })
    describe('lookForProducer', function () {
        it("if the given filmName exists should pass corect", function () {
            fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            let output0 = `Film name: Hary Poter\n`;
            output0 += "Cast:\n";
            output0 += 'false as 1\n';
            output0 += 'false as 2\n';
            output0 += 'false as 3\n';
            output0 += 'false as 4\n';
            let actual = fs.lookForProducer('Hary Poter')
            assert.equal(actual, output0)
            // fs.makeMovie('Hary Poter', [1, 2, 3, 4])
            for (let i = 2; i <= 100; i++) {
                fs.makeMovie('Hary Poter', [1, 2, 3, 4])
                let output = `Film name: Hary Poter ${i}\n`;
                output += "Cast:\n";
                output += 'false as 1\n';
                output += 'false as 2\n';
                output += 'false as 3\n';
                output += 'false as 4\n';
                actual = fs.lookForProducer(`Hary Poter ${i}`)
                assert.equal(actual, output)
            }
        });
        it("if the given filmName not exists should throw error", function () {
            expect(() => fs.lookForProducer('Hary Poter')).to.throw(Error, "Hary Poter do not exist yet, but we need the money...");
        });
    })
})