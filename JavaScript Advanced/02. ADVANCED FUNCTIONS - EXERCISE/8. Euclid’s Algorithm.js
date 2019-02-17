function solve(num1, num2) {
    let maxNumb = Math.max(num1, num2);
    let minNumb = Math.min(num1, num2);
    let commonDivisor = 1;

    for (let i = 1; i <= minNumb; i++) {
        if (minNumb % i == 0 && maxNumb % i == 0) {
            commonDivisor = i;
        }
    };
    return commonDivisor;
}
console.log(solve(252, 105));

//Euclid’s Algorithm

function gcd(first, second) {
    if (second === 0) {
        return first;
    }
    return gcd(second, first % second);
}

console.log(gcd(105, 252));