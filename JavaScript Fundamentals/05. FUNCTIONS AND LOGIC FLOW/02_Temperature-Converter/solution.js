function solve() {
  let inputValue = Number(document.getElementById("num1").value);
  let inputString = document.getElementById("type").value;
  let resultElem = document.getElementById("result");
  let result = "";
  let convertedTemperature = 0;
  let checkString = false;

  function temperatureConverter(degrees, text) {
    if (text.toLowerCase() === "fahrenheit") {
      convertedTemperature = ((degrees - 32) * 5) / 9;
      checkString = true;
    } else if (text.toLowerCase() === "celsius") {
      convertedTemperature = ((degrees * 9) / 5) + 32;
      checkString = true;
    }
  }

  function checkPrint() {
    if (checkString) {
      result = Math.round(convertedTemperature);
    } else {
      result = "Error!";
    };
  };
  temperatureConverter(inputValue, inputString);
  checkPrint();
  resultElem.innerHTML = result;
};