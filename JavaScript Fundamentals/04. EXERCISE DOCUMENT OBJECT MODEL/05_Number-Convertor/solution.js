function solve() {
    let hexaElem = document.createElement('option');
    hexaElem.textContent = "Hexadecimal";
    let binaryElem = document.createElement('option');
    binaryElem.textContent = "Binary"
    // binaryElem.setAttribute("select value", "binary");
    let removedElem = document.getElementsByTagName('option')[1];
    document.getElementById('selectMenuTo').removeChild(removedElem);
    document.getElementById('selectMenuTo').appendChild(binaryElem);
    document.getElementById('selectMenuTo').appendChild(hexaElem);
    let convertBtn = Array.from(document.getElementsByTagName('button'))[0];
    convertBtn.addEventListener('click', calculate);
    function calculate(event) {
        let currentNumb = document.getElementById('input').value;
        let convertNumb = "";
        let currSelectElem = document.getElementById("selectMenuTo");
        let currDim = currSelectElem.options[currSelectElem.selectedIndex].value;
        if (currDim == "Hexadecimal" && currentNumb != "") {
            convertNumb = parseInt(currentNumb, 10).toString(16);
        } else if (currDim == "Binary" && currentNumb != "") {
            convertNumb = parseInt(currentNumb, 10).toString(2);
        };
        let convertElem = document.getElementById('result');
        convertElem.value = convertNumb.toUpperCase();
    };
};