function solve() {
    let threeStepElem = document.querySelector('#exercise [id="content"]');
    let twoBtnElem = document.querySelector('#exercise [id="buttons"]');
    let parentElem = document.getElementById('exercise');
    let lastCountCheck = 0;
    let counterNext = 0;
    let btnArr = Array.from(document.getElementsByTagName('button'));
    btnArr.forEach((element) => {
        element.addEventListener('click', virusInstaler);
        function virusInstaler(event) {
            let pressedBtn = event.target.textContent;
            if (pressedBtn === "Cancel" || pressedBtn === "Finish") {
                parentElem.children[0].style.display = "none";
            } else {
                if (counterNext === 0) {
                    threeStepElem.style.backgroundImage = "none";
                    threeStepElem.children[counterNext].style.display = "block";
                }
                counterNext += 1;
                if (lastCountCheck == 2) {
                    threeStepElem.children[lastCountCheck - 1].style.display = "none";
                    threeStepElem.children[lastCountCheck].style.display = "block";
                    twoBtnElem.children[0].style.visibility = "hidden";
                    twoBtnElem.children[1].textContent = "Finish";
                }
                let radioBtn = threeStepElem.querySelector('input[type="radio"]:checked');
                if (counterNext > 0 && radioBtn.value === "agree" && lastCountCheck == 0) {
                    counterNext = 1;
                    threeStepElem.children[counterNext - 1].style.display = "none";
                    threeStepElem.children[counterNext].style.display = "block";
                    twoBtnElem.children[0].style.visibility = "hidden";
                    setTimeout(function () {
                        twoBtnElem.children[0].style.visibility = "visible";
                    }, 3000);
                    lastCountCheck = 2;
                };
            };
        };
    });
};