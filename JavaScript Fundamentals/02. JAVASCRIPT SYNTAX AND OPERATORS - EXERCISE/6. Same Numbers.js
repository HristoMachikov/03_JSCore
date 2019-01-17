function solve(input) {
    let result = true;
    let inputNum = input;
    let inputString = String(inputNum);
    let firstDigits = Number(inputString[0]);
    let sum = firstDigits;
    let count = 0;
    for (let i = 1; i < inputString.length; i++) {
        let chechedDigits = Number(inputString[i]);
        sum += chechedDigits;
        if (firstDigits == chechedDigits) {
            count++;
        };
    };
    if (count < inputString.length - 1) {
        result = false;
    }
    console.log(result);
    console.log(sum);
};
solve(11);