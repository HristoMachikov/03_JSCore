function aggregates(inputArr) {
    console.log("Sum = " + inputArr.reduce((acc, curr) => acc + curr, 0));
    console.log("Min = " + inputArr.reduce((acc, curr) => Math.min(acc, curr),Number.MAX_SAFE_INTEGER));
    console.log("Max = " + inputArr.reduce((acc, curr) => Math.max(acc, curr),Number.MIN_SAFE_INTEGER));
    console.log("Product = " + inputArr.reduce((acc, curr) => acc * curr, 1));
    console.log("Join = " + inputArr.reduce((acc, curr) => acc + curr, ""));
    // console.log("reverscArr = [" + inputArr.reduce((acc, curr, idx, arr) => {
    //     acc[idx] = arr[arr.length - 1 - idx];
    //     return acc;
    // }, []) + "]");
};

aggregates([2, -3, 10, 5]);