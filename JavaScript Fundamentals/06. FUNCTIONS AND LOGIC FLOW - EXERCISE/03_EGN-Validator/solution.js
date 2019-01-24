function validate() {
    let currYear = "";
    let currMontn = "";
    let curentDate = '';
    let currRegion = "";
    let currGender = "";

    let arrInputNumb = Array.from(document.querySelectorAll('#exercise input[type="number"]'));


    console.log(arrInputNumb);
    let currMonthNumb = function (monthName) {
        let arrMonth = ['January', 'February', 'March', 'April', 'May', 'June'
            , 'July', 'August', 'September', 'October', 'November', 'December'];
        let result = arrMonth.indexOf(monthName);
        return result;
    };
    let btnElem = Array.from(document.getElementsByTagName("button"))[0];
    btnElem.addEventListener('click', showResult);

    function showResult(event) {
        let selectMonth = arrMonthElem.options[arrMonthElem.selectedIndex].textContent;
        //console.log(selectMonth);
        currMontn = 1 + currMonthNumb(selectMonth);
        //console.log(currMontn);
        currMontn < 10 ? currMontn = 0 + String(currMontn) : String(currMontn)
        //console.log(currMontn);

        let currGenderElem = document.querySelector('#exercise input[type="radio"]:checked');
        currGenderElem.value;
        //console.log(currGender)
        if (currGender.value === "Male") {
            currGender = 2;
        } else if (currGender.value === "Female") {
            currGender = 1;
        }

        arrInputNumb.forEach((element) => {
            let currInputId = element.id;
            console.log(currInputId);
            if (currInputId === "region") {

            } else if (currInputId === "date") {
                curentDate = element.value;
                curentDate < 10 ? curentDate = 0 + String(curentDate) : String(curentDate)    
        } else if (currInputId === "year") {
                let currYearStr = String(element.value);
                currYear = currYearStr[currYearStr.length - 2] + currYearStr[currYearStr.length - 1];
                //console.log(currYear);
            }
        });
    }
    let arrMonthElem = document.getElementById("month");
    //let arrMonthElem = Array.from (document.getElementById("month").children);
    // arrMonthElem.forEach(elem => {
    //     elem.addEventListener('click', solve);
    // });



    // function solve(prop){
    //     console.log(prop);
    // }


    console.log(currMonthNumb('February'));

    let parMonthElem = document.getElementById("month");


}