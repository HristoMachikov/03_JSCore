function solve(arr) {
    let step = Number(arr[arr.length - 1]);
    arr.pop();
    for (let i = 0; i < arr.length; i += step) {
        console.log(arr[i])
    }
};
solve(['5', 
'20', 
'31', 
'4', 
'20', 
'2']

)