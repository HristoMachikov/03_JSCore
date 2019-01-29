function binarySearch() {
    let inputArr = document.getElementById('arr').value;
    let inputNumb = Number(document.getElementById('num').value);
    let resultElem = document.getElementById('result');

    console.log(inputArr);
    console.log(inputNumb);
   // debugger
    function binarySearch(inputArr, inputNumb) {
        let T = inputNumb;
        let arr = inputArr;
        let L = 0;
        let R = arr.length - 1;
        let mid = Math.floor((L + R) * 0.5);
        let result = "";
        debugger
        while (L > R && mid != T) {
            mid = Math.floor((L + R) * 0.5);
            if (mid < T) {
                L = mid + 1;
            } else if (mid > T) {
                R = mid - 1;
            } else {
                result = mid;
            }
            console.log(result);
        }
        return result;
    }
    let output = binarySearch(inputArr, inputNumb);
    if (output === "") {
        resultElem.innerHTML = `The number ${inputNumb} is not in the array.`;
    } else {
        resultElem.innerHTML = `Found number ${inputNumb} at index ${output}`;
    }

}