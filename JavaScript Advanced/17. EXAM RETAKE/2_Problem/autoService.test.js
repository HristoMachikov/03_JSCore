const AutoService = require('./autoService');
const assert = require('Chai').assert;
const expect = require('Chai').expect;

describe("AutoService", function () {
    let as;
    beforeEach(function () {
        as = new AutoService(30);
    })

    describe("Constructor", function () {
        it("Contains two additional properties, which by default must be set to empty arrays", function () {
            expect(as.workInProgress).to.deep.equal([])
            expect(as.backlogWork).to.deep.equal([])
        });
    });
    describe("availableSpace ", function () {
        it("Accessor, which returns a number that represents the available space/capacity in the auto service garage", function () {
            expect(as.availableSpace).to.be.equal(30)
        });
    });
    describe("signupForReview", function () {
        it("if there is an available space in the garage pass correct", function () {
            let obj = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'number': 0 };
            let count1 = 0;
            let count2 = 0;
            for (let i = 1; i <= 9; i++) {
                let clientName = "Peter" + i;
                let plateNumber = "CA128" + i + "CA";
                obj.number = i;
                let carInfo = obj;
                let currObj = { clientName, plateNumber, carInfo }
                as.signUpForReview(clientName, plateNumber, carInfo)
                expect(as.availableSpace).to.be.equal(as.garageCapacity - i)
            }
        });
        it("if there is an available space in the garage, the current client is registered in the workInProgress array. Otherwise is registered in the backlogWork array", function () {
            let ass = new AutoService(5);
            let obj = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'number': 0 };
            let count1 = 0;
            let count2 = 0;
            for (let i = 1; i <= 9; i++) {
                let clientName = "Peter" + i;
                let plateNumber = "CA128" + i + "CA";
                obj.number = i;
                let carInfo = obj;
                let currObj = { clientName, plateNumber, carInfo }
                ass.signUpForReview(clientName, plateNumber, carInfo)
                if (ass.garageCapacity >= i) {
                    count1++;
                    expect(ass.availableSpace).to.be.equal(ass.garageCapacity - i)
                    expect(ass.workInProgress.length).to.be.equal(count1)
                }
                else {
                    count2++;
                    expect(ass.availableSpace).to.be.equal(0)
                    expect(ass.backlogWork.length).to.be.equal(count2)
                }
            }
        });
    });
    describe("carInfo ", function () {
        it("Checks if the given information exists in workInProgress or backlogWork array and returns the client information object", function () {
            let obj = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'number': 0 };
            let count1 = 0;
            let count2 = 0;
            for (let i = 1; i <= 9; i++) {
                let clientName = "Peter" + i;
                let plateNumber = "CA128" + i + "CA";
                obj.number = i;
                let carInfo = obj;
                let currObj = { clientName, plateNumber, carInfo }
                as.signUpForReview(clientName, plateNumber, carInfo)
                //expect(as.availableSpace).to.be.equal(as.garageCapacity - i)
            }
            let result = {
                plateNumber: 'CA1281CA',
                clientName: 'Peter1',
                carInfo:
                {
                    engine: 'MFRGG23',
                    transmission: 'FF4418ZZ',
                    doors: 'broken',
                    number: 9
                }
            };
            let name = "Peter1";
            let number = "CA1281CA";
            expect(as.carInfo(number, name)).to.deep.equal(result);
            expect(as.carInfo("CA1280CA", "Peter0")).to.deep.equal("There is no car with platenumber CA1280CA and owner Peter0.");
            //console.log(as.carInfo(number, name))
            //There is no car with platenumber Peter1 and owner CA1281CA.
        });
        it("Checks if the given information exists in workInProgress or backlogWork array and returns message", function () {
            let result = "There is no car with platenumber CA1281CA and owner Peter1.";
            let name = "Peter1";
            let number = "CA1281CA";
            expect(as.carInfo(number, name)).to.be.equal(result);
        });
        it("workInProgress/backlogWork", function () {
            let ass = new AutoService(5);
            let obj = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'number': 0 };
            let count1 = 0;
            let count2 = 0;
            for (let i = 1; i <= 9; i++) {
                let clientName = "Peter" + i;
                let plateNumber = "CA128" + i + "CA";
                obj.number = i;
                let carInfo = obj;
                let currObj = { clientName, plateNumber, carInfo }
                ass.signUpForReview(clientName, plateNumber, carInfo)
                if (ass.garageCapacity >= i) {
                    count1++;
                    // expect(ass.availableSpace).to.be.equal(ass.garageCapacity - i)
                    // expect(ass.workInProgress.length).to.be.equal(count1)
                }
                else {
                    count2++;
                    // expect(ass.availableSpace).to.be.equal(0)
                    // expect(ass.backlogWork.length).to.be.equal(count2)
                }
            }
            let name1 = "Peter1";
            let number1 = "CA1281CA";
            let name9 = "Peter9";
            let number9 = "CA1289CA";
            let result1 = {
                plateNumber: 'CA1281CA',
                clientName: 'Peter1',
                carInfo:
                {
                    engine: 'MFRGG23',
                    transmission: 'FF4418ZZ',
                    doors: 'broken',
                    number: 9
                }
            };
            let result9 = {
                plateNumber: 'CA1289CA',
                clientName: 'Peter9',
                carInfo:
                {
                    engine: 'MFRGG23',
                    transmission: 'FF4418ZZ',
                    doors: 'broken',
                    number: 9
                }
            };
            // console.log(ass.carInfo(number1, name1))
            // console.log(ass.carInfo(number9, name9))
            expect(ass.carInfo(number1, name1)).to.deep.equal(result1);
            expect(ass.carInfo(number9, name9)).to.deep.equal(result9);
        });

    });

    describe("repairCar ", function () {
        it("if there are no cars return message", function () {

            //No clients, we are just chilling...
            expect(as.repairCar()).to.be.equal("No clients, we are just chilling...")
        });
        it("if there are no one return message", function () {
            let clientName = "Peter";
            let plateNumber = "CA1281CA";

            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'number': 0 };
            let currObj = { clientName, plateNumber, carInfo }
            as.signUpForReview(clientName, plateNumber, carInfo)
            expect(as.repairCar()).to.be.equal("Your doors were repaired.")
        });
        it("if there are no broken parts return message", function () {
            let clientName = "Peter";
            let plateNumber = "CA1281CA";
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'number': 0 };
            let currObj = { clientName, plateNumber, carInfo }
            as.signUpForReview(clientName, plateNumber, carInfo)
            expect(as.repairCar()).to.be.equal("Your car was fine, nothing was repaired.")
        });

    });
});