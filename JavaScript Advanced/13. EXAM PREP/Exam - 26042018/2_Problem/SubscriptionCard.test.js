const SubscriptionCard = require('./SubscriptionCard');
const expect = require('Chai').expect;
const assert = require('Chai').assert;

describe("SubscriptionCard", function () {
    describe("Constructor", function () {
        it("if the card is not blocked should pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            assert.equal(sc.isBlocked, false)
        });
        it("if have three params should pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            assert.equal(sc.firstName, 'Pesho')
            assert.equal(sc.lastName, 'Petrov')
            assert.equal(sc.SSN, '0000000')
        });
        it("if have subscriptions as empty array should pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            assert.deepEqual(sc._subscriptions, [])
        });
        it("if one params missing SSN should be equqal to undefined and  pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc._firstName = 'Pesho1'
            assert.equal(sc.firstName, 'Pesho1')
            assert.equal(sc.lastName, 'Petrov')
            assert.equal(sc.SSN, '0000000')
        });
        it("if two params missing lastName and SSN should be equqal to undefined and  pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000');
            sc._lastName = 'Petrov1';
            assert.equal(sc.firstName, 'Pesho')
            assert.equal(sc.lastName, "Petrov1")
            assert.equal(sc.SSN, '0000000')
        });
        it("if three params missing firstName, lastName and SSN should be equqal to undefined and  pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000');
            sc._SSN = '00000001';
            assert.equal(sc.firstName, 'Pesho')
            assert.equal(sc.lastName, 'Petrov')
            assert.equal(sc.SSN, '00000001')
        });
    })
    describe("addSubscription", function () {
        it("if the card is not blocked should pass correct", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000');
            let resultArr = [{
                line: '120',
                startDate: new Date('2018-04-22'),
                endDate: new Date('2018-05-21')
            },
            {
                line: '*',
                startDate: new Date('2018-05-25'),
                endDate: new Date('2018-06-24')
            }]
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            sc.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            for (let i = 0; i < resultArr.length; i++) {
                assert.deepEqual(sc._subscriptions[i], resultArr[i])
            }
        });
        it("if try to do addSubscription chaining should throw error", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            let add = sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(() => add.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'))).to.throw(TypeError);
        });
    });
    describe("isValid", function () {
        it("return true if the card is valid for the given date", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.equal(sc.isValid('120', new Date('2018-04-22')), true)
            assert.equal(sc.isValid('120', new Date('2018-05-21')), true)
        })
        it("return false if the card is not valid for the given date", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.equal(sc.isValid('120', new Date('2018-03-22')), false)
            assert.equal(sc.isValid('120', new Date('2018-06-22')), false)
        })
        it("return false if the card is valid for the given date but given line not exist", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.equal(sc.isValid('1', new Date('2018-04-22')), false)
            assert.equal(sc.isValid('12', new Date('2018-05-21')), false)
        })
        it("return false/true if the card is valid for the given date but card is bloced/unblocked", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            sc.block();
            assert.equal(sc.isValid('120', new Date('2018-04-22')), false)
            sc.unblock();
            assert.equal(sc.isValid('120', new Date('2018-05-21')), true)
        })
        it("return true if the card is valid for the given date and have '*' line", function () {
            let sc = new SubscriptionCard('Pesho', 'Petrov', '0000000')
            sc.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            sc.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'))
            assert.equal(sc.isValid('12000', new Date('2018-04-22')), false)
            assert.equal(sc.isValid('12000', new Date('2018-05-25')), true)
        })
    })
})