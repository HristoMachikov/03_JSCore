function solve(arr) {
    let min = 0;
    let resultArr = arr.reduce((acc, el) => {
        if (el >= min) {
            acc.push(el);
            min = el;
        }
        return acc;
    }, []);
    console.log(resultArr.join("\n"));
};
solve([1, 
2, 
3,
4]
);