function solve(arr) {



    let matrix = [];
    for (let row = 0; row < arr.length; row++) {
        matrix[row] = []
        let tokens = arr[row].split(' ').map(Number)
        for (let col = 0; col < tokens.length; col++) {
            matrix[row][col] = tokens[col];
        }
    }
    let leftDiagSum = 0;
    let rigthDiagSum = 0;

////////
    if (leftDiagSum === rigthDiagSum) {
///////////
    };

    for (let row of matrix) {
        console.log(row.join(" "));
    }

};
solve(5, 5);