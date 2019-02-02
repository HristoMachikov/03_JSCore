function solve() {
  let input = document.getElementById('num').value;
  let arr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');

  let resultArr = [];
  arr.forEach(function (element) {
    let check;
    let index;
    if (isNaN(input)) {
      index = element.indexOf(input);
      index >= 0 ? check = true : check = false;
    } else {
      check = element.includes(Number(input));
      index = element.indexOf(Number(input));
    }
    resultArr.push(`${check} -> ${index}`)
  });
  
  resultElem.textContent = resultArr.join(',');
}