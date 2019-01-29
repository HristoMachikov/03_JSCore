function greatestCD() {
    let numbMax = Math.abs(Math.max(Number(document.getElementById("num1").value)
        , Number(document.getElementById("num2").value)));
    let numbMin = Math.abs(Math.min(Number(document.getElementById("num1").value)
        , Number(document.getElementById("num2").value)));
    let resultElem = document.getElementById('result');

    let currNumb = numbMax;
    let divisor = numbMin;
    let riminder = 0;
    while (currNumb % divisor != 0 && divisor > 0) {
        debugger
        riminder = currNumb % divisor;
        currNumb = divisor;
        divisor = riminder;
    }
    if (divisor === 0 && currNumb > 0) {
        divisor = currNumb;
    }
    resultElem.innerHTML = divisor;
};