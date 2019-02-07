function solve(inputArr) {
    let obj = {};
    for (let i = 0; i < inputArr.length; i += 2) {
        let currKey = inputArr[i];
        let currValue = Number(inputArr[i + 1]);
        if (!obj.hasOwnProperty(currKey)) {
            obj[currKey] = currValue;
        } else {
            obj[currKey] += currValue;
        }
    };
    console.log(JSON.stringify(obj));
};

solve(["Sofia", "20", "Varna", "3", "sofia", "5", "varna", "4"]);