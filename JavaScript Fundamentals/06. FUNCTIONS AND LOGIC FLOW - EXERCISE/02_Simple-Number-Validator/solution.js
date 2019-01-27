function validate() {
    let inputElem = document.querySelector('#exercise input[type="number"]');
    let resultElem = document.getElementById("response");
    let weightArr = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let btnElem = document.querySelector('#exercise button');
    btnElem.addEventListener('click', validateNumb);
    function validateNumb(event) {
        let inputStr = inputElem.value;
        let checker = Number(inputStr[inputStr.length - 1]);
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let currNumb = Number(inputStr[i]);
            sum += currNumb * weightArr[i]
        };

        let response = sum % 11;
        if (response === 10) {
            response = 0;
        }
        let result = "";
        if (response === checker) {
            result = "This number is Valid!";
        } else {
            result = "This number is NOT Valid!";
        }
        resultElem.innerHTML = result;
    };
};