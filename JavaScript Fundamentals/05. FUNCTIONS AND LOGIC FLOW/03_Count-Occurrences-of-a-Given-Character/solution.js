function solve() {
  let inputString = document.getElementById("string").value;
  let inputChar = document.getElementById("character").value;
  let resultElem = document.getElementById("result");
  let result = "";
  let counter = 0;

  function occurrencesOfChar(str, givenChar) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === givenChar) {
        counter += 1;
      }
    };
  };

  function countOccurrences() {
    if (counter % 2 === 0) {
      result = `Count of ${inputChar} is even.`
    } else {
      result = `Count of ${inputChar} is odd.`
    };
  };
  
  occurrencesOfChar(inputString, inputChar);
  countOccurrences();
  resultElem.innerHTML = result;
};