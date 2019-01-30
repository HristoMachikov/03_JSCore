function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let inputStr = document.getElementById('str').value;
  let resultElem = document.getElementById('result');

  let matchWord = (inputArr[0].split(' ').filter(x => x))[2].toLowerCase();
  let resultArr = inputArr.forEach(x => {
    x.map( e => {e.replace(matchWord.toLowerCase(), inputStr)})
  });
  console.log(inputArr)
  console.log(resultArr)
}