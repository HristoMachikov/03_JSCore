function solve(data) {

    let outputArr = [];
    data.forEach(element => {
        let rectObj = {
            width: element[0],
            height: element[1],
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (otherRect) {
                let currArea = this.width * this.height;
                let otherArea = otherRect.width * otherRect.height;
                if (currArea > otherArea) {
                    return -1;
                } else if (currArea < otherArea) {
                    return 1;
                } else if (currArea === otherArea) {
                    if (this.width > otherRect.width) {
                        return -1;
                    } else if (this.width < otherRect.width) {
                        return 1;
                    }
                    return 0;
                }
            }
        };
        outputArr.push(rectObj);
    });

    function sortDescendingTwoCrit(a, b) {
        if (a.area() < b.area()) {
            return 1;
        } else if (a.area() > b.area()) {
            return -1
        } else if (a.area() === b.area()) {
            if (a.width < b.width) {
                return 1;
            } else if (a.width > b.width) {
                return -1;
            }
            return 0;
        }
    }

    return outputArr.sort(sortDescendingTwoCrit);
}
let arr = [[1, 20], [20, 1], [5, 3], [5, 3]]
console.log(solve(arr));
console.log(solve(arr)[1].compareTo(solve(arr)[2]));