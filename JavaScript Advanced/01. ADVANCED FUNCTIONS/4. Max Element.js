function maxElement(inputArr) {

    return inputArr.reduce((acc, elem) => Math.max(acc, elem), Number.MIN_SAFE_INTEGER);
}
maxElement([1, 44, 123, 33]);