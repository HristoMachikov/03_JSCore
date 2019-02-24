function solve() {
    Array.from(document.getElementsByTagName('button')).forEach(elem => {
        elem.addEventListener('click', getCalculator)
    })

    function getCalculator(event) {
        let btn = event.target.textContent;
        if (btn === "Sum") {
            calculator[add];
        } else if (btn === "Subtract") {
            calculator[subtract]();
        }
    }
   let calculator = (function () {
        let resultSelector = document.getElementById('result')
        //let resultSelector = resultSelectorElem.value;

        let selector1Elem = document.getElementById('num1');
        let selector1 = Number(selector1Elem.value);
        let selector2Elem = document.getElementById('num2');
        let selector2 = Number(selector2Elem.value);
        return {
            init: (selector1, selector2, resultSelector) => { },
            add: () => { resultSelector.value = selector1 + selector2 },
            subtract: () => { resultSelector.value = selector1 - selector2 }
        }
    })();
}