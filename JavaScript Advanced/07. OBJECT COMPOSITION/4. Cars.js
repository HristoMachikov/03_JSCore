function solve() {
    let buildCarBuilder = function () {
        let cars = {};
        return {
            create: name => cars[name] = {},
            inherites: (child, parent) => Object.setPrototypeOf(cars[child], car[parent]),
            set: (name, key, value) => cars[name][key] = value,
            print: name => {
                let result = [];
                for (const key in cars[name]) {
                    result.push(`${key}:${}`)
                }
                return
            }

        }
    }

    let carBuilder = buildCarBuilder();
    for (const line of input) {
        let [command, ...args] = line.split('')
        if (command == "create") {
            carBuilder.create(args[0])
            if (args[2] == "inherits") {
                carBuilder.inherites(args[0], args[2])
            }
        } else {
            carBuilder[command](args[0], args[1], args[2])

        }

        ///rest operator връща array
    }
}