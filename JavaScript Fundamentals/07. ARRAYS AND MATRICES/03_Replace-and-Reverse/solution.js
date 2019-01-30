function solve() {
  let inputText = document.getElementById("arr").value;
  let inputArr = JSON.parse(inputText);
  let resultElem = document.getElementById("result");

  inputArr.forEach((elem, index, arr) => {
    arr[index] = elem.split('').reverse().join('');
    //inputArr.forEach(x => x.split('').reverse().join(''));
  });
  let resultArr = inputArr.map(word => word.charAt(0).toUpperCase() + word.slice(1)
  );
  resultElem.textContent = resultArr.join(' ');
}