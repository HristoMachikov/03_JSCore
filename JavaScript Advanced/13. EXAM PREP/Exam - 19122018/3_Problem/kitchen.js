class Kitchen {
    constructor(budget) {
        this.budget = budget,
            this.actionsHistory = [],
            this.productsInStock = {},
            this.menu = {}
    }
    loadProducts(incommingProducts) {
        incommingProducts.forEach((product) => {
            let [
                productName,
                productQuantity,
                productPrice
            ] = product.split(' ');
            let currAction = "";
            if (+productPrice <= this.budget) {
                if (!this.productsInStock.hasOwnProperty(productName)) {
                    this.productsInStock[productName] = 0;
                }
                this.productsInStock[productName] += +productQuantity;
                this.budget -= +productPrice;
                currAction = `Successfully loaded ${productQuantity} ${productName}`;
            } else {
                currAction = `There was not enough money to load ${productQuantity} ${productName}`;
            }
            this.actionsHistory.push(currAction);
        });
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        let output = "";
        if (!this.menu.hasOwnProperty(meal)) {
            this.menu[meal] = { neededProducts, price }
            output = `Great idea! Now with the ${meal} we have ${(Object.keys(this.menu)).length} meals in the menu, other ideas?`;
        } else {
            output = `The ${meal} is already in the our menu, try something different.`;
        }
        return output;
    }

    showTheMenu() {
        let result = "";
        if (Object.keys(this.menu).length) {
            Object.keys(this.menu).forEach(meal => {
                result += `${meal} - $ ${this.menu[meal].price}\n`;
            })
        } else {
            result = "Our menu is not ready yet, please come later...";
        }

        return result;
    }

    makeTheOrder(meal) {
        let output = "";
        if (!this.menu.hasOwnProperty(meal)) {
            output = `There is not ${meal} yet in our menu, do you want to order something else?`;
        } else {
            //this.menu[meal].neededProducts.forEach((product) => {
            for (const product of this.menu[meal].neededProducts) {
                //let [currProductName, currProductQuantity] = product.split(' ');

                let currIngredient = product.trim().split(' ');
                let currProductQuantity = Number(currIngredient.pop());
                let currProductName = currIngredient.join(' ');


                if (this.productsInStock.hasOwnProperty(currProductName) &&
                    +this.productsInStock[currProductName] >= currProductQuantity) {

                } else {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                }
            }
            this.menu[meal].neededProducts.forEach((product) => {
                //let [currProductName, currProductQuantity] = product.split(' ');

                let currIngredient = product.trim().split(' ');
                let currProductQuantity = Number(currIngredient.pop());
                let currProductName = currIngredient.join(' ');

                this.productsInStock[currProductName] -= currProductQuantity;
        })
            this.budget += +this.menu[meal].price;
            output = `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}."`;
        }
        return output;
    }

}


let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));

console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder("Pizza"));
console.log(kitchen.makeTheOrder("Spageti"));