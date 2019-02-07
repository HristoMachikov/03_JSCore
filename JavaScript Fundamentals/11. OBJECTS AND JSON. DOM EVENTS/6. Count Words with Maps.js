function solve(input) {
    let inputArr = input.join(' ');
    let obj = {};

    input.forEach(function (element) {
        let pattern = (/\w+/g);
        let currMatch;
        while ((currMatch = pattern.exec(element)) !== null) {
            let currKey = currMatch[0].toLowerCase();
            let check = new RegExp(`(\\W|^)${currKey}(\\W|$)`, "gi");
            if (!obj.hasOwnProperty(currKey)) {
                let numbOfMatch = inputArr.match(check);
                obj[currKey] = +numbOfMatch.length;
            }
        }
    });
    Object.keys(obj).sort().forEach(key => {
        console.log(`'${key}' -> ${obj[key]} times`)
    })
};
solve(["Far", "too", "slow,", "you're", "far", "too", "slow."]);