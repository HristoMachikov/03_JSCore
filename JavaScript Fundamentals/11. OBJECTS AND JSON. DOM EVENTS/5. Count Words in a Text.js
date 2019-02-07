function solve(input) {
    let inputArr = input.join(' ');
    let obj = {};

    input.forEach(function (element) {
        let pattern = (/\w+/g);
        let currMatch;
        while ((currMatch = pattern.exec(element)) !== null) {
            let currKey = currMatch[0];
            let check = new RegExp(`(\\W|^)${currKey}(\\W|$)`, "g");
            if (!obj.hasOwnProperty(currKey)) {
                let numbOfMatch = inputArr.match(check);
                obj[currKey] = +numbOfMatch.length;
            }
        }
    });
    console.log(JSON.stringify(obj));
};
solve(["the", "other", "dog."]);