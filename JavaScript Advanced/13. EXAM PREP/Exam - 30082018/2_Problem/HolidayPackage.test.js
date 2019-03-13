const HolidayPackage = require('./HolidayPackage');

const expect = require('chai').expect;
const assert = require('chai').assert;

describe("HolidayPackage", function () {
    let hp;
    beforeEach(function () {
        hp = new HolidayPackage('Italy', 'Summer');
    })
    describe("insuranceIncluded", function () {
        it("if get and set boolean value of the insurance status should pass correct", function () {
            assert.equal(hp.insuranceIncluded, false)
            hp.insuranceIncluded = true;
            assert.equal(hp.insuranceIncluded, true)
            hp.insuranceIncluded = false;
            assert.equal(hp.insuranceIncluded, false)
        });
        it("if get and set not a boolean value of the insurance status should throw erroe", function () {
            let expectArr = [3, "str", 3.23, undefined, { "Gosho": 3 }, () => 3, "true", "false"];
            for (const value of expectArr) {
                expect(() => hp.insuranceIncluded = value).to.throw(Error, "Insurance status must be a boolean")
            }
        });
    })
    describe("showVacationers", function () {
        it("if do not add vacationer should throw message", function () {
            assert.equal(hp.showVacationers(), "No vacationers are added yet")
        });
        it("if add vacationer with two names should pass correct", function () {
            hp.addVacationer('Ivan Ivanov');
            hp.addVacationer('Petar Petrov');
            hp.addVacationer('Georgi Georgiev');

            let output = "Vacationers:\n";
            output += 'Ivan Ivanov\n';
            output += 'Petar Petrov\n';
            output += 'Georgi Georgiev\n';

            assert.equal(hp.showVacationers(), output.trim())
        });
    })
    describe("addVacationers", function () {
        it("if add vacationer with name empty string should throw error", function () {
            let expectedArr = [1, " ", 3.23, undefined, { "Gosho": 3 }, () => 3];
            for (const value of expectedArr) {
                expect(() => hp.addVacationer(value)).to.throw(Error, "Vacationer name must be a non-empty string")
            }
        });
        it("if add vacationer with first name only should throw error", function () {
            let expectedArr = ['Ivan', "", "fasjdf3389343uh"];
            for (const value of expectedArr) {
                expect(() => hp.addVacationer(value)).to.throw(Error, "Name must consist of first name and last name")
            }
        });
    })
    describe("generateHolidayPackage", function () {
        it("if do not add vacationer string should throw error", function () {
            let expectedArr = [1, " ", 3.23, undefined, { "Gosho": 3 }, () => 3, 'Ivan', "", "fasjdf3389343uh"];
            for (const value of expectedArr) {
                try {
                    hp.addVacationer(value)
                } catch (err) {

                }
                expect(() => hp.generateHolidayPackage()).to.throw(Error, "There must be at least 1 vacationer added")
            }
        });
        it("if add vacationer with two names should pass correct", function () {
            hp.addVacationer('Ivan Ivanov');
            hp.addVacationer('Petar Petrov');
            hp.addVacationer('Georgi Georgiev');
            hp.insuranceIncluded = true;

            let output = "Holiday Package Generated\n";
            output += "Destination: Italy\n";
            output += hp.showVacationers() + "\n";
            output += "Price: 1500\n";

            assert.equal(hp.generateHolidayPackage(), output.trim())
        });
        it("if add vacationer with first name only should throw error", function () {
           let hPack = new HolidayPackage('Sofia', 'Spring')
           hPack.addVacationer('Ivan Ivanov');

            let output = "Holiday Package Generated\n";
            output += "Destination: Sofia\n";
            output += hPack.showVacationers() + "\n";
            output += "Price: 400\n";

            assert.equal(hPack.generateHolidayPackage(), output.trim())
        });
    })
})