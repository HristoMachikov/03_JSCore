function solve(input) {
    let inputArr = input.join(' ');
    let outputArr = [];

    input.forEach(function (element) {
        let pattern = (/\w+/g);
        let currMatch;
        while ((currMatch = pattern.exec(element)) !== null) {
            let currWord = currMatch[0].toLowerCase();
            let check = new RegExp(`(\\W|^)${currWord}(\\W|$)`, "gi");
            if (!outputArr.includes(currWord)) {
                outputArr.push(currWord);
            }
        }
    });
    console.log(outputArr.join(', '));
};
solve(["Far", "too", "slow,", "you're", "far", "too", "slow."]);