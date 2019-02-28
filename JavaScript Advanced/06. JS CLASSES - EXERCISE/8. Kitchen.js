class Kitchen {

    constructor(budget) {
        this.budget = budget
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        for (const iterator of products) {
            let currName = iterator.split(' ')[0];
            let currQuantity = iterator.split(' ')[1];
            let currPrice = Number(iterator.split(' ')[2]);
            let currAction = "";
            if (currPrice <= this.budget) {
                this.budget -= currPrice;
                if (!this.productsInStock.hasOwnProperty(currName)) {
                    this.productsInStock[currName] = 0
                    this.productsInStock[currName] += Number(currQuantity);
                }
                currAction = `Successfully loaded ${currQuantity} ${currName}`;
            } else {
                currAction = `There was not enough money to load ${currQuantity} ${currName}`;
            }
            this.actionsHistory.push(currAction);
        }
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu.hasOwnProperty(meal)) {
            this.menu[meal] = {
                products: neededProducts,
                price: price
            }

            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
        } else {
            return `The ${meal} is already in our menu, try something different.`;
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length > 0) {
            let output = [];
            for (const key in this.menu) {
                output.push(`${key} - $ ${this.menu[key].price}`)
            }
            return output.join('\n') + '\n';
        } else {
            return `Our menu is not ready yet, please come later...`;
        }
    }

    makeTheOrder(meal) {
        if (this.menu.hasOwnProperty(meal)) {
            for (const ingredient of this.menu[meal].products) {
                let currIngredient = ingredient.trim().split(' ');
                let ingredientQuantity = Number(currIngredient.pop());
                let ingredientName = currIngredient.join(' ');


                if (this.productsInStock.hasOwnProperty(ingredientName) &&
                    this.productsInStock[ingredientName] >= ingredientQuantity) {
                } else {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;

                }
            }
            for (const ingredient of this.menu[meal].products) {
                let currIngredient = ingredient.trim().split(' ');
                let ingredientQuantity = Number(currIngredient.pop());
                let ingredientName = currIngredient.join(' ');
                this.productsInStock[ingredientName] -= ingredientQuantity;
            }
            this.budget += Number(this.menu[meal].price);
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;

        } else {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }
    }
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
for (const key in kitchen.menu) {
    console.log(key)
    console.log(kitchen.menu[key])
}
kitchen.makeTheOrder('frozenYogurt')
kitchen.makeTheOrder('Pizza')
kitchen.makeTheOrder('frozenYogurt')
kitchen.makeTheOrder('frozenYogurt')
kitchen.makeTheOrder('frozenYogurt')
kitchen.makeTheOrder('frozenYogurt')
kitchen.makeTheOrder('frozenYogurt')


console.log(kitchen.showTheMenu());
console.log(kitchen.budget);