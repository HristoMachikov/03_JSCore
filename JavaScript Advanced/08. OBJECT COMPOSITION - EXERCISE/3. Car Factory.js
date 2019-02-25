function solve(inputObj) {
    let objPower = {
        "Small engine": { power: 90, volume: 1800 },
        "Normal engine": { power: 120, volume: 2400 },
        " Monster engine": { power: 200, volume: 3500 }
    }
    let currModel = inputObj.model;
    let currPower = function () {
        let minPower = inputObj.power;
        for (let key in objPower) {
            if (objPower[key].power >= minPower) {
                return objPower[key];
            }
        }
    };
    let currColor = inputObj.color;
    let currCarriage = function () {
        if (inputObj.carriage == "coupe") {
            return { 'type': 'coupe', 'color': currColor }
        } else if (inputObj.carriage == "hatchback") {
            return { 'type': 'hatchback', 'color': currColor }
        }
    }

    let currWheelsize = function () {
        let arr = [];
        let currDiam = inputObj.wheelsize;
        if (currDiam % 2 === 0) {
            currDiam -= 1;
        }
        for (let i = 0; i < 4; i++) {
            arr.push(currDiam);
        }
        return arr;
    };

    return {
        model: currModel,
        engine: currPower(),
        carriage: currCarriage(),
        wheels: currWheelsize()
    }
}

console.log(solve({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheels: 17
}
))