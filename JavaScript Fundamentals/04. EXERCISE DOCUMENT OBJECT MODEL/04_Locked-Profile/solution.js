function solve() {
    let checkLocked = true;
    let arrRadio = Array.from(document.querySelectorAll('input[type="radio"]'));
    arrRadio.forEach(rad => {
        rad.addEventListener('click', currRadio);
        function currRadio(event) {
            let radioProfilElem = event.target.parentNode;
            checkLocked = true
            if (event.target.value == "unlock") {
                checkLocked = false;
            } else if (event.target.value == "lock") {
                checkLocked = true;
            };
        };
    });
    let arrBtn = Array.from(document.getElementsByTagName('button'));
    arrBtn.forEach((btn) => {
        btn.addEventListener('click', function (event) {
            let currentProfileElem = event.target.parentNode;
            let currentInfoElement = currentProfileElem.children[9];
            let currBtn = currentProfileElem.children[10];
            let lockedElem = currentProfileElem.children[2];
            if (!lockedElem.checked) {
                checkLocked = false
            }
            if (!checkLocked) {
                if (currBtn.textContent == "Hide it" && !lockedElem.checked) {
                    currentInfoElement.style.display = "none";
                    currBtn.textContent = "Show more";
                } else if (currBtn.textContent == "Show more" && !lockedElem.checked) {
                    currentInfoElement.style.display = "block";
                    currBtn.textContent = "Hide it";
                };
            };
        });
    });
};