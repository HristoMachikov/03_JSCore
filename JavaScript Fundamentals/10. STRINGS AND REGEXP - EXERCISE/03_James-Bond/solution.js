function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');

  let key = inputArr.shift();
  let specialKey = new RegExp(`(^| )${key}`, "gi");
  let pattern = /^ +[A-Z!%$#]{8,}([ .,]|$)/g;

  inputArr.forEach(function (text) {
    let matchArr;
    while ((matchArr = specialKey.exec(text)) !== null) {
      if (text[specialKey.lastIndex] === ' ') {
        let cuttedText = text.slice(specialKey.lastIndex);
        let currMatch = cuttedText.match(pattern);
        if (currMatch) {
          let replaceMess = currMatch[0].trim();
          let encodMess = replaceMess.split('').map(ch => check(ch)).join('');
          text = text.replace(replaceMess, encodMess);
        }
      }
    }
    let p = document.createElement('p');
    p.textContent = text;
    resultElem.appendChild(p);
  });
  function check(char) {
    let numb = "";
    switch (char) {
      case '!': numb = 1; break;
      case '%': numb = 2; break;
      case '#': numb = 3; break;
      case '$': numb = 4; break;
      default: numb = char.toLowerCase(); break;
    }
    return char.replace(char, numb);
  };
}