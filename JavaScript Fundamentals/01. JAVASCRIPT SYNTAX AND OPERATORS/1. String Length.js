function input(firstString, secondString, threeString ){
let firstLength = firstString.length;
let secondLength = secondString.length;
let threeLength = threeString.length;
let sumNumberLength = firstLength + secondLength + threeLength;
let midOfSumNumLength = Math.floor(sumNumberLength/3); 
console.log(sumNumberLength);
console.log(midOfSumNumLength);
};
input("hi","234","4");