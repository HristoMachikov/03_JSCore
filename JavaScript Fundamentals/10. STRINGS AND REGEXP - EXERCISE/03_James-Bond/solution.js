function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');

  console.log(inputArr);

  let key = inputArr[0];
  let text = inputArr[1];

  let specialKey = new RegExp(`(^| )${key}`, "gi");
  let pattern = /^ +[A-Z!%$#]{8,}([ .,]|$)/g;
  let matchArr;
  //let cuttedText = text;
  console.log(specialKey);
  while ((matchArr = specialKey.exec(text)) !== null) {
    //debugger
    if (text[specialKey.lastIndex] === ' ') {
      let cuttedText = text.slice(specialKey.lastIndex);
      let currMatch = cuttedText.match(pattern);
      if (currMatch) {
        let replaceMess = currMatch[0].trim();
        let encodMess = replaceMess.split('').map(a => a.toLowerCase())
          // .map((ch, index, arr) => {
          //   let currChar;
          //   if (ch === '!') {
          //     ch.replace(ch, "1")
          //   } else {
          //     ch.toLowerCase();
          //   }
          //   // switch (ch) {
          //   //   case '!': currChar = 1;
          //   //   case '%': currChar = 2;
          //   //   case '#': currChar = 3;
          //   //   case '$': currChar = 4;
          //   //   default: currChar = ch.toLowerCase();
          //   // }
          //   //return currChar;
          // }
          // )
          .join('');
        text.replace(replaceMess, encodMess);
        console.log(encodMess);
      }
    }

  }

  console.log(key);
  console.log(text);

}