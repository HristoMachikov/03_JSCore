function solve() {
    document.getElementsByTagName('button')[0].addEventListener('click', extractor);
    function extractor(event) {
        let inputElem = document.getElementById('input');
        let outputElem = document.getElementById('output');
        let count = 0;
        let numAsStr = "";
        while (!isNaN(inputElem.value[count])
            && inputElem.value[count] !== " ") {
            numAsStr += inputElem.value[count]
            count += 1;
        }
        // let numb = Number(numAsStr);
        // numAsStr = inputElem.value.match(/[0-9]+/)[0]
        let numb = Number(numAsStr);
        let takenStr = inputElem.value
            .substring(numAsStr.length, numAsStr.length + numb);
        let splitChar = takenStr.split('').pop();
        let twoPartsArray = takenStr.split(splitChar);
        let firstPart = twoPartsArray[0];
        let secondPart = twoPartsArray[1];
        let pattern = new RegExp(`[${firstPart}]+`, "g");
        let result = secondPart.replace(pattern, "").replace(/#/g, ' ');

        outputElem.value = result;
    }
}