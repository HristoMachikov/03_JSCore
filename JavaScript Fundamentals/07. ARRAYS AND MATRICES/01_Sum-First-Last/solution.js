function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');
  let accum = [];
  let resultArr = inputArr
    .reduce((accum, currVal, currIndex) => {
      let result = `${currIndex} -> ${Number(currVal) * inputArr.length}`;
      let pElem = document.createElement('p');
      pElem.textContent = result;
      resultElem.appendChild(pElem);
    }, accum);
}