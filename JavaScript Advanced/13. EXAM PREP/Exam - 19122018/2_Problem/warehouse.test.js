const Warehouse = require('./warehouse');
const assert = require('Chai').assert;
const expect = require('Chai').expect;

describe('Warehouse', function () {
    let wh;
    beforeEach(function () {
        wh = new Warehouse(30);
    })

    describe('Constructor', function () {
        it('if the constructor gets a negative number or 0 should throw an error', function () {
            let notPassArr = ['', " ", '-1', 0, -1, { 'Pesho': 1 }, null, undefined, false, function () { 1 }]
            for (const el of notPassArr) {
                expect(() => new Warehouse(el)).to.throw("Invalid given warehouse space");
            }
        })
        describe('addProduct', function () {

            it("should adds the given product in Drink correct if there is space", function () {
                let passArr = [5, 5, 5, 5, 5, 5];
                let sum = 0;
                for (const el of passArr) {
                    let obj = { "bear": sum += el }
                    expect(wh.addProduct("Drink", "bear", el)).to.deep.equal(obj);
                }
            })
            it("should adds the given product in Food correct if there is space", function () {
                let passArr = [1, 1, 2];
                let sum = 0;
                let obj = {};
                let passProd = ['pizza', 'sandwich', "appal"];
                for (const el of passArr) {
                    sum += el
                    for (const prod of passProd) {
                        obj[prod] = sum;
                        expect(wh.addProduct("Food", prod, el)).to.deep.equal(obj);
                    }
                }
            })
            it("if type of products is different from 'Food' and 'Drink' should throw an Type error", function () {
                let passArr = [1, 1, 2];
                let sum = 0;
                let obj = {};
                let passProd = ['pizza', 'sandwich', "appal"];
                for (const el of passArr) {
                    sum += el
                    for (const prod of passProd) {
                        obj[prod] = sum;
                        expect(() => wh.addProduct("food", prod, el)).to.throw(TypeError, "Cannot read property 'hasOwnProperty' of undefined");
                    }
                }
            })
            it("should adds the given product if there is space else should throw error", function () {
                let passArr = [5, 5, 5, 5, 5, 5, 1];
                let sum = 0;
                for (const el of passArr) {
                    let obj = { "bear": sum += el }
                    if (sum <= 30) {
                        expect(wh.addProduct("Drink", "bear", el)).to.deep.equal(obj);
                    } else {
                        expect(() => wh.addProduct("Drink", "bear", el)).to.throw("There is not enough space or the warehouse is already full");
                    }
                }
            })

        })
        describe('orderProducts', function () {
            it('showd order "Drink" products correct', function () {
                wh.addProduct("Drink", "bear", 5)
                wh.addProduct("Drink", "soda", 5)
                wh.addProduct("Drink", "aqua", 5)
                let result = { "bear": 5, "soda": 5, "aqua": 5 };
                expect(wh.orderProducts("Drink")).to.deep.equal(result);
                expect(wh.orderProducts("Food")).to.deep.equal({});
            })
            it('showd order "Food" products correct', function () {
                wh.addProduct("Food", "pizza", 5)
                wh.addProduct("Food", "torta", 5)
                wh.addProduct("Food", "pizza", 5)
                let result = { "pizza": 10, "torta": 5 };
                expect(wh.orderProducts("Food")).to.deep.equal(result);
                expect(wh.orderProducts("Drink")).to.deep.equal({});
            })
            it('should throw error', function () {
                expect(() => wh.orderProducts("drink")).to.throw(TypeError, "Cannot convert undefined or null to object");
            })
            it('showd order "Food" and "Drink" products correct', function () {
                let a = 0
                let b = 0;
                for (let i = 1; i <= 6; i++) {
                    if (i % 2 === 0) {
                        let result2 = { "pizza": b += 5 };
                        wh.addProduct("Food", "pizza", 5)
                        expect(wh.orderProducts("Food")).to.deep.equal(result2);
                    } else {
                        let result1 = { "bear": a += 5 };
                        wh.addProduct("Drink", "bear", 5)
                        expect(wh.orderProducts("Drink")).to.deep.equal(result1);
                    }
                }
            })
        })
        describe('occupiedCapacity', function () {
            it('Returns a number, which represents the already occupied place in the warehouse', function () {
                assert.equal(wh.occupiedCapacity(), 0)
                wh.addProduct("Food", "pizza", 5)
                wh.addProduct("Food", "torta", 5)
                wh.addProduct("Food", "pizza", 5)
                assert.equal(wh.occupiedCapacity(), 15)

            })
        })
        describe('revision', function () {
            it('if there is not at least 1 product in the warehouse we return the string', function () {
                assert.equal(wh.revision(), "The warehouse is empty")
            })
            it('Returns a string in which we print all products of each type, into the following format', function () {
                wh.addProduct("Food", "pizza", 5)
                wh.addProduct("Food", "torta", 5)
                wh.addProduct("Food", "torta", 5)
                let result = 'Product type - [Food]\n- pizza 5\n- torta 10\nProduct type - [Drink]';
                assert.equal(wh.revision(), result)
            })
        })
        describe('scrapeAProduct', function () {
            it('if the given product exists we reduce his quantity, otherwise we reset it', function () {
                wh.addProduct("Food", "torta", 5)
                wh.addProduct("Drink", "bear", 5)
                let result1 = { "torta": 2 };
                let result2 = { "bear": 0 };
                expect(wh.scrapeAProduct("torta", 3)).to.deep.equal(result1)
                expect(wh.scrapeAProduct("bear", 6)).to.deep.equal(result2)
                wh.addProduct("Food", "pizza", 5)
                expect(wh.scrapeAProduct("pizza", 4)).to.deep.equal({ "torta": 2, "pizza": 1 })
            })
            it('if we cannot find the given product we return the string: {product} do not exists', function () {
                expect(() => wh.scrapeAProduct("product", 3)).to.throw("product do not exists");
            })
        })
    })

})