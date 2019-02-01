function solve() {
  let inputElem = document.getElementById('str');
  let resultElem = document.getElementById('result');

  let inputStr = inputElem.value;
  let weightStr = inputStr;
  while (weightStr.length > 1) {
    let result = 0;
    weightStr.split('').forEach(element => {
      result += Number(element);
    });
    weightStr = result.toString();
  }

  let end = inputStr.length - Number(weightStr);
  let cuttedStr = inputStr.substring(Number(weightStr), end);
  let cuttedArr = [];
  for (let i = 0; i < cuttedStr.length; i += 8) {
    let curr8Str = cuttedStr.substr(i, 8);
    cuttedArr.push(curr8Str);
  }

  let pattern = / |[a-z]/i;
  let resultStr = '';
  cuttedArr.forEach(element => {
    let currDeciaml = parseInt(element, 2);
    let currAscii = String.fromCharCode(currDeciaml);
    let match = currAscii.match(pattern);
    if (match) {
      resultStr += currAscii;
    }
  });
  resultElem.textContent = resultStr;

  // //Exercise solution
  // //inputStr.match(/1/g).length
  // let onesSum = findOnesSum(inputElem.value);
  // let end = inputElem.value.length - onesSum;
  // let result = inputElem.value.slice(onesSum, end);
  // let pattern = /[A-Za-z ]+/g;
  // let parts = result.split(/([\d]{8})/)
  //   .map(x => binaryToString(x))
  //   .filter((c) => pattern.test(c))
  //   .join('');

  // resultElem.textContent = parts;

  // function binaryToString(element) {
  //   let decimal = parseInt(element, 2);
  //   return String.fromCharCode(decimal);
  // }

  // function findOnesSum(value) {
  //   let result = value;
  //   while (result.length > 1) {
  //     let temp = result
  //       .split('')
  //       .reduce((a, b) => +a + +b)
  //       .toString();
  //     result = temp;
  //   }
  //   return +result;
  // }
}