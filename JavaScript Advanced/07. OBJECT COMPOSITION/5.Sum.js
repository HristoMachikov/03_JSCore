function solve() {
    Array.from(document.getElementsByTagName('button')).forEach((elem) => elem.addEventListener('click', getCalc))

    let selector1Elem = document.getElementById('num1');
    let selector2Elem = document.getElementById('num2');
    let resultElem = document.getElementById('result')

    function getCalc(event) {
        let btn = event.target.innerText;
        if (btn === "Sum") {
            calculator(selector1Elem, selector2Elem, resultElem).add();
        } else if (btn === "Subtract") {
            calculator(selector1Elem, selector2Elem, resultElem).subtract();
        }
        selector1Elem.value = "";
        selector2Elem.value = "";
    }
    function calculator(selector1, selector2, resultSelector) {
        let add = () => {
            resultSelector.value = Number(selector1.value) + Number(selector2.value)
        }
        let subtract = () => {
            resultSelector.value = Number(selector1.value) - Number(selector2.value)
        }
        return { add, subtract };
    }



    function judgCalc() {
        let selector1Elem
        let selector2Elem
        let resultElem
        let init = function (selector1, selector2, resultSelector) {
            selector1Elem = document.getElementById(selector1);
            selector2Elem = document.getElementById(selector2);
            resultElem = document.getElementById(resultSelector)
            return {
                init,
                add: () => resultElem.value = Number(selector1Elem.value) + Number(selector2Elem.value),
                subtract: () => resultElem.value = Number(selector1Elem.value) - Number(selector2Elem.value)
            };
        }
    }
}