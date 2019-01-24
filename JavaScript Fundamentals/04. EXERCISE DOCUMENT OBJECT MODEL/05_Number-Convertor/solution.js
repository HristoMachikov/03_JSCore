function solve() {
    let hexaElem = document.createElement('option');
    hexaElem.textContent = "Hexadecimal";
    hexaElem.value = "hexadecimal";
    let binaryElem = document.createElement('option');
    binaryElem.textContent = "Binary";
    binaryElem.value = "binary";
    document.getElementById('selectMenuTo').appendChild(binaryElem);
    document.getElementById('selectMenuTo').appendChild(hexaElem);
    let convertBtn = Array.from(document.getElementsByTagName('button'))[0];
    convertBtn.addEventListener('click', calculate);
    function calculate(event) {
        let currentNumbEle = document.getElementById('input');
        let num;
        let currSelectElem = document.getElementById("selectMenuTo");
        let currDim = currSelectElem.options[currSelectElem.selectedIndex].value;
        if (currDim === "hexadecimal") {
            num = parseInt(currentNumbEle.value, 10).toString(16);
        } else if (currDim === "binary") {
            num = parseInt(currentNumbEle.value, 10).toString(2);
        };
        let convertElem = document.getElementById('result');
        convertElem.value = num.toUpperCase();
    };
};