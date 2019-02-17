function argumentInfo() {

    let summary = {};
    for (let i = 0; i < arguments.length; i++) {
        let currArg = arguments[i];
        let currType = typeof (currArg);

        if (currArg !== null) {
            console.log(`${currType}: ${currArg}`)
            if (!summary[currType]) {
                summary[currType] = 1;
            } else {
                summary[currType]++;
            }
        }
    }

    var sortedArr = [];
    for (var type in summary) {
        sortedArr.push([type, summary[type]])
    }

    var sortDesc = function (x, y) {
        if (x[1] < y[1]) {
            return 1;
        } else if (x[1] > y[1]) {
            return -1;
        } else return 0;
    };

    sortedArr.sort(function (a, b) {
        return b[1] - a[1];
    });
    // sortedArr.sortDesc;
    sortedArr.forEach(function (element) {
        console.log(`${element[0]} = ${element[1]}`);
    });
}
argumentInfo(42, 'cat', 15, 'kitten', 'tomcat', "")