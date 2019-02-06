function solve() {
    Array.from(document.getElementsByTagName('button')).forEach((btn) => {
        btn.addEventListener('click', crossword);
    });
    let outputStr = "";

    function crossword(event) {
        let inputElem = document.getElementById('input');
        let resultElem = document.querySelector('#output p');
        let currMainCommand = event.target.textContent;

        let inputStr = "";
        let takeCharAt;
        let selectedVal = "";
        let selectElem;
        if (currMainCommand === 'Filter') {

            selectElem = document.getElementById('filterSecondaryCmd');
            selectedVal = selectElem.options[selectElem.selectedIndex].value;
            takeCharAt = Number(document.getElementById('filterPosition').value) - 1;

            switch (selectedVal) {
                // case "uppercase": inputStr = inputElem.value.split('').filter(ch => ch = ch.toUpperCase()).join(''); break;
                case "uppercase": inputStr = inputElem.value.replace(/[^A-Z]*/g, ''); break;
                //case "lowercase": inputStr = inputElem.value.split('').filter(ch => ch = ch.toLowerCase()).join(''); break;
                case "lowercase": inputStr = inputElem.value.replace(/[^a-z]*/g, ''); break;
                case "nums": inputStr = inputElem.value.replace(/\D*/g, ''); break;
                default: break;
            }
            outputStr = inputStr[takeCharAt];
        } else if (currMainCommand === 'Sort') {
            selectElem = document.getElementById('sortSecondaryCmd');
            selectedVal = selectElem.options[selectElem.selectedIndex].value;
            takeCharAt = Number(document.getElementById('sortPosition').value) - 1;
            switch (selectedVal) {
                case "A": inputStr = inputElem.value.split('').sort().join(''); break;
                case "Z": inputStr = inputElem.value.split('').sort((a, b) => b.localeCompare(a)).join(''); break;
                default: break;
            }
            outputStr = inputStr[takeCharAt];
        } else if (currMainCommand === 'Rotate') {
            let rotateNumElem = document.getElementById('rotateSecondaryCmd');
            inputStr = inputElem.value
            let rotateNum = rotateNumElem.value % inputStr.length;
            let resultArr;
            for (let i = 0; i < rotateNum; i++) {
                resultArr = inputStr.split('');
                let lastChar = resultArr.pop();
                resultArr.unshift(lastChar);
                inputStr = resultArr.join('');
            }
            takeCharAt = Number(document.getElementById('rotatePosition').value) - 1;
            outputStr = inputStr[takeCharAt];
        } else if (currMainCommand === 'Get') {
            inputStr = inputElem.value;
            takeCharAt = Number(document.getElementById('getPosition').value) - 1;
            outputStr = inputStr[takeCharAt];
        }
        if (outputStr !== undefined) {
            resultElem.textContent += outputStr;
        }
    }
}