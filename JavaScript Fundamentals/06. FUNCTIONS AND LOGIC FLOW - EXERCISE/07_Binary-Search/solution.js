function binarySearch() {
    let inputArr = document.getElementById('arr').value;
    let inputNumb = Number(document.getElementById('num').value);
    let resultElem = document.getElementById('result');

    let T = inputNumb;
    let arr = inputArr;
    let L = 0;
    let R = arr.length - 1;
    let mid = Math.floor((L + R) * 0.5);
    let result = "";
    while (L > R && arr[mid] != T) {
        mid = Math.floor((L + R) * 0.5);
        if (arr[mid] < T) {
            L = mid + 1;
        } else if (arr[mid] > T) {
            R = mid - 1;
        } else {
            result = mid;
        }
    }
    resultElem.innerHTML = result;
}