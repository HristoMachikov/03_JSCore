let manager = (function solution() {
    const quantityPlace = {
        "protein": 0,
        "carbohydrate": 0,
        "fat": 0,
        "flavour": 0
    };
    const recipes = function () {
        return {
            "apple": { "carbohydrate": 1, "flavour": 2 },
            "coke": { "carbohydrate": 10, "flavour": 20 },
            "burger": { "carbohydrate": 5, "fat": 7, "flavour": 3 },
            "omelet": { "protein": 5, "fat": 1, "flavour": 1 },
            "cheverme": { "protein": 10, "carbohydrate": 10, "fat": 10, "flavour": 10 }
        };
    };

    return function (input) {
        let result = "";
        let inputArr = input.split(' ')
        let currCommand = inputArr.shift();

        if (currCommand === "restock") {
            let [currIngredient, currQuantity] = inputArr;
            if (quantityPlace.hasOwnProperty(currIngredient)) {
                quantityPlace[currIngredient] += Number(currQuantity);
                result = "Success";
            }
        } else if (currCommand === "report") {
            result = Object.entries(quantityPlace)
                .map((kvp) => `${kvp[0]}=${kvp[1]}`).join(' ');
            //result = `protein=${quantityPlace.protein} carbohydrate=${quantityPlace.carbohydrate} fat=${quantityPlace.fat} flavour=${quantityPlace.flavour}`;
        } else if (currCommand === "prepare") {
            let [currOrder, currNumb] = inputArr;
            let order = recipes()[currOrder];
            for (const key in order) {
                let totalIntrQuan = order[key] * Number(currNumb);
                if (totalIntrQuan > quantityPlace[key]) {
                    return `Error: not enough ${key} in stock`;
                }
            }
            for (const key in order) {
                let totalIntrQuan = order[key] * Number(currNumb);
                quantityPlace[key] -= totalIntrQuan;
            }
            result = "Success";
        }
        return result;
    }
})()

console.log(manager("prepare cheverme 1"));
console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));
