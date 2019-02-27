const Warehouse = require('./9.Warehouse.js');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe.only("Warehouse", function () {
    let wh;
    // beforeEach(function () {
    //     wh = new Warehouse(20);
    // });

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


    //ADD PRODUCT
    describe("addProduct", function () {
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with smaller than capacity, quantity should pass correct', function () {
            wh = new Warehouse(20);
            let result = { Tomatos: 50 };
            wh.capacity += 30;
            let expected = wh.addProduct('Food', 'Tomatos', 50);
            expect(expected).to.deep.equal(result, "The added quantity is bigger than capacity!");
        })
        it('when try to add bigger than capacity quantity should trow error', function () {
            wh = new Warehouse(20);
            wh.capacity += 30;
            expect(() => wh.addProduct('Food', 'Tomatos', 51)).to.throw('There is not enough space or the warehouse is already full');
        })

    })
    //ORDER PRODUCTS
    //


    describe("orderProducts", function () {
        // let wh;
        // beforeEach(function () {
        //     wh = new Warehouse(20);
        // });
        it('with smaller than capacity, quantity should sort "Food" correct', function () {
            wh = new Warehouse(20);
            let result = { Tomatos: 5, Apples: 5, Cucumbers: 2 };

            wh.addProduct('Food', 'Cucumbers', 2);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.addProduct('Food', 'Apples', 5);
            expect(wh.orderProducts('Food')).to.deep.equal(result, "The added product are not sorted!");
        })
        it('with smaller than capacity, quantity should sort "Drink" correct', function () {
            wh = new Warehouse(20);
            let result = { Voda: 5, Juce: 3, Beer: 2 };

            wh.addProduct('Drink', 'Beer', 2);
            wh.addProduct('Drink', 'Voda', 5);
            wh.addProduct('Drink', 'Juce', 3);
            expect(wh.orderProducts('Drink')).to.deep.equal(result, "The added product are not sorted!");
        })
        it('with equal to 0 quantity should sort "Drink" correct', function () {
            wh = new Warehouse(20);
            let result = {};
            expect(wh.orderProducts('Drink')).to.deep.equal(result, "The added product are not sorted!");
            expect(wh.orderProducts('Food')).to.deep.equal(result, "The added product are not sorted!");
        })
        it('with different from "Food" and "Drink" type should be undefined', function () {
            wh = new Warehouse(20);
            expect(() => wh.orderProducts('Desert')).to.throw(TypeError);
        })
    })
    //
    //OCCUPIED CAPACITY
    describe("occupiedCapacity", function () {
        // let wh;
        // beforeEach(function () {
        //     wh = new Warehouse(20);
        // });
        it('with smaller than capacity, quantity should pass correct', function () {
            wh = new Warehouse(20);
            wh.addProduct('Drink', 'Beer', 2);
            wh.addProduct('Drink', 'Voda', 5);
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Cucumbers', 2);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.capacity += 30;
            wh.addProduct('Food', 'Apples', 5);
            expect(wh.occupiedCapacity()).to.be.equal(25, "The added quantity is bigger than capacity!");
        })
        it('with smaller than capacity, zero quantity should pass correct', function () {
            wh = new Warehouse(20);
            expect(wh.occupiedCapacity()).to.be.equal(0, "The added quantity is bigger than capacity!");
        })

    })
    //REVISION
    describe('revision', function () {

        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with number param should pass correct', function () {
            // wh = new Warehouse(20);
            //let result = resultStr(wh.availableProducts,wh.occupiedCapacity());
            expect(wh.revision()).to.be.equal('The warehouse is empty', "The result string is wrong!")
        })

        it('with at least 1 product in the warehouse should pass correct', function () {
            // wh = new Warehouse(20);
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Tomatos 5\n";
            result += "Product type - [Drink]";
            expect(wh.revision()).to.deep.equal(result, "Can not print all products of each type!")
        })
        it('with at more than 1 product in the warehouse should pass correct', function () {
            // wh = new Warehouse(20);

            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Cucumbers', 2);
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Cucumbers 2\n";
            result += "- Tomatos 5\n";
            result += "Product type - [Drink]\n";
            result += "- Juce 3";
            expect(wh.revision()).to.deep.equal(result, "Can not print all products of each type!")
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