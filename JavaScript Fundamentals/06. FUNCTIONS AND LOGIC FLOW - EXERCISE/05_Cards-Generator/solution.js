function solve() {

    let btnElem = document.querySelector('#exercise button');
    btnElem.addEventListener('click', cardsGenerator);
    function cardsGenerator(event) {
        let arrCart = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let resultSecElem = document.getElementById("cards");
        let fromCardElem = document.getElementById("from");
        let toCardElem = document.getElementById("to");
        let selectElem = document.querySelector('#exercise select');
        let currSuit = selectElem.options[selectElem.selectedIndex].value;
        let currSuitChar = currSuit[0];
        let currUnicodeChar = "";
        switch (currSuitChar) {
            case "H": currUnicodeChar = "&hearts;"; break;
            case "S": currUnicodeChar = "&spades;"; break;
            case "D": currUnicodeChar = "&diamond;"; break;
            case "C": currUnicodeChar = "&clubs;"; break;
            default: break;
        }

        for (let i = arrCart.indexOf(fromCardElem.value); i <= arrCart.indexOf(toCardElem.value); i++) {
            let newDivElem = document.createElement('div');
            newDivElem.className = "card";
            
            for (let j = 0; j < 3; j++) {
                let p = document.createElement('p');
                if (j === 1) {
                    p.innerHTML = arrCart[i];
                } else {
                    p.innerHTML = currUnicodeChar;
                }
                newDivElem.appendChild(p);
            }
            resultSecElem.appendChild(newDivElem);
        }
        fromCardElem.value = "";
        toCardElem.value = "";
    }
}