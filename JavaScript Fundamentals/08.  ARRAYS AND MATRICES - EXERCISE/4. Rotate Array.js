function solve(arr) {
    let rotation = arr.pop()
    for (let i = 0; i < rotation % arr.length; i++) {
        arr.unshift(arr.pop());
    }
    console.log(arr.join(' '));
};
solve(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15']);