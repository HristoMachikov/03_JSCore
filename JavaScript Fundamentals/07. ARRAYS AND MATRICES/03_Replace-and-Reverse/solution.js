function solve() {
  let inputText = document.getElementById("arr");
  let inputArr = JSON.parse(inputText);
  inputArr.forEach((elem, index, arr) => {
    arr[index] = elem.split('').reverse().join('');
    //return reversedWord;
  });
  let resultArr = inputArr.map(word => word.charAt(0).toUpperCase() + word.slice(1) )
  //inputArr.forEach(x => x.split('').reverse().join(''));

  let resultElem = document.getElementById("result");
  resultElem.textContent = resultArr.join('');
}