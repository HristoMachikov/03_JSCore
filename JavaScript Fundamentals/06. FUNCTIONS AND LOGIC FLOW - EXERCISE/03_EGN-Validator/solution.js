function validate() {
    let weightArr = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    let arrInputNumb = Array.from(document.querySelectorAll('#exercise input[type="number"]'));
    let resultElem = document.getElementById("egn");
    let currMonthNumb = function (monthName) {
        let arrMonth = ['January', 'February', 'March', 'April', 'May', 'June'
            , 'July', 'August', 'September', 'October', 'November', 'December'];
        let result = arrMonth.indexOf(monthName);
        return result;
    };
    let btnElem = Array.from(document.getElementsByTagName("button"))[0];
    btnElem.addEventListener('click', showResult);

    function showResult(event) {
        let currYear = "";
        let currMontn = "";
        let curentDate = '';
        let currRegion = "";
        let currGender = "";

        let arrMonthElem = document.getElementById("month");
        let selectMonth = arrMonthElem.options[arrMonthElem.selectedIndex].textContent;
        currMontn = 1 + currMonthNumb(selectMonth);
        currMontn < 10 ? currMontn = 0 + String(currMontn) : String(currMontn)
        document.getElementById("month").children[0].selected = "selected";

        let currGenderElem = document.querySelector('#exercise input[type="radio"]:checked');
        if (currGenderElem.value === "Male") {
            currGender = 2;
        } else if (currGenderElem.value === "Female") {
            currGender = 1;
        };
        Array.from(document.querySelectorAll('#exercise input[type="radio"]'))
            .forEach((elem) => {
                elem.checked = false;
            });

        arrInputNumb.forEach((element) => {
            let currInputId = element.id;
            let currValue = Number(element.value);
            if (currInputId === "region") {
                if (currValue >= 43 && currValue <= 999) {
                    currRegion = (String(currValue))[0] + (String(currValue))[1]
                }
            } else if (currInputId === "date") {
                curentDate = currValue;
                curentDate < 10 ? curentDate = 0 + String(curentDate) : String(curentDate)
            } else if (currInputId === "year") {
                if (currValue >= 1900 && currValue <= 2100) {
                    let currYearStr = String(currValue);
                    currYear = currYearStr[currYearStr.length - 2] + currYearStr[currYearStr.length - 1];
                }
            }
            element.value = "";
        });

        let resultNumb = currYear + currMontn + curentDate + currRegion + currGender;
        let lastDigith = "";
        if (resultNumb.length === 9) {
            lastDigith = validateNumb(resultNumb);
        }
        resultNumb += String(lastDigith);

        resultElem.textContent = `Your EGN is: ${resultNumb}`;
    }
    function validateNumb(inputStr) {
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
        return response;
    };
};