function solve() {
  let inputTextElem = document.getElementById('input');
  let inputTextElemContent = inputTextElem.innerHTML;

  let outputArray = inputTextElemContent.split('. ');

  let outputThreeSentArr = [];
  for (let i = 0; i < outputArray.length; i += 3) {
    let currSent = outputArray[i];
    let currArrLen = outputArray.length - i;
    
    let count = 0;
    if (Math.floor(currArrLen / 3) > 0) {
      count = 3;
    } else {
      count = currArrLen % 3;
    };
    for (let j = 0; j < count - 1; j++) {
      currSent = outputArray[i + j + 1] + ". ";
    }
    console.log(currSent);
    outputThreeSentArr.push(currSent);
    
  }
  let outputTextElem = document.getElementById('output');

  let ouputNewParElem = document.createElement('p');
  //let outputResult = 
  outputThreeSentArr.forEach(element => {
    ouputNewParElem.textContent = element;
    outputTextElem.appendChild(ouputNewParElem)
  });
}