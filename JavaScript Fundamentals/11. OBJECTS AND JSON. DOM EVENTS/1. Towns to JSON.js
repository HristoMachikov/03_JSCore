function solve(inputArr){
    console.log(inputArr[0])
    let firstRow = inputArr.shift();
    let firstRowArr = firstRow.split('|').filter(x => x !== "");
    console.log(inputArr[0])
    console.log(firstRowArr[0].trim());

};
solve(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
);