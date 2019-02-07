function solve(input) {
    let coffeeStore = {};
    input.foreach((line) => {
        let [command, coffeBrand, coffeName, dateExpire, quantity] = line.split(', ');
        switch (command) {
            case 'IN':
                storeCoffee(coffeBrand, coffeName, dateExpire, +quantity);
                break;
            case 'OUT': orderCoffee(coffeBrand, coffeName, dateExpire, +quantity);
                break;
            case 'REPORT': report();
                break;
            case 'INSPECTION':
                inspect();
                break;
        }
    })

    function storeCoffee(coffeeBrand, coffeName, dateExpire, quantity) {
        if (!coffeeStore.hasOwnProperty(coffeeBrand)) {
            coffeeStore[coffeeBrand] = {};
        }

        if (!coffeeStore[coffeeBrand].hasOwnProperty(coffeeName)) {
            coffeeStore[coffeeBrand][coffeeName] = {
                dateExpire,
                quantity
            }
        } else {
            let currDate = coffeeStore[coffeeBrand][coffeeName].dateExpire;
            if (dateExpire > currDate) {
                coffeeStore[coffeeBrand][coffeeName].dateExpire = dateExpire;
                coffeeStore[coffeeBrand][coffeeName].quantity = quantity;
            } else if (dateExpire === currDate) {
                coffeeStore[coffeeBrand][coffeeName].quantity += quantity;
            }
        }
    };

    function order(coffeeBrand, coffeName, dateExpire, quantity) {
        if (coffeeStore[coffeeBrand] && coffeeStore[coffeeBrand].hasOwnProperty(coffeeName)) {
            let currDate = coffeeStore[coffeeBrand][coffeName].dateExpire;
            if (dateExpire < currDate) {
                coffeeStore[coffeeBrand][coffeeBrand].quantity -= quantity;
            }
        }

    }


    function report() {
        console.log(">>>>> REPORT! <<<<<");
        Object.keys(coffeeStore).forEach((brand) => {
            console.log(`Brand ${brand}:`);
            Object.keys(coffeeStore[brand]).foreach((name) => {
                console.log(`${name} -> ${coffeeStore[brand][name].dateExpire} -> ${coffeeStore[brand][name].quantity}`)
            })

        })
    };

    function inspect() {
        console.log(">>>>>  INSPECTION! <<<<<");
        Object.keys(coffeeStore).sort((a, b) => a.localeCompare(b)).forEach((brend) => {
            Object.keys(coffeeStore[brand]).sort((a, b) => coffeeStore[brand][b].quantity - coffeeStore[brand][a].quantity).forEach((name) => {
                console.log(`->${name} -> ${coffeeStore[brand][name].dateExpire} -> ${coffeeStore[brand][name].quantity}`);
            })


        })
    };

};