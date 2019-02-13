function solve(inputArr, command) {
    let headerRow = inputArr.shift();
    let currComand = command.split(" ")[0];
    let currHeader = command.split(" ")[1];
    let headerIndex = -1;

    if (headerRow.includes(currHeader)) {
        headerIndex = headerRow.indexOf(currHeader)
    }
    let result;
    if (headerIndex >= 0) {
        switch (currComand) {
            case "hide":
                let resultArr = [];
                headerRow.forEach(function (element) {
                    if (element !== currHeader) {
                        resultArr.push(element);
                    }
                });
                console.log(resultArr.join(' | '));
                inputArr.forEach((elem) => {
                    elem.splice(headerIndex, 1)
                    console.log(elem.join(' | '));
                });
                break;

            case "sort":
                console.log(headerRow.join(' | '))
                inputArr.sort((a, b) => a[headerIndex].localeCompare(b[headerIndex]))
               
                inputArr.forEach(function(element) {
                     console.log(element.join(' | '));
                });
                break;

            case "filter":
                console.log(headerRow.join(' | '))
                let filtetValue = command.split(" ")[2];
                inputArr.forEach(function (element) {
                    if (element[headerIndex] === filtetValue) {
                        console.log(element.join(' | '))
                    }
                });
                break;
            default: break;
        }
    }
};
solve([['name', 'age', 'grade'],
['Peter', '25', '5.00'],
['George', '34', '6.00'],
['Marry', '28', '5.49']],
'sort name'
);