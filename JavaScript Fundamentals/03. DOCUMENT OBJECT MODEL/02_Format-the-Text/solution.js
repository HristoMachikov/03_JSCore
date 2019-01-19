function solve() {
  let inputTextElem = document.getElementById('input');
  let inputTextElemContent = inputTextElem.textContent;

  let outputArray = inputTextElemContent.replace(/\s+/g, " ").split(". ");
  let outputThreeSentArr = [];
  for (let i = 0; i < outputArray.length; i += 3) {
    let currSent = "";
    let currArrLen = outputArray.length - i;
    let count = 0;
    if (Math.floor(currArrLen / 3) > 0) {
      count = 3;
    } else {
      count = currArrLen % 3;
    };
    for (let j = 0; j < count; j++) {
     // if (outputArray[i + j].replace(" ", "") != "") {
        if (i + j == outputArray.length - 1) {
          currSent += [outputArray[i + j]];
        } else {
          currSent += outputArray[i + j] + ". ";
        };
      //};
    };
    outputThreeSentArr.push(currSent);
  }
  let outputTextElem = document.getElementById('output');
  outputThreeSentArr.forEach(element => {
    let ouputNewParElem = document.createElement("p");
    ouputNewParElem.textContent = element;
    outputTextElem.appendChild(ouputNewParElem);
  });
}