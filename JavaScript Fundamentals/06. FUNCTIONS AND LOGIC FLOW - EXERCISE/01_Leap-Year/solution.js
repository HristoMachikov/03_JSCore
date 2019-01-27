function leapYear() {
    let inputElem = document.querySelector('#exercise input[type="number"]');
    let resultElem = document.getElementById("year");
    let text = resultElem.children[0];
    let numb = resultElem.children[1];
    let btnElem = document.getElementsByTagName("button");
    btnElem[0].addEventListener('click', checkLeapYear);

    function checkLeapYear(event) {
        let currYear = Number(inputElem.value);
        let result = "";
        if (leapYear(currYear)) {
            result = "Leap Year";
        } else {
            result = "Not Leap Year";
        };

        function leapYear(currYear) {
            return ((currYear % 4 == 0) && (currYear % 100 != 0))
                || (currYear % 400 == 0);
        };
        text.innerHTML = result;
        numb.innerHTML = currYear;
        inputElem.value = "";
    };
};