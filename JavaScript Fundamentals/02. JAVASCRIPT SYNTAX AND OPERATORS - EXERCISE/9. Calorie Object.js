function solve(inputArr) {
    let output = {};
    for (let i = 0; i < inputArr.length; i += 2) {
        let objKey = inputArr[i];
        let objValue = +inputArr[i + 1];
        output[objKey] = objValue;
    };
    console.log(output);
};
solve(['Potato', 93, 'Skyr', 63, 'Cucumber', 18, 'Milk', 42]);