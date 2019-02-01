function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let inputStr = document.getElementById('str').value;
  let resultElem = document.getElementById('result');

  let matchWord = (inputArr[0].split(' ').filter(x => x))[2].toLowerCase();
  
  inputArr.forEach((x, index, arr) => {
    let currMatch = x.match(RegExp(matchWord, 'i'));
    if (currMatch) {
      let search = x.replace(currMatch, inputStr)
      arr[index] = search;
    }
  });

  inputArr.forEach(element => {
    let p = document.createElement('p');
    p.textContent = element;
    resultElem.appendChild(p);
  });
}