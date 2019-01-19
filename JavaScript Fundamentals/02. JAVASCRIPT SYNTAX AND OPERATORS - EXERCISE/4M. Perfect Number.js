function solve(input) {
    let sum;
    outputArr = [];
    input.forEach(element => {
        sum = 0;
        for (let i = 0; i < element; i++) {
            if (element % i == 0) {
                sum += i;
            };
        };
        if (element == sum) {
            outputArr.push(element);
        }
    });
    if (outputArr.length == 0) {
        console.log('No perfect number');
    } else {
        console.log(outputArr.join(', '));
    };
};
solve([5, 32, 82]);