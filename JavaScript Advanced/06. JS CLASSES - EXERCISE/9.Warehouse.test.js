const Warehouse = require('./9.Warehouse.js');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("Warehouse", function () {
    let wh;
    beforeEach(function () {
        wh = new Warehouse(20);
    });

    // it('with own property "constructor" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("constructor");
    //     expect(check).to.be.equal(true, "This object has not own property 'constructor'")
    // })
    // it('with own property "addProduct" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("addProduct");
    //     expect(check).to.be.equal(true, "This object has not own property 'append'")
    // })
    // it('with own property "orderProducts" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("orderProducts");
    //     expect(check).to.be.equal(true, "This object has not own property 'prepend'")
    // })
    // it('with own property "occupiedCapacity" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("occupiedCapacity");
    //     expect(check).to.be.equal(true, "This object has not own property 'insertAt'")
    // })
    // it('with own property "revision" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("revision");
    //     expect(check).to.be.equal(true, "This object has not own property 'remove'")
    // })
    // it('with own property "scrapeAProduct" should pass correct', function () {
    //     wh = new Warehouse(20);
    //     let proto = Object.getPrototypeOf(wh);
    //     let check = proto.hasOwnProperty("scrapeAProduct");
    //     expect(check).to.be.equal(true, "This object has not own property 'toString'")
    // })

    //CONSTRUCTOR
    describe("constructor", function () {
        it('with number param should pass correct', function () {
            wh = new Warehouse(20);
            wh.capacity = 30;
            expect(wh.capacity).to.be.equal(30, "The defaut capacity is wrong!")
        })
        it('with number param should pass correct', function () {
            wh = new Warehouse(1);
            expect(wh.capacity).to.be.equal(1, "The defaut capacity is wrong!")
        })
        it('whit floting point param should pass correct', function () {
            wh = new Warehouse(1.25);
            wh.capacity += 1.30;
            expect(wh.capacity).to.be.equal(2.55, "Capacity should be a number biger than 0");
        })
        it('whit negative number param should throw error', function () {
            wh = new Warehouse(3)
            expect(() => wh.capacity = -3).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = 0).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "Pesho").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = [1, 2, 3]).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = () => { 1 }).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = { a: 1, b: 2, c: 2 }).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = undefined).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = null).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = false).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = -1.23).to.throw('Invalid given warehouse space');
        })
    })

    //REVISION
    describe('revision', function () {
        it('with number param should pass correct', function () {
            wh = new Warehouse(20);
            //let result = resultStr(wh.availableProducts,wh.occupiedCapacity());
            expect(wh.revision()).to.be.equal('The warehouse is empty', "The result string is wrong!")
        })
    })

    function resultStr(availableProducts, occupiedCapacity) {
        let output = "";

        if (occupiedCapacity() > 0) {
            for (let type of Object.keys(availableProducts)) {
                output += `Product type - [${type}]\n`;
                for (let product of Object.keys(availableProducts[type])) {
                    output += `- ${product} ${availableProducts[type][product]}\n`;
                }
            }
        } else {
            output = 'The warehouse is empty';
        }
        return output.trim();
    }
});