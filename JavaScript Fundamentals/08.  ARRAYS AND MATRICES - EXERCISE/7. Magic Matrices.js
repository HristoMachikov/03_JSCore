function solve(arr) {
    let check = true;
    let sumRow = 0;

    for (let row = 0; row < arr.length; row++) {
        let currSumRow = 0;
        for (let col = 0; col < arr[row].length; col++) {
            currSumRow += arr[row][col]
        }
        if (sumRow === 0) {
            sumRow = currSumRow;
        } else if (sumRow !== currSumRow) {
            check = false;
            break;
        }
    }

    for (let col = 0; col < arr[0].length; col++) {
        let sumCol = 0;
        for (let row = 0; row < arr.length; row++) {
            sumCol += arr[row][col];
        }
        if (sumCol !== sumRow) {
            check = false;
            break;
        }
    }
    console.log(check);
};
solve([[4, 5, 6],
 [6, 5, 4],
 [5, 5, 5]]
);