function solve(inputArr) {
    let firstRow = inputArr.shift();
    let firstRowArr = firstRow.split('|').filter(x => x !== "");
    let prop1 = firstRowArr[0].trim();
    let prop2 = firstRowArr[1].trim();
    let prop3 = firstRowArr[2].trim();

    let resultArr = [];
    inputArr.forEach(row => {
        let currArr = row.split('|').filter(x => x !== '');
        let currObj = {};
        currObj[prop1] = currArr[0].trim();
        currObj[prop2] = Number(currArr[1].trim());
        currObj[prop3] = Number(currArr[2].trim());
        resultArr.push(currObj);
    });

    let result = JSON.stringify(resultArr);
    console.log(result)
};
solve(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']
);