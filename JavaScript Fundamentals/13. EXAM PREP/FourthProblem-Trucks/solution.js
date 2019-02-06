function solve() {
        let button = 










    // let buttons = document.getElementsByTagName('button');
    // let fieldSets = document.getElementsByTagName('fieldset');
    // let output = document.querySelector('textarea');

    // let obj = {
    //     'backupTireSets': []
    // };
    // buttons[0].addEventListener('click', addNewTruck);
    // buttons[1].addEventListener('click', addNewTireSet);
    // buttons[2].addEventListener('click', goToWork);
    // buttons[3].addEventListener('click', endOfShiftInfo);

    // function addNewTruck() {
    //     let plateNumber = document.getElementById("newTruckPlateNumber").value;
    //     let tires = document.getElementById('newTruckTiresCondition').value.split(' ').map(Number);

    //     if (!obj[plateNumber]) {
    //         obj[plateNumber] = {
    //             tires,
    //             "distance": 0
    //         }
    //         let currTruck = createElement('div', plateNumber, 'truck');
    //         let parentTruck = fieldSets[4].lastElementChild;
    //         parentTruck.appendChild(currTruck);
    //     }
    // }
    // function addNewTireSet() {
    //     let tires = document.getElementById('newTruckTiresCondition').value.split(' ').map(Number);
    //     obj.backupTireSets.push(tires);
    //     let currTireSet = createElement('div', tires.join(' '), 'tireSet');
    //     let parentTruck = fieldSets[3].lastElementChild;
    //     parentTruck.appendChild(currTireSet);
    // }

    // function goToWork() {
    //     let plateNumber = document.getElementById('workPlateNumber').value;
    //     let distance = Number(document.getElementById('distance').value);

    //     if (obj.hasOwnProperty(plateNumber)) {

    //         let results = areTiresGoodEnough(obj[plateNumber].tires, distance);
    //         if (results.finalResult) {
    //             obj[plateNumber].distance += distance;
    //             obj[plateNumber].tires = results.testedTires;
    //         } else if (obj.backupTireSets.length > 0) {
    //             let backupSet = obj.backupTireSets[0]

    //             let results = areTiresGoodEnough(backupSet, distance);

    //             if (results.finalResult) {
    //                 obj[plateNumber].distance += distance;
    //                 obj[plateNumber].tires = results.testedTires;
    //                 obj.backupTireSets.shift();
    //                 let trukHolder = fieldSet[3].lastElementChild;
    //                 let usedTires = document.querySelector('div.tireSet');
    //                 usedTires.remove()
    //             }
    //         }
    //     }
    // }
    // function areTiresGoodEnough() {
    //     let distance = distance / 1000;

    //     let result = {
    //         'testedTires': [],
    //         'finalResult': false
    //     };

    //     tires.forEach((tire) => {
    //         result.testedTires.push(tire - distance);
    //     });

    //     if (result.testedTires.evry(e => e >= 0)) {
    //         finalResult = true;
    //     }
    //     return finalResult;
    // }
    // function endOfShiftInfo() {
    //     Object.keys(obj).filter((plateNumber) => plateNumber !== "backupTireSets")
    //         .forEach((plate) => {
    //             obj.value += `Truck ${plate} has traveled ${obj[plate].distance}.`
    //         })
    // }

    // function createElement(type, text, className) {
    //     let element = document.createElement(type);
    //     element.textContent = text;
    //     element.classList.add("className");
    //     return element;
    // }
}