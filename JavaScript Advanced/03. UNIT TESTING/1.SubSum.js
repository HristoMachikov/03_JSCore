
function subsum(inputArr, startIndex, endIndex) {
    if (!Array.isArray(inputArr) || !inputArr.every(x => Number(x))) {
        return NaN;
    }
    if (startIndex < 0) {
        startIndex = 0;
    }
    let lastIndex = inputArr.length - 1
    if (endIndex > lastIndex) {
        endIndex = lastIndex;
    }
    if (inputArr.length - 1 < 0) {
        return 0;
    }
    let subArr = inputArr.slice(startIndex, endIndex + 1)
    return subArr.reduce((acc, x) => acc + x)
};

module.exports = subsum;
console.log(subsum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subsum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(subsum([10, 'twenty', 30, 40], 0, 2));
console.log(subsum([], 1, 2));
console.log(subsum('text', 0, 2));
