function solve() {
  let startNumbValue = Number(document.getElementById("num1").value);
  let multiplierValue = Number(document.getElementById("num2").value);
  let resultElem = document.getElementById("result");

  function multiplicationTable(startNumb, multiplier) {
    for (let i = startNumb; i <= multiplier; i++) {
      let newParElem = document.createElement("p");
      let result = i * multiplier;
      newParElem.innerHTML = `${i} * ${multiplier} = ${result}`;
      resultElem.appendChild(newParElem);
    };
  };
  function checkMultiplier(startNumb, multiplier) {
    if (startNumb > multiplier) {
      document.getElementById("result").innerHTML = "Try with other numbers.";
    };
  };

  resultElem.innerHTML = '';
  checkMultiplier(startNumbValue, multiplierValue);
  multiplicationTable(startNumbValue, multiplierValue);
};