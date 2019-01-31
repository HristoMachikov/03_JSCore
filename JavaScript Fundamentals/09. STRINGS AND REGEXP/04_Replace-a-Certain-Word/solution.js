function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let inputStr = document.getElementById('str').value;
  let resultElem = document.getElementById('result');

  let matchWord = (inputArr[0].split(' ').filter(x => x))[2].toLowerCase();
  //let resultArr = 
  inputArr.forEach((x, index, arr) => {
    console.log(x)
    let match = /matchWord/gi;
    let search = x.replace(match, inputStr)
    arr[index] = search;
    console.log(search)
    // x.split(' ')
    //   //.filter(w => w !== "")
    //   .map((word, index, arr) => {
    //     let match = matchWord.exec(word.toLowerCase())
    //     if (match) {
    //       word.replace(match, inputStr)
    //     }
    //     // if (word.toLowerCase() == matchWord) {
    //     //   arr[index] = inputStr;
    //     //   console.log(arr[index])
    //     // }
    //     // console.log(word)
    //   }).join(' ')
    // // w.toLowerCase() == matchWord)?
    // //map( e => {e.replace(matchWord.toLowerCase(), inputStr)})
  });
  console.log(inputArr)
  //console.log(resultArr)
}