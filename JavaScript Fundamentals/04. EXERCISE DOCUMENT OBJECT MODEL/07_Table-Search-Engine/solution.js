function solve() {
    let btn = document.querySelector('#exercise button');
    btn.addEventListener('click', searchEngine);
    function searchEngine(event) {
        let inputStrElem = document.querySelector('#exercise input');
        let inputStrValue = inputStrElem.value;
        let searchAreaElem = document.querySelector('#exercise tbody');
        let currTrElem;
        let currTdElem;
        for (let i = 0; i < 5; i++) {
            currTrElem = searchAreaElem.children[i];
            currTrElem.removeAttribute("class");
            for (let j = 0; j < 3; j++) {
                currTdElem = currTrElem.children[j];
                if (currTdElem.textContent.match(inputStrValue)
                    && inputStrValue != "" && inputStrValue != " ") {
                    currTrElem.setAttribute("class", "select");
                };
            };
        };
        inputStrElem.value = "";
    };
};