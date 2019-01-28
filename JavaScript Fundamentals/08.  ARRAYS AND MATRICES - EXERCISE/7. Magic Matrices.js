function solve(arr) {
    let check = true;
    let sumRow = 0;
    let counter = 2;
    let sumCol = 0;
    for (let row = 0; row < arr.length; row++) {
        let currSumRow = 0;
        for (let nRow of nRowArr) {
            currSumRow += nRow;
        }
        console.log(arr[row[i]])
        sumCol = arr[row[i] + counter] + arr[row[i] + counter - 1] + arr[row[i] + counter - 2];
        if (sumRow === 0) {
            sumRow = currSumRow;
        } else if (sumRow !== currSumRow || sumCol !=currSumRow) {
            check = false;
        }
        //currSumRow = 0;
        counter -= 1;
    }

    // for (let col = 0; col < arr.length; col++) {
    //     let currSumRow = 0;
    //     for (let nRow of nRowArr) {
    //         currSumRow += nRow;
    //     }
    //     sumCol = arr[row[i]];
    //     if (sumRow === 0) {
    //         sumRow = currSumRow;
    //     }
    // }
    console.log(check);

};
solve([[4, 5, 6],
[6, 5, 4],
[5, 5, 5]]);