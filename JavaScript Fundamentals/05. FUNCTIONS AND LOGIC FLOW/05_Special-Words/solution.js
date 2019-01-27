function solve() {
  let firstNumber = Number(document.getElementById("firstNumber").value);
  let secondNumber = Number(document.getElementById("secondNumber").value);
  let firstString = document.getElementById("firstString").value;
  let secondString = document.getElementById("secondString").value;
  let thirdString = document.getElementById("thirdString").value;
  let resultElem = document.getElementById("result");

  for (let i = firstNumber; i <= secondNumber; i++) {
    chechCurrentNumber(i);
  };

  function chechCurrentNumber(i) {
    let result = "";
    if (i % 3 === 0 && i % 5 === 0) {
      result = `${i} ${firstString}-${secondString}-${thirdString}`;
    } else if (i % 5 === 0) {
      result = `${i} ${thirdString}`;
    } else if (i % 3 === 0) {
      result = `${i} ${secondString}`;
    } else {
      result = `${i}`;
    };
    let p = document.createElement("p");
    p.innerHTML = result;
    resultElem.appendChild(p);
  };
};