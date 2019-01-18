function solve(arr1, arr2, arr3) {
    let maxArr = [];
    let minArr1 = [];
    let minArr2 = [];
    let outputArr = [];
    let sumOfElem = 0;
    let average = 0;
    let median = 0;

    if (arr1.length >= arr2.length && arr1.length >= arr3.length) {
        maxArr = arr1;
        minArr1 = arr2;
        minArr2 = arr3;
    } else if (arr2.length >= arr1.length && arr2.length >= arr3.length) {
        maxArr = arr2;
        minArr1 = arr1;
        minArr2 = arr3;
    } else if (arr3.length >= arr2.length && arr3.length >= arr2.length) {
        maxArr = arr3;
        minArr1 = arr2;
        minArr2 = arr1;
    }
    maxArr.forEach(element => {
        if (minArr1.includes(element) && minArr2.includes(element)) {
            outputArr.push(element);
            sumOfElem += element;
        }
    });
    average = sumOfElem / outputArr.length;
    outputArr = outputArr.sort(function (a, b) { return a - b });
    if (outputArr.length % 2 == 0) {
        median = (outputArr[outputArr.length / 2] + outputArr[(outputArr.length / 2 - 1)]) / 2;
    } else {
        median = outputArr[(outputArr.length - 1) / 2]
    };
    let output = outputArr.join(', ');
    console.log(`The common elements are ${output}.`);
    console.log(`Average: ${average}.`);
    console.log(`Median: ${median}.`);
};
solve([1, 2, 3, 4, 5],
    [3, 2, 1, 5, 8],
    [2, 5, 3, 1, 16]
);