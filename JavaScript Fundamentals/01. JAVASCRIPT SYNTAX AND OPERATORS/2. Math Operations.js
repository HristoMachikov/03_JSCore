function solve (firstOperand, secondOperand, operator){
let firstNum = Number(firstOperand);
let secondNum = Number(secondOperand);
let currentOperator = operator;
switch (currentOperator){
    case "+": console.log(firstNum + secondNum);break;
    case "-": console.log(firstNum - secondNum);break;
    case "*": console.log(firstNum * secondNum);break;
    case "/": console.log(firstNum / secondNum);break;
    case "%": console.log(firstNum % secondNum);break;
    case "**": console.log(firstNum ** secondNum);break;
    default: console.log("Error!");break;
}
};
solve("1", "4", "+");