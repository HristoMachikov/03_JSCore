function solve(inputString) {
    let inputArr = inputString.split(/[ ,.]+/);
    inputArr.forEach(element => {
        let output;
        if (+element <= Number.MAX_VALUE && +element > 0) {
            if (+element % 10 == 1) {
                output = element + "st";
            } else if (+element % 10 == 2) {
                output = element + "nd";
            } else if (+element % 10 == 3) {
                output = element + "rd";
            } else {
                output = element + "th";
            };
            if (+element % 100 >= 11 && element % 100 <= 13) {
                output = element + "th";
            };
        };
        if (output != undefined) {
            console.log(output)
        };
    });
};
solve('The school has 25625 students. In each class there are 20000 chairs, 13 desks and 1 board.');