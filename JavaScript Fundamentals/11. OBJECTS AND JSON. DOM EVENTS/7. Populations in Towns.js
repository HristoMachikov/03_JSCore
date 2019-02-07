function solve(inputArr) {
    let obj = {};

    inputArr.forEach(function (element) {
        let currArr = element.split('<->');
        let currKey = currArr[0].trim();
        let currValue = Number(currArr[1].trim());
        if (!obj.hasOwnProperty(currKey)) {
            obj[currKey] = currValue;
        } else {
            obj[currKey] += currValue;
        }

    });
    Object.keys(obj).forEach(key => {
        console.log(`${key} : ${obj[key]}`)
    })
};
solve(["Istanbul <-> 100000", "Honk Kong <-> 2100004"
, "Jerusalem <-> 2352344", "Mexico City <-> 23401925", "Istanbul <-> 1000"]);