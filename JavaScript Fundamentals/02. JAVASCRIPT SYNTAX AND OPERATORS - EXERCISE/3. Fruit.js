function solve(fruit, weight, price){
    let totalPrice = (+price)*(+weight)/1000;
    let weightInKilo = (+weight)/1000;

    console.log(`I need ${totalPrice.toFixed(2)} leva to buy ${weightInKilo.toFixed(2)} kilograms ${fruit}.`)

};
solve('apple', 1563, 2.35);
