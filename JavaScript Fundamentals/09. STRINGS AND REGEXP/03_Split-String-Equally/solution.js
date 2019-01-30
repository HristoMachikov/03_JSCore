function solve() {
  let inputStr = document.getElementById('str').value;
  let inputNumb = Number(document.getElementById('num').value);
  let resultElem = document.getElementById('result');

  let strLength = inputStr.length;
  let currStr = inputStr;
  let charRest = 0;
  let resultArr = [];
  if (strLength < inputNumb) {
    charRest = inputNumb - strLength;
    currStr += inputStr.substr(0, charRest);;
  } else {
    charRest = strLength % inputNumb;
    if (charRest) {
      currStr += inputStr.substr(0, inputNumb - charRest);
    }
  }
  for (let i = 0; i < currStr.length; i = i + inputNumb) {
    let currSubStr = currStr.substr(i, inputNumb);
    resultArr.push(currSubStr);
  }
  resultElem.textContent = resultArr.join(' ');
}