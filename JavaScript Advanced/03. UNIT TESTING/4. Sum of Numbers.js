function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}
//let obj = {name:"Pesho"}
console.log(sum([]))
 module.exports = sum;