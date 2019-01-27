function solve() {
  let inputString = document.getElementById("string").value;
  let resultElem = document.getElementById("result");
  let resultString = "";

  function addWhiteSpace(i) {
    if (inputString[i] === " ") {
      resultString += inputString[i];
    };
  };

  function isCharUnique(i) {
    if (resultString.indexOf(inputString[i]) === -1) {
      resultString += inputString[i];
    };
  };

  function findUniqueCharacters(string) {
    for (let i = 0; i < string.length; i++) {
      addWhiteSpace(i);
      isCharUnique(i);
    };
  };

  findUniqueCharacters(inputString) 
  resultElem.innerHTML = resultString;
};