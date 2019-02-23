function solve(inputArr) {
    let carBuilder = (function carBuilder() {
        let cars = {};
        return {
            create: name => cars[name] = {},
            inherits: (child, parent) => Object.setPrototypeOf(cars[child], cars[parent]),
            set: (name, key, value) => cars[name][key] = value,
            print: name => {
                let result = [];
                for (const key in cars[name]) {
                    result.push(`${key}:${cars[name][key]}`)
                }
                return console.log(result.join(', '));
            }
        };
    })();

    //let carBuilder = buildCarBuilder();
    for (const line of inputArr) {
        let lineArr = line.split(' ');
        let currCommand = lineArr[0];
        //let [currCommand, ...args] = line.split('')
        //rest operator dava array
        if (currCommand == "create") {
            let newCarName = lineArr[1];
            carBuilder.create(newCarName)
            if (lineArr.length > 2) {
                carBuilder.inherits(lineArr[1], lineArr[3])
            }
        } else if (currCommand == "set") {
            carBuilder[currCommand](lineArr[1], lineArr[2], lineArr[3])
        } else if (currCommand == "print") {
            carBuilder[currCommand](lineArr[1])
        }
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);