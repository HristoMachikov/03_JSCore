function solve() {
  let inputText = document.getElementById('str').value;
  let resutElem = document.getElementById('result');

  let numbers = [];
  let result = inputText.split(' ').filter(x => x !== "")
    .forEach(e => {
      if (isNaN(e)) {
        let resultRow = e
          .split('')
          .map(ch => ch.charCodeAt(0))
          .join(' ');
        let p = document.createElement('p');
        p.textContent = resultRow;
        resutElem.appendChild(p);
      } else {
        numbers.push(e);
      }
    });

  let lastWord = "";
  for (const elem of numbers) {
    lastWord += String.fromCharCode(elem);
  }
  // let lastWord = String.fromCharCode(...numbers);
  //спред оператор (...number) взима масива и го подава като отделни елементи
  let p = document.createElement('p');
  p.textContent = lastWord;
  resutElem.appendChild(p);
}