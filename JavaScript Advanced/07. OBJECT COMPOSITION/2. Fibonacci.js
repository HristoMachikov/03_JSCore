let fib = (function fibonacci() {
    let sum = 0;
    let firstNum = 0;
    let secondNum = 1;
    return function () {
        sum = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = sum;
        return firstNum;
    }
})();

console.log(fib())
console.log(fib())
console.log(fib())
console.log(fib())
console.log(fib())



