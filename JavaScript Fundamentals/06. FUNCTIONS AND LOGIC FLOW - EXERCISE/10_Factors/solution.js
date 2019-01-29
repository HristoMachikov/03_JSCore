function solve() {
    let inputNumb = Math.abs(Number(document.getElementById('num').value));
    let resultElem = document.getElementById('result');
    let resultArr = [];

    if (inputNumb > 0) {
        for (let i = 1; i <= inputNumb; i++) {
            if (inputNumb % i === 0) {
                resultArr.push(i);
            }
        }
        resultElem.innerHTML = resultArr.join(' ');
    }
}