function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');

  let sortedArr = inputArr.map(x => Number(x)).sort((a, b) => a - b);
  let div1 = document.createElement('div');
  div1.textContent = sortedArr.join(', ');
  resultElem.appendChild(div1);
  let div2 = document.createElement('div');
  div2.textContent = inputArr.sort().join(', ');
  resultElem.appendChild(div2);
}