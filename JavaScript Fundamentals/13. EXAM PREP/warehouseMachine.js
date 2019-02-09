function solve(input) {
    let coffeeStore = {};
    input.forEach((line) => {
        let [command, coffeBrand, coffeName, dateExpire, quantity] = line.split(', ');
        switch (command) {
            case 'IN': storeCoffee(coffeBrand, coffeName, dateExpire, +quantity); break;
            case 'OUT': orderCoffee(coffeBrand, coffeName, dateExpire, +quantity); break;
            case 'REPORT': report(); break;
            case 'INSPECTION': inspect(); break;
        }
    });

    function storeCoffee(coffeeBrand, coffeeName, dateExpire, quantity) {
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

    function orderCoffee(coffeeBrand, coffeeName, dateExpire, quantity) {
        if (coffeeStore[coffeeBrand] && coffeeStore[coffeeBrand].hasOwnProperty(coffeeName)) {
            let currDate = coffeeStore[coffeeBrand][coffeeName].dateExpire;
            if (dateExpire < currDate) {
                coffeeStore[coffeeBrand][coffeeName].quantity -= quantity;
            }
        }
    };

    function report() {
        console.log(">>>>> REPORT! <<<<<");
        Object.keys(coffeeStore).forEach((brand) => {
            console.log(`Brand: ${brand}:`);
            Object.keys(coffeeStore[brand]).forEach((name) => {
                console.log(`-> ${name} -> ${coffeeStore[brand][name].dateExpire} -> ${coffeeStore[brand][name].quantity}.`)
            })
        })
    };

    function inspect() {
        console.log(">>>>> INSPECTION! <<<<<");
        Object.keys(coffeeStore).sort((a, b) => a.localeCompare(b)).forEach((brand) => {
            console.log(`Brand: ${brand}:`);
            Object.keys(coffeeStore[brand]).sort((a, b) => coffeeStore[brand][b].quantity - coffeeStore[brand][a].quantity).forEach((name) => {
                console.log(`-> ${name} -> ${coffeeStore[brand][name].dateExpire} -> ${coffeeStore[brand][name].quantity}.`);
            })
        })
    };

};
solve(["IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
    "IN, Folgers, Black Silk, 2023-03-01, 14",
    "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
    "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
    "IN, Folgers, Black Silk, 2022-01-01, 10",
    "IN, Lavazza, Intenso, 2022-07-19, 20",
    "OUT, Dallmayr, Espresso, 2022-07-19, 5",
    "OUT, Dallmayr, Crema, 2022-07-19, 5",
    "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
    "REPORT",
    "INSPECTION"]);
