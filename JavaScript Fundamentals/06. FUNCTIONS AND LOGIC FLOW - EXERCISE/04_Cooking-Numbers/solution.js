function solve() {
    let inputNumbElem = document.querySelector('#exercise input[type="number"]');
    let inputNumb = "";
    let btnArr = Array.from(document.querySelectorAll('#exercise button'));
    let resultElem = document.getElementById("output");
    let result = "";
    let counter = 0;

    btnArr.forEach(element => {
        element.addEventListener('click', cookingNumber);
    });

    function cookingNumber(event) {
        if (inputNumbElem.value === "") {
            inputNumbElem.value = 0
        };
        if (counter === 0) {
            inputNumb = Number(inputNumbElem.value);
        }
        let resultNumb = inputNumb;
        let currAction = event.target.textContent;
        let outputNumb = calc(resultNumb, currAction)
        inputNumb = +outputNumb;
        resultElem.textContent = outputNumb;
        counter++;
    };

    function calc(numb, action) {
        let result = "";
        if (action === "Chop") {
            result = numb * 0.5;
        } else if (action === "Dice") {
            result = Math.sqrt(numb);
        } else if (action === "Spice") {
            result = numb + 1;
        } else if (action === "Bake") {
            result = numb * 3;
        } else if (action === "Fillet") {
            result = 0.8 * numb;
        }
        return result;
    };
}