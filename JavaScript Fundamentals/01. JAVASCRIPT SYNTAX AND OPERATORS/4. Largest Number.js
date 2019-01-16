function solve(numOne, numTwo, numThree){
    let result;
    let num1 = +numOne;
    let num2 = +numTwo;
    let num3 = +numThree;
    if (num1 >= num2 && num1 >= num3){
        result = num1;
    }else if (num2 >= num3 && num2 > num1){
        result = num2;
    }else if (num3 > num1 && num3 > num2){
        result = num3;
    };
    console.log(`The largest number is ${result}.`);
};
solve("-1", "3", "3");