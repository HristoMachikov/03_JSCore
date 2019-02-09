function solve(inputArr) {
    let obj = {};

    inputArr.forEach(element => {
        let currTownInfo = element.split(" | ");
        let currTown = currTownInfo[0].trim();
        let currProduct = currTownInfo[1].trim();
        let currProductPrice = Number(currTownInfo[2].trim());
        if (!obj.hasOwnProperty(currProduct)) {
            obj[currProduct] = {};
            obj[currProduct][currTown] = currProductPrice;
        } else {
            if (!obj[currProduct].hasOwnProperty(currTown)) {
                obj[currProduct][currTown] = currProductPrice;

            } else {
                obj[currProduct][currTown] = currProductPrice;
            }
        };
    });

    Object.keys(obj).forEach((key) => {
        let sortedObjArr = Object.keys(obj[key]).sort((a, b) => obj[key][a] - obj[key][b]);
        let firstProp = sortedObjArr[0];
        console.log(`${key} -> ${obj[key][firstProp]} (${firstProp})`);
    });
};
solve(["Sample Town | Sample Product | 1000"
    , "Sample Town | Orange | 2"
    , "Sample Town | Peach | 1"
    , "Sofia | Orange | 3"
    , " Sofia | Peach | 2"
    , "New York | Sample Product | 1000.1"
    , "New York | Burger | 10"]);