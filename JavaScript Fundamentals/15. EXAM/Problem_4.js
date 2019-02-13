function solve(inputArr) {
    let obj = {};
    inputArr.forEach(function (element) {

        let currModel = element.model;
        let currNumber = element.regNumber;
        let currTown = element.town;
        let currPrice = +element.price;
        let count = 1;
        let curObj = {
            "regNumber": currNumber,
            "model": currModel,
            "price": currPrice,
            "countModel": count
        };

        if (!obj.hasOwnProperty(currTown)) {
            obj[currTown] = {
                "profit": currPrice,
                "vignNumb": +1,
                "cars": []
            };
            obj[currTown].cars.push(curObj);
        } else {
            //else if (!obj[currTown].cars.some(x => x.regNumber === currNumber)) {
            obj[currTown].cars.forEach(car => {
                if (car.model === currModel) {
                    count++;
                }
            });

            obj[currTown].profit += currPrice;
            obj[currTown].vignNumb += 1;
            curObj.countModel = count;
            obj[currTown].cars.push(curObj);

        }
    });

    let sortedResult = Object.keys(obj).sort(sortTreeCriterias)

    function sortTreeCriterias(a, b) {
        if (obj[b].profit > obj[a].profit) {
            return 1;
        } else if (obj[b].profit < obj[a].profit) {
            return -1;
        } else if (obj[a].profit == obj[b].profit) {
            if (obj[b].vignNumb > obj[a].vignNumb) {
                return 1;
            } else if (obj[b].vignNumb < obj[a].vignNumb) {
                return -1;
            } else if (obj[a].vignNumb == obj[b].vignNumb) {
                return a.localeCompare(b);
            }
        }
    }

    function sortTwoCriterias(a, b) {
        if (b.countModel > a.countModel) {
            return 1;
        } else if (b.countModel < a.countModel) {
            return -1;
        } else if (b.countModel == a.countModel) {
            if (b.price > a.price) {
                return 1;
            } else if (b.price < a.price) {
                return -1;
            } else if (b.price == a.price) {
                return 0;
            }
        }
    }

    console.log(`${sortedResult[0]} is most profitable - ${obj[sortedResult[0]].profit} BGN`)
    let carsArr = obj[sortedResult[0]].cars;

    let mostDrivenCar = obj[sortedResult[0]].cars.sort(sortTwoCriterias)[0].model;
    console.log(`Most driven model: ${mostDrivenCar}`)

    Object.keys(obj).sort((a, b) => a.localeCompare(b)).forEach(town => {
        let numbArr = [];
        obj[town].cars.sort((a, b) => a.regNumber.localeCompare(b.regNumber))
            .forEach(car => {
                if (car.model === mostDrivenCar) {
                    numbArr.push(car.regNumber);
                }
            })
        if (numbArr.length > 0) {
            console.log(`${town}: ${numbArr.join(', ')}`)
        }
    })
}

solve([{ model: 'BMW', regNumber: 'B1234SM', town: 'Varna', price: 2 },
{ model: 'BMW', regNumber: 'C5959CZ', town: 'Sofia', price: 8 },
{ model: 'Tesla', regNumber: 'NIKOLA', town: 'Burgas', price: 9 },
{ model: 'BMW', regNumber: 'A3423SM', town: 'Varna', price: 3 },
{ model: 'Lada', regNumber: 'SJSCA', town: 'Sofia', price: 3 }]
);