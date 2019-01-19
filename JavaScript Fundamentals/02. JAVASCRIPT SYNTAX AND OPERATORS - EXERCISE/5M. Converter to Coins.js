function solve(numb, arr) {
    let multiplier = 0;
    let rest = 0;
    let outputArr = [];
    let currentNumb = +numb;
    let desOrderArr = arr.sort(function (a, b) {
        return (b - a);
    });
    desOrderArr.forEach(element => {
        let chechLastElem = false;
        if (element == 1 && currentNumb == 1) {
            chechLastElem = true;
        };
        multiplier = Math.floor(currentNumb / element);
        currentNumb = currentNumb % element;
        for (let i = 0; i < multiplier; i++) {
            outputArr.push(element);
        }
    });
    console.log(outputArr.join(', '));
};
solve(123, [5, 50, 2, 1, 10]);