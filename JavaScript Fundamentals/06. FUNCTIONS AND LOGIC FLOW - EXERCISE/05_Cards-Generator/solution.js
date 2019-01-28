function solve() {
    let arrCart = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    let resultSecElem = document.getElementById("cards");

    let btnElem = document.querySelector('#exercise button');
    btnElem.addEventListener('click', cardsGenerator);
    function cardsGenerator(event) {
        let fromCardElem = document.getElementById("from");
        let toCardElem = document.getElementById("to");
        let selectElem = document.querySelector('#exercise select');
        let currSuit = selectElem.options[selectElem.selectedIndex].value;
        let currSuitChar = currSuit[0];

        console.log(currSuitChar);
        console.log(toCardElem.value);
        console.log(fromCardElem.value)
    }

}