function solve() {
    let numbOfClicks = 0;
    let lisenerOfClicks = document.querySelector('button').addEventListener('click', addClick, false);
    function addClick() {
        numbOfClicks += 1;
        let currentColoor = "";
        let numbOfSize = numbOfClicks * 2;
        switch (numbOfClicks % 3) {
            case 1: currentColoor = "blue"; break;
            case 2: currentColoor = "green"; break;
            case 0: currentColoor = "red"; break;
        };
        let newPragElem = document.createElement("p");
        newPragElem.setAttribute("style", `color: ${currentColoor}; font-size: ${numbOfSize}px;`);
        newPragElem.innerHTML = "Growing Word";
        let parentElem = document.getElementById("exercise");
        let oldPargElem = parentElem.getElementsByTagName('p');
        parentElem.replaceChild(newPragElem, oldPargElem[0]);
    };
};