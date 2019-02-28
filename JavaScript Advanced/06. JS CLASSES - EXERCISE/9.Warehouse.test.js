const Warehouse = require('./9.Warehouse.js');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe.only("Warehouse", function () {
    //CONSTRUCTOR 
    describe("constructor", function () {
        let wh
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
            wh.capacity = 1.25;
            wh.capacity += 1.30;
            expect(wh.capacity).to.be.equal(2.55, "Capacity should be a number biger than 0");
        })
        it('whit negative number param should throw error', function () {
            wh = new Warehouse(3)
            wh.capacity = 3
            expect(() => wh.capacity = -3).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = 0).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "Pesho").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = -1.23).to.throw('Invalid given warehouse space');
        })
    })
    //ADD PRODUCT
    describe("addProduct", function () {
        let wh
        it('with smaller than capacity, quantity should pass correct', function () {
            wh = new Warehouse(20);
            let result = '{"Tomatos":50}';
            wh.capacity += 30;
            // let expected = wh.addProduct('Food', 'Tomatos', 50);
            expect(JSON.stringify(wh.addProduct('Food', 'Tomatos', 50))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('should add product', function () {
            wh = new Warehouse(5);
            wh.addProduct("Food", "banana", 4);
            wh.addProduct("Food", "apple", 1);
            expect(Object.keys(wh.availableProducts["Food"]).length).to.be.equal(2);
        });
        it('when try to add bigger than capacity quantity should trow error', function () {
            wh = new Warehouse(20);
            wh.capacity += 30;
            expect(() => wh.addProduct('Food', 'Tomatos', 51)).to.throw('There is not enough space or the warehouse is already full');
        })
    })
    //ORDER PRODUCTS
    describe("orderProducts", function () {
        describe('orderProducts(type) method test', function () {
            it('orderProducts with correct values', function () {
                let test = new Warehouse(3000);
                test.addProduct('Drink', 'coke', 30);
                test.addProduct('Food', 'sliva', 12);
                test.addProduct('Food', 'burger', 16);
                test.addProduct('Food', 'banana', 55);
                test.addProduct('Drink', 'cappy', 77);
                let output = test.orderProducts('Food');
                let expectedOutput = { 'banana': 55, 'burger': 16, 'sliva': 12 }
                let expectedProducts = Object.keys(expectedOutput);
                let outputProducts = Object.keys(output);
                for (let i = 0; i < expectedProducts.length; i++) {
                    expect(outputProducts[i]).to.be.equal(expectedProducts[i]);
                }
            });
        });
    })
    //OCCUPIED CAPACITY 
    describe("occupiedCapacity", function () {
        let wh;
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
        let wh
        it('with number param should pass correct', function () {
            wh = new Warehouse(20);
            expect(wh.revision()).to.be.equal('The warehouse is empty', "The result string is wrong!")
        })
        it('with at least 1 product in the warehouse should pass correct', function () {
            wh = new Warehouse(20);
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Tomatos 5\n";
            result += "Product type - [Drink]";
            expect('' + wh.revision()).to.be.equal("" + result, "Can not print all products of each type!")
        })
        it('with at more than 1 product in the warehouse should pass correct', function () {
            wh = new Warehouse(20);
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Cucumbers', 2);
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Cucumbers 2\n";
            result += "- Tomatos 5\n";
            result += "Product type - [Drink]\n";
            result += "- Juce 3";
            expect("" + wh.revision()).to.be.equal("" + result, "Can not print all products of each type!")
        })
    })
    //SCRAPE A PRODUCT 
    describe("scrapeAProduct", function () {
        let wh
        it('with existing product and smaler quantity should pass correct', function () {
            wh = new Warehouse(20);
            let result = '{"Tomatos":2,"Apples":5}';
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.addProduct('Food', 'Apples', 5);
            expect(JSON.stringify(wh.scrapeAProduct('Tomatos', 3))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('with existing product and bigger quantity should pass correct', function () {
            wh = new Warehouse(20);
            let result = '{"Tomatos":5,"Apples":0}';
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.addProduct('Food', 'Apples', 5);
            expect(JSON.stringify(wh.scrapeAProduct('Apples', 6))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('with existing product and bigger quantity should pass correct', function () {
            wh = new Warehouse(20);
            let result = '{"Juce":0}';
            wh.addProduct('Drink', 'Juce', 3);
            expect(JSON.stringify(wh.scrapeAProduct('Juce', 50))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('when try to add bigger than capacity quantity should trow error', function () {
            wh = new Warehouse(20);
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Apples', 5);
            expect(() => wh.scrapeAProduct('Tomatos', 3)).to.throw('Tomatos do not exists');
        })
    })
    //CONSTRUCTOR with beforeEach
    describe("constructor", function () {
        let wh
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with number param should pass correct', function () {
            wh.capacity = 30;
            expect(wh.capacity).to.be.equal(30, "The defaut capacity is wrong!")
        })
        it('with number param should pass correct', function () {
            wh.capacity = 1;
            expect(wh.capacity).to.be.equal(1, "The defaut capacity is wrong!")
        })
        it('whit floting point param should pass correct', function () {
            wh.capacity = 1.25;
            wh.capacity += 1.30;
            expect(wh.capacity).to.be.equal(2.55, "Capacity should be a number biger than 0");
        })
        it('whit negative number param should throw error', function () {
            wh.capacity = 3
            expect(() => wh.capacity = -1).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = 0).to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "1").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "").to.throw('Invalid given warehouse space');
            expect(() => wh.capacity = "Pesho").to.throw('Invalid given warehouse space');
        })
    })
    //ADD PRODUCT with beforeEach
    describe("addProduct", function () {
        let wh
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with smaller than capacity, quantity should pass correct', function () {
            let result = '{"Tomatos":50}';
            wh.capacity += 30;
            expect(JSON.stringify(wh.addProduct('Food', 'Tomatos', 50))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('should add product', function () {
            wh.addProduct("Food", "banana", 4);
            wh.addProduct("Food", "apple", 1);
            expect(Object.keys(wh.availableProducts["Food"]).length).to.be.equal(2);
        });
        it('when try to add bigger than capacity quantity should trow error', function () {
            wh.capacity += 30;
            expect(() => wh.addProduct('Food', 'Tomatos', 51)).to.throw('There is not enough space or the warehouse is already full');
            expect(() => wh.addProduct('food', 'Tomatos', 5)).to.throw(TypeError, "Cannot read property 'hasOwnProperty' of undefined");
        })
    })
    describe("orderProducts", function () {
         describe('orderProducts(type) method test', function () {
            it('orderProducts with correct values', function () {
                let test = new Warehouse(3000);
                test.addProduct('Drink', 'coke', 30);
                test.addProduct('Food', 'sliva', 12);
                test.addProduct('Food', 'burger', 16);
                test.addProduct('Food', 'banana', 55);
                test.addProduct('Drink', 'cappy', 77);
                let output = test.orderProducts('Food');
                let expectedOutput = { 'banana': 55, 'burger': 16, 'sliva': 12 }
                let expectedProducts = Object.keys(expectedOutput);
                let outputProducts = Object.keys(output);
                for (let i = 0; i < expectedProducts.length; i++) {
                    expect(outputProducts[i]).to.be.equal(expectedProducts[i]);
                }
            });
        });
    })
    //OCCUPIED CAPACITY with beforeEach
    describe("occupiedCapacity", function () {
        let wh;
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with smaller than capacity, quantity should pass correct', function () {
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
            expect(wh.occupiedCapacity()).to.be.equal(0, "The added quantity is bigger than capacity!");
        })
    })
    //REVISION with beforeEach
    describe('revision', function () {
        let wh
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with number param should pass correct', function () {
            expect(wh.revision()).to.be.equal('The warehouse is empty', "The result string is wrong!")
        })
        it('with at least 1 product in the warehouse should pass correct', function () {
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Tomatos 5\n";
            result += "Product type - [Drink]";
            expect("" + wh.revision()).to.be.equal(result, "Can not print all products of each type!")
        })
        it('with at more than 1 product in the warehouse should pass correct', function () {
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Cucumbers', 2);
            wh.addProduct('Food', 'Tomatos', 5);
            let result = "Product type - [Food]\n";
            result += "- Cucumbers 2\n- Tomatos 5\n";
            result += "Product type - [Drink]\n- Juce 3";
            expect("" + wh.revision()).to.be.equal(result, "Can not print all products of each type!")
        })
        it('with at more than 1 product in the warehouse should pass correct', function () {
            wh.addProduct('Drink', 'Juce', 3);
            let result = "Product type - [Food]\n";
            result += "Product type - [Drink]\n";
            result += "- Juce 3";
            expect("" + wh.revision()).to.be.equal(result, "Can not print all products of each type!")
        })
    })
    //SCRAPE A PRODUCT with beforeEach
    describe("scrapeAProduct", function () {
        let wh
        beforeEach(function () {
            wh = new Warehouse(20);
        });
        it('with existing product and smaler quantity should pass correct', function () {
            let result = '{"Tomatos":2,"Apples":5}';
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.addProduct('Food', 'Apples', 5);
            expect(JSON.stringify(wh.scrapeAProduct('Tomatos', 3))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('with existing product and bigger quantity should pass correct', function () {
            let result = '{"Tomatos":5,"Apples":0}';
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Tomatos', 5);
            wh.addProduct('Food', 'Apples', 5);
            expect(JSON.stringify(wh.scrapeAProduct('Apples', 6))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('with existing product and bigger quantity should pass correct', function () {
            let result = '{"Juce":0}';
            wh.addProduct('Drink', 'Juce', 3);
            expect(JSON.stringify(wh.scrapeAProduct('Juce', 50))).to.be.equal(result, "The added quantity is bigger than capacity!");
        })
        it('when try to add bigger than capacity quantity should trow error', function () {
            wh.addProduct('Drink', 'Juce', 3);
            wh.addProduct('Food', 'Apples', 5);
            expect(() => wh.scrapeAProduct('Tomatos', 3)).to.throw('Tomatos do not exists');
        })
    })
})