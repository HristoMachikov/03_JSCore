function solve(inputArr) {
    let obj = {};
    let productArr = [];
    inputArr.forEach(element => {
        let currTownInfo = element.split(" | ");
        let currTown = currTownInfo[0].trim();
        let currProduct = currTownInfo[1].trim();
        let currProductPrice = Number(currTownInfo[2].trim());

        if (!obj.hasOwnProperty(currTown)) {
            obj[currTown] = {};
            obj[currTown][currProduct] = currProductPrice;
            productArr.push(currProduct);
        } else {
            if (!obj[currTown].hasOwnProperty(currProduct)) {
                obj[currTown][currProduct] = currProductPrice;
                productArr.push(currProduct);
            } else {
                obj[currTown][currProduct] = currProductPrice;
            }
        };
    });
console.log(productArr)
    productArr.forEach(product => {
        let lowestPrice = Number.MAX_VALUE;
        let currTown = "";
        Object.keys(obj).forEach((key) => {
            // console.log(`Town - ${key}`);
            //Object.keys(obj[key]).forEach((product) => {
                // console.log(key)
            if (Object.keys(obj[key]).hasOwnProperty(product)) {
                // console.log(obj[key]);
                // console.log(product);
                if (obj[key][product] < lowestPrice) {
                    lowestPrice = obj[key][product];
                    currTown = key;
                }

            }
            //console.log(`$$$${product} : ${obj[key][product]}`);
            //});
        });
  
            console.log(`${product} -> ${lowestPrice}} (${currTown})`);
        
    });

    // Object.keys(obj).forEach((key) => {
    //     console.log(`Town - ${key}`);
    //     Object.keys(obj[key]).forEach((product) => {
    //         console.log(`$$$${product} : ${obj[key][product]}`);
    //     });
    // });
};
solve(["Sample Town | Sample Product | 1000"
    , "Sample Town | Orange | 2"
    , "Sample Town | Peach | 1"
    , "Sofia | Orange | 3"
    , " Sofia | Peach | 2"
    , "New York | Sample Product | 1000.1"
    , "New York | Burger | 10"]);