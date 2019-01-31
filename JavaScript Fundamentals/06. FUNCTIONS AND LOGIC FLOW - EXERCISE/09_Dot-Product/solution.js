function solve() {
    let arr1 = JSON.parse(document.getElementById('mat1').value);
    let arr2 = JSON.parse(document.getElementById('mat2').value);
    let resultElem = document.getElementById('result');
    let transpArr = [];
    let len = arr2[0].length
    for (let row = 0; row < len; row++) {
        transpArr[row] = [];
        for (let col = 0; col < arr2.length; col++) {
            transpArr[row][col] = 0;
        }
    }

    for (let row = 0; row < arr2.length; row++) {
        for (let col = 0; col < arr2[row].length; col++) {
            transpArr[col][row] = arr2[row][col];
        }
    }

    let count = arr1.length - 1
    for (let row = 0; row < arr1.length; row++) {
        let result1 = 0;
        let result2 = 0;
        for (let col = 0; col < arr1[row].length; col++) {
            result1 += arr1[row][col] * transpArr[col][0];
            result2 += arr1[row][col] * transpArr[col][1];
        }
        let p = document.createElement('p');
        p.textContent = `${result1}, ${result2}`;
        resultElem.appendChild(p);
        count--;
    }
}