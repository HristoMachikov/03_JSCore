function solve(inputArr) {
    let obj = {};
    inputArr.forEach(element => {
        let spliter = /[->:]+/g;
        let currTownInfo = element.split(spliter);
        let currTown = currTownInfo[0].trim();
        let currProduct = currTownInfo[1].trim();
        let currAmountOfSales = Number(currTownInfo[2].trim());
        let currPriceForOneUnit = Number(currTownInfo[3].trim());
        if (!obj.hasOwnProperty(currTown)) {
            obj[currTown] = {};
            obj[currTown][currProduct] = currAmountOfSales * currPriceForOneUnit;
        } else {
            if (!obj[currTown].hasOwnProperty(currProduct)) {
                obj[currTown][currProduct] = currAmountOfSales * currPriceForOneUnit;
            } else {
                obj[currTown].currProduct += currAmountOfSales * currPriceForOneUnit;
            }
        }
    });

    Object.keys(obj).forEach((key) => {
        console.log(`Town - ${key}`);
        Object.keys(obj[key]).forEach((product) => {
            console.log(`$$$${product} : ${obj[key][product]}`);
        });
    });
};
solve(["Sofia -> Laptops HP -> 200 : 2000"
    , "Sofia -> Raspberry -> 200000 : 1500"
    , "Sofia -> Audi Q7 -> 200 : 100000"
    , "Montana -> Portokals -> 200000 : 1"
    , " Montana -> Qgodas -> 20000 : 0.2"
    , "Montana -> Chereshas -> 1000 : 0.3"]);