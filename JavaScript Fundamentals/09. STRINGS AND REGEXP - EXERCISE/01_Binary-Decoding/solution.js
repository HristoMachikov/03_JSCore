function solve() {
  let inputElem = document.getElementById('str');
  let resultElem = document.getElementById('result');


  let onesSum = findOnesSum(inputElem.value);
  let end = inputElem.value.length - onesSum;

  let result = resultElem.value.slice(onesSum, end);

  let parts = result.split(/([\d]{8})/).filter((x) => x)
    .map(x => binaryToStringx())
    .filter((c) => pattern.test(c))
    .join('');

  //str.match(/1/g).length
  let pattern = /[A-Za-z ]+/g;
  //let filteredChars = parts.split('').filter((c) => pattern.test(c))

  resultElem.textContent = parts;

  function binaryToString(element) {
    let decimal = parceInt(element, 2);
    return String.fromCharCode(decimal);

  }


  function findOnesSum(value) {
    let result = value;
    while (result.length > 1) {
      let temp = result
        .split('')
        //.filter(x => x === '1')
        .reduce((a, b) => +a + +b)
        .toString();
      result = temp;
    }
    return +result;
  }

}