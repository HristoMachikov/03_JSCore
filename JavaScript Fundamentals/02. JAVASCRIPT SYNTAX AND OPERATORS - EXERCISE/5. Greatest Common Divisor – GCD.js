function solve (num1, num2){
let maxNumb = Math.max(num1, num2);
let minNumb = Math.min(num1, num2);
let commonDivisor = 1;

for (let i = 1; i <= minNumb; i++ ){
    if (minNumb%i==0 && maxNumb%i==0){
        commonDivisor = i;
    }
};
console.log(commonDivisor);
};
solve(2154, 458);