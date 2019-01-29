function getNext() {
    let inputNumb = Number(document.getElementById('num').value);
    let resultElem = document.getElementById('result');
    let resultArr = [];

    if (inputNumb > 0) {
        let currNumb = inputNumb;
        resultArr.push(currNumb);
        while (currNumb != 1) {
            currNumb = hailstoneSequence(currNumb);
            resultArr.push(currNumb);
        }
        resultElem.innerHTML = resultArr.join(' ') + " ";
    }

    function hailstoneSequence(numb) {
        let currNumb = 0;
        if (numb % 2 === 0) {
            currNumb = 0.5 * numb;
        } else {
            currNumb = (3 * numb) + 1;
        }
        return currNumb;
    };
}