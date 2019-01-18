function solve(orderStrings) {
    let totalSum = 0;
    let coffeeMachine =
        {
            'coffee caffeine': 0.8,
            'coffee decaf': 0.9,
            'tea': 0.8
        };
    for (let i = 0; i < orderStrings.length; i++) {
        let currentOrder = orderStrings[i].split(', ');
        let avableMoney = currentOrder[0];
        let sugar = (currentOrder[currentOrder.length - 1] > 0);
        let currentDrink = currentOrder[1];
        let moneyForDrink = 0;
        if (currentDrink == 'coffee') {
            currentDrink = currentDrink + ` ${currentOrder[2]}`;
        };
        for (const key in coffeeMachine) {
            if (key === currentDrink) {
                moneyForDrink = Number(coffeeMachine[key]);
            }
        };
        let milkPrice = 0;
        if (currentOrder.includes('milk')) {
            milkPrice = +(moneyForDrink * 0.1).toFixed(1);
        };
        if (sugar) {
            moneyForDrink += 0.1;
        };
        moneyForDrink += milkPrice
        if (moneyForDrink <= avableMoney) {
            console.log(`You ordered ${currentOrder[1]}. Price: ${moneyForDrink.toFixed(2)}$ Change: ${(avableMoney - moneyForDrink).toFixed(2)}$`)
        } else {
            console.log(`Not enough money for ${currentOrder[1]}. Need ${(moneyForDrink - avableMoney).toFixed(2)}$ more.`);
            moneyForDrink = 0;
        }
        totalSum += moneyForDrink;
    };
    console.log(`Income Report: ${totalSum.toFixed(2)}$`)
};
solve(['8.00, coffee, decaf, 4',
    '1.00, tea, 2']
);