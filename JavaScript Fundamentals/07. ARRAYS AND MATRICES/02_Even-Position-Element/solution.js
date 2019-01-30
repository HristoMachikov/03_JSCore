function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');
  let accum = [];
  inputArr.forEach(elem => {
    if (inputArr.indexOf(elem) % 2 == 0) {
      accum.push(elem);
    }
  });
  resultElem.textContent = accum.join(' x ');
}