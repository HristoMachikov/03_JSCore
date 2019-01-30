function binarySearch() {
    let inputArr = document.getElementById('arr').value.split(', ').map(Number);
    let inputNumb = Number(document.getElementById('num').value);
    let resultElem = document.getElementById('result');
    // function binSearch(inputArr, inputNumb) {
    let T = inputNumb;
    let L = 0;
    let R = inputArr.length - 1;
    let result = "";
    while (L <= R) {
        let mid = Math.floor((L + R) * 0.5);
        if (inputArr[mid] < T) {
            L = mid + 1;
        } else if (inputArr[mid] > T) {
            R = mid - 1;
        }
        if (inputArr[mid] == T) {
            result = mid;
            break;
        }
    }
    //     return result;
    // }
    // let output = binSearch(inputArrValue, inputNumbValue);
    if (result === "") {
        resultElem.innerHTML = `${inputNumb} is not in the array`;
    } else {
        resultElem.innerHTML = `Found ${inputNumb} at index ${result}`;
    }
}